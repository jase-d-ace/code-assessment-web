import shop from '../api/shop'
import * as types from '../constants/ActionTypes'

const receiveProducts = products => ({
  type: types.RECEIVE_PRODUCTS,
  products: products
})

/*
  * The helper map method modifies the incoming data from the product API. The hardcoded data was a little different, and the React components that are wired to this action are expecting a certain type of structure.
  * This Array.map() method takes the data from the product API and modifies each object to match the PropTypes that the React components are expecting. Specifically, the data from the API has the "price" number nested in an object, which I had to extract and keep together with the rest of the information. I just threw away the "currency" string because as far as I could tell it wasn't being used in the front end.
  * One last change I made was to add a flag to differentiate between products that have already been added to the cart and products that haven't. This is to stop users from removing items from their cart that they haven't placed there.
*/
export const getAllProducts = () => dispatch => {
  shop.getProducts(products => {
    let flatObjs = products.map( el => {
      el['title'] = el.productTitle;
      el['price'] = el.price.value;
      el['inCart'] = false;
      return el;
    });
    dispatch(receiveProducts(flatObjs));
  });
};

const addToCartUnsafe = productId => ({
  type: types.ADD_TO_CART,
  productId
});

export const addToCart = productId => (dispatch, getState) => {
  if (getState().products.byId[productId].inventory > 0) {
    dispatch(addToCartUnsafe(productId))
  };
};

/*
 * Following the pattern from adding to your cart, the following two send redux the signal to remove an item from the cart
 * A difference here though is that since we want to "restock" our inventory with whatever is removed from our cart, we need to pass this action another value, which is however many of the item is currently in the cart.
*/

const removeFromCartUnsafe = (productId, quantity) => ({
  type: types.REMOVE_FROM_CART,
  productId,
  quantity
});

export const removeFromCart = productId => (dispatch, getState) => {
  //access state to see how many of an item is currently in the cart
  const quantityRemoved = getState().cart.quantityById[productId]
  //dispatch the action with the product in question, as well as how many there are of it.
  dispatch(removeFromCartUnsafe(productId, quantityRemoved));
  dispatch(swap());
}

export const addQuantity = productId => (dispatch, getState) => {
  //check to see if there item is still in stock
  if (getState().products.byId[productId].inventory > 0) {
    //action will dispatch addToCart since adding a quantity is the same as clicking "add to cart" from the products list
    dispatch(addToCartUnsafe(productId))
  }
}

/*
 * This dispatcher has to first check if our cart will still have at least one of the item we're subtracting.
 * If our cart, after subtracting, will still have at least 1, then we dispatch "SUBTRACT_QUANTITY" as our action. If subtracting again will drop our quantity to 0, then we dispatch "REMOVE_FROM_CART" instead.
 * If a user elects to "subtract" their way down to 0, our removeFromCartUnsafe action is dispatched with 1 as the second argument, since presumably, there was only 1 of that item left in the cart anyway
*/

const subtractQuantityUnsafe = (productId) => ({
  type: types.SUBTRACT_QUANTITY,
  productId
});

export const subtractQuantity = productId => (dispatch, getState) => {
  if ((getState().cart.quantityById[productId] - 1) > 0) {
    dispatch(subtractQuantityUnsafe(productId));
  } else {
    dispatch(removeFromCartUnsafe(productId, 1));
  };
};

/*
 * action that serves as a "switch" between cart and products
*/

const swap = () => ({
  type: types.SWITCH_CART
})

export const switchRender = () => (dispatch, getState) => {
  dispatch(swap())
}

export const checkout = products => (dispatch, getState) => {
  const { cart } = getState()

  dispatch({
    type: types.CHECKOUT_REQUEST
  })
  shop.buyProducts(products, () => {
    dispatch({
      type: types.CHECKOUT_SUCCESS,
      cart
    })
    // Replace the line above with line below to rollback on failure:
    // dispatch({ type: types.CHECKOUT_FAILURE, cart })
  })
}
