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
    */
    let flatObjs = products.map( el => {
      el['title'] = el.productTitle;
      el['price'] = el.price.value;
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
