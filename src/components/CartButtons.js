import React from 'react';
import PropTypes from 'prop-types';

const CartButtons = ({ removeFromCart, subtractQuantity, addQuantity, quantity, inventory }) => {
  const disabled = inventory === 0 ? 'disabled' : '';
  return (
    <div className="cart-button-container">
      <a onClick={removeFromCart} className="remove-button">Remove?</a> 
      <br />
      <div className="quantity-container"> 
        <button onClick={subtractQuantity} className="subtract-quantity quantity-button">-</button>
        <span className="quantity"> x{quantity}</span>
        <button onClick={addQuantity} disabled={disabled} className="add-quantity quantity-button">+</button>
      </div>
    </div>
  )
};

CartButtons.propTypes = {
  removeFromCart: PropTypes.func,
  subtractQuantity: PropTypes.func,
  addQuantity: PropTypes.func,
  quantity: PropTypes.number,
  inventory: PropTypes.number
};

export default CartButtons;
