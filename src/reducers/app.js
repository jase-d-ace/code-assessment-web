import { SWITCH_CART } from '../constants/ActionTypes';

const initialState = {
  showCart: false
};

export const showCart = (state = initialState.showCart, action) => {
  switch(action.type) {
    case SWITCH_CART:
      return !state
    default:
      return state
  }
}

