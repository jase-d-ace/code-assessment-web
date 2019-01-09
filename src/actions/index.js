import shop from '../api/shop'
import * as types from '../constants/ActionTypes'

const receiveProducts = products => ({
  type: types.RECEIVE_PRODUCTS,
  products: products
})

export const getAllProducts = () => dispatch => {
  shop.getProducts(products => {
    /*
     * helper function that modifies the incoming data from the product API. The hardcoded data was a little different, and the React components that are wired to this function are expecting a certain type of structure.
     * This Array.map() method takes the data from the product API and modifies each object to match the PropTypes that the React components are expecting. Specifically, the data from the API has the "price" number nested in an object, which I had to extract and keep together with the rest of the information. I just threw away the "currency" string because as far as I could tell it wasn't being used in the front end.
     * One last change I made was to add a flag to differentiate between products that have already been added to the cart and products that haven't. This is to stop users from removing items from their cart that they haven't placed there.
    */
    let flatObjs = products.map( el => {
      el['title'] = el.productTitle;
      el['price'] = el.price.value;
      el['inCart'] = false;
      return el;
    })
    dispatch(receiveProducts(flatObjs))
  })
}

const addToCartUnsafe = productId => ({
  type: types.ADD_TO_CART,
  productId
})

export const addToCart = productId => (dispatch, getState) => {
  if (getState().products.byId[productId].inventory > 0) {
    dispatch(addToCartUnsafe(productId))
  }
}

/*
 * Following the pattern from adding to your cart, the following two send redux the signal to remove an item from the cart
*/

const removeFromCartUnsafe = productId => ({
  type: types.REMOVE_FROM_CART,
  productId
});

export const removeFromCart = productId => (dispatch, getState) => {
  dispatch(removeFromCartUnsafe(productId));
}

const changeQuantity = (productId, delta) => ({
  type: delta,
  productId
})

export const addQuantity = productId => (dispatch, getState) => {
  //check to see if there item is still in stock
  if (getState().products.byId[productId].inventory > getState().cart.quantityById[productId]) {
    dispatch(changeQuantity(productId, types.ADD_QUANTITY))
  } else {
    //return statement stops a user from spamming the add function after the store has run out of stock
    return
  }
}

export const subtractQuantity = productId => (dispatch, getState) => {
  if ((getState().cart.quantityById[productId] - 1) > 0) {
    dispatch(changeQuantity(productId, types.SUBTRACT_QUANTITY))
  } else {
    dispatch(removeFromCartUnsafe(productId))
  }
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
