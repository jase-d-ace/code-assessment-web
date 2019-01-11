
import React from 'react';
import PropTypes from 'prop-types';

const AddToCartButton = ({ onAddToCartClicked, inventory }) => {
  const disabled = inventory > 0 ? '' : 'disabled';
  return (
    <button
      onClick={onAddToCartClicked}
      className="add-to-cart"
      disabled={inventory > 0 ? '' : 'disabled'}>
      {inventory > 0 ? 'ADD TO CART' : 'SOLD OUT'}
    </button>
  )
}

AddToCartButton.propTypes = {
  onAddToCartClicked: PropTypes.func,
  inventory: PropTypes.number
}

export default AddToCartButton;
