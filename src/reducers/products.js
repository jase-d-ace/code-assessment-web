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

/*
 * I added a couple of things to this reducer. First, I noticed that once a user removed something from their cart, it just kinda... disappeared. It didn't restock, and the app acts as if it was never there. It just... went away. The two case statements that I added to this reducer fixed that.
 * In the event of a hard REMOVE_FROM_CART, where a user just takes it out entirely, however many of that item is then added back to the inventory.
 * In the event of just a SUBTRACT_QUANTITY, the same logic is used, except that this time, instead of removing a number that might change, subtracting a quantity just means lowering by 1 every time.
  * There is a little bit of a cheat that I used here, though. As it turns out, a switch statement doesn't allow you to destructure an object the same way more than once. What this means is that if I need to isolate the inventory of a specific item, Redux makes me wrap the entire case in curly braces so that I can redeclare my destructuring in a new block. So you'll notice that the SUBTRACT_QUANTITY case is wrapped in curly braces, which lets me redeclare { inventory, ...rest } again */

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
