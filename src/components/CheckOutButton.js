import React from 'react';
import PropTypes from 'prop-types';

const CheckOutButton = ({ onCheckoutClicked, total }) => (
  <div className="checkout">
    <p className='total'>Total: &#36;{total}</p>
    <button className="add-to-cart checkout-button-mobile" onClick={onCheckoutClicked}>
        CHECKOUT
    </button>
  </div>
);

CheckOutButton.propTypes = {
  onCheckoutClicked: PropTypes.func,
  total: PropTypes.string
};

export default CheckOutButton;
