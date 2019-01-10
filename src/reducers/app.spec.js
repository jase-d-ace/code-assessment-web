import { switchRender } from './app';

describe('app reducer', () => {
  const initialState = {
    showCart: false
  };
  
  it('should toggle the state between true or false', () => {
    expect(switchRender(initialState, {type: 'SWITCH_CART'})).toEqual({
      "showCart": true
    })
  })
});
