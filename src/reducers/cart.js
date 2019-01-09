import {
  ADD_TO_CART,
  CHECKOUT_REQUEST,
  CHECKOUT_FAILURE,
  REMOVE_FROM_CART,
  ADD_QUANTITY,
  SUBTRACT_QUANTITY
} from '../constants/ActionTypes'

const initialState = {
  addedIds: [],
  quantityById: {}
}

/*
 * Removing from the cart required two separate additions to this file. The first was to remove the item from the array of items currently in the cart. I used Array.filter() to remove that item from the rest of the array, and then returned only the remaining items
 * The second addition I made was to remove the item from the quantityById object, which required the same process. At first, I thought I had to decrement the quantity, but it occurred to me that taking an item out of your cart removes ALL quantities of it, so I changed my mind and followed the same process as the array.
 * Updating the cart proved to be a little trickier than I'd first imagined. There were a couple of steps involved in ensuring that the user couldn't abuse the system by adding more instances to the cart than we had in stock, or by removing more from the cart than we had initially (i.e. if we had already subtracted everything, but still had it available to subtract.).
 * The way I got around the inventory was by adding a check to the "ADD_QUANTITY" dispatcher that ensured that our inventory was never exceeded by our cart total. The way I got around our subtraction issue was to just remove the item from the cart once the user dropped the cart total to 0.
*/
const addedIds = (state = initialState.addedIds, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      if (state.indexOf(action.productId) !== -1) {
        return state
      }
      return [ ...state, action.productId ]
    case REMOVE_FROM_CART:
      //this filter removes the chosen product from the array by filtering it out and returning a new array of everything else.
      const filterArr = state.filter( id => id !== action.productId )
      return [ ...filterArr ]
    default:
      return state
  }
}

const quantityById = (state = initialState.quantityById, action) => {
  const { productId } = action
  switch (action.type) {
    case ADD_TO_CART:
      return { ...state,
        [productId]: (state[productId] || 0) + 1
      }
    case REMOVE_FROM_CART:
      //I feel like there is a more elegant way/better practice of doing this...
      delete state[productId]
      return {
        ...state
      }
    case ADD_QUANTITY:
      return {
        ...state,
        [productId]: (state[productId]) + 1
      }
    case SUBTRACT_QUANTITY:
      return {
        ...state,
        [productId]: (state[productId]) - 1
      }
    default:
      return state
  }
}

export const getQuantity = (state, productId) =>
  state.quantityById[productId] || 0

export const getAddedIds = state => state.addedIds

const cart = (state = initialState, action) => {
  switch (action.type) {
    case CHECKOUT_REQUEST:
      return initialState
    case CHECKOUT_FAILURE:
      return action.cart
    default:
      return {
        addedIds: addedIds(state.addedIds, action),
        quantityById: quantityById(state.quantityById, action)
      }
  }
}

export default cart
