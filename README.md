# Work & Co Web Code Assessment

This is a copy of the [Redux Shopping Cart Example](https://github.com/reactjs/redux/tree/master/examples/shopping-cart).

To start a development server:

```
npm start
```

## Tasks

Please publish your work to a fork of this repo. You're welcome (but not required) to add any libraries you think would be helpful.

Note: You're encouraged to show your work by including multiple commits - we'll be looking through your fork's git history.

1. [Implement Responsive Design](/tasks/01-responsive-design.md)
2. [Enhance Cart Functionality](/tasks/02-cart-enhancements.md)
3. [Hook Up Product API](/tasks/03-product-api.md)

Please also update this README file: we'd love to see notes on your decision-making process, links to the most exciting pieces of code, or anything else that will give us additional context when reviewing your assessment.

## Thoughts and Decisions

NB: Most of my thought process notes are written as comments in the code. Reading through these next paragraphs will show which files I dropped comments in. Also, they will show in my git commits.

### Product API
I elected to use `fetch` and `async/await` as my asynchronous functions because I felt that they were reliable, and also were straightforward enough to not require excess setup. I added comments to the code in `src/api/shop.js` and in `actions/index.js` as a reminder to myself as to how `async/await` and `fetch` work. Once I was able to pass the JSON data (and not a promise) to the action, I found that I had to modify the incoming data, since the data is structured a little differently in the API as opposed to the hard-coded data in `shop/products.json`. I figured it made sense to do my work in the `src/api/shop.js` file because that was where the hardcoded data was, which told me that I should keep that kind of data there.

### Updating and Removing from the Cart
This was probably my absolute favorite part of the challenge. This definitely put my knowledge of ES6 to the test; especially when updating quantities from the cart. I've dropped comments in `src/actions/index.js` and `src/reducers/cart.js` to explain my thought process a little more and add color to what I was doing. But the gist of it is that I elected to go with `Array.filter()` to remove products from the cart because I felt that it was the cleanest way of finding the ID of the product I just removed and isolating it from the array. I also made the decision that if a user were to try to "add to cart" more than what we had in stock, I'd stop them by effectively not letting them add any more. Once a user subtracted enough quantities of a given product to get to 0, instead of allowing the quantity in the cart to stay at 0, I just removed it from the cart entirely.

Additionally, I had originally used the `delete` keyword that javascript gives us to remove certain bits of state when removing items from the cart. Further research told me that I should instead use  a library called `underscore` which lets me make changes to state without directly mutating it, which is against best practice for Redux.


### Things to Consider

I think that if I had a do-over, I'd definitely begin my CSS with mobile-first in mind. By the time I realized that I should be designing for mobile first, I had already nearly finished the CSS for the desktop version of the app. 

As I was wrapping up the business logic of the app, I realized that there were many places where I could, instead of returning just a bunch of JSX in the ternary statement, which led to super messy and almost-unreadable code, I made the decision to create new components and render those instead, passing necessary functions and pieces of state as props to these components as necessary. It definitely led to more readable code simply because there was LESS code to read at once.


My thought process for this was to split the functionality of the `Product.js` component, depending on whether or not a user was looking at the cart or the product list. Looking at the structure of the app, I saw that both the `ProductsList` and the `Cart` components were rendering the same `Product` component, which gave me the idea to use that component in two different ways. I had to add a small piece of state, which dictated whether or not an item was in the cart, and, depending on whether or not the item was `inCart`, different information, and different buttons would be rendered.