import { combineReducers } from 'redux'
import { RECEIVE_PRODUCTS, 
         ADD_TO_CART,
         REMOVE_FROM_CART,
         SUBTRACT_QUANTITY } from '../constants/ActionTypes'

const products = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        inventory: state.inventory - 1,
        inCart: true
      }
    default:
      return state
  }
}

const byId = (state = {}, action) => {
  const { productId, quantity } = action
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return {
        ...state,
        ...action.products.reduce((obj, product) => {
          obj[product.id] = product
          return obj
        }, {})
      }
    case REMOVE_FROM_CART:
    const { inventory, ...rest } = state[productId]
      return {
        ...state,
        [productId]: {
          ...rest,
          inventory: inventory + quantity
        }
      }
    case SUBTRACT_QUANTITY: {
      const { inventory, ...rest } = state[productId]
      return {
        ...state,
        [productId]: {
          ...rest,
          inventory: inventory + 1
        }
      }
    }
    default:
      if (productId) {
        return {
          ...state,
          [productId]: products(state[productId], action)
        }
      }
      return state
  }
}

const visibleIds = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return action.products.map(product => product.id)
    default:
      return state
  }
}

export default combineReducers({
  byId,
  visibleIds
})

export const getProduct = (state, id) =>
  state.byId[id]

export const getVisibleProducts = state =>
  state.visibleIds.map(id => getProduct(state, id))
