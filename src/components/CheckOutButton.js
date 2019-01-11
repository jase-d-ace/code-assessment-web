import React from 'react';
import PropTypes from 'prop-types';

const CheckOutButton = ({ onCheckoutClicked, total }) => (
  <div className="checkout">
    <p>Total: &#36;{total}</p>
    <button onClick={onCheckoutClicked}>
        Checkout
    </button>
  </div>
);

CheckOutButton.propTypes = {
  onCheckoutClicked: PropTypes.func,
  total: PropTypes.string
};

export default CheckOutButton;
