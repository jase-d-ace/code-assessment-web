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

### Product API
I elected to use `fetch` and `async/await` as my asynchronous functions because I felt that they were reliable, and also were straightforward enough to not require excess setup. I added comments to the code in `src/api/shop.js` and in `actions/index.js` as a reminder to myself as to how `async/await` and `fetch` work. Once I was able to pass the JSON data (and not a promise) to the action, I found that I had to modify the incoming data, since the data is structured a little differently in the API as opposed to the hard-coded data in `shop/products.json`. I figured it made sense to do my work in the `src/api/shop.js` file because that was where the hardcoded data was, which told me that I should keep that kind of data there.
