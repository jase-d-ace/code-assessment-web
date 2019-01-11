import React from 'react'
import PropTypes from 'prop-types'
import CartButtons from './CartButtons';
import AddToCartButton from './AddToCartButton';

const Product = ({ price, inventory, title, removeFromCart, inCart, addQuantity, subtractQuantity, quantity, onAddToCartClicked }) => {
  const buttons = inCart ? (
    <CartButtons 
      removeFromCart={removeFromCart} 
      addQuantity={addQuantity}
      subtractQuantity={subtractQuantity}
      quantity={quantity}
      inventory={inventory} 
    />) : (
      <AddToCartButton
        onAddToCartClicked={onAddToCartClicked}
        inventory={inventory}
      />)
  return (
    <div className="product-container" >
      <img src="https://lorempixel.com/400/400" alt="product" className="product-img" />
      <div className="product-info">
        <div className="product-banner">
          <span className="product-title">{title}</span>
          <span className="product-price"> &#36;{price}</span>
        </div>
        {(inventory && !inCart) ? (<p className="remaining">{inventory} REMAINING </p>): null }
        {buttons}
    </div>
  </div>)
}

Product.propTypes = {
  price: PropTypes.number,
  inventory: PropTypes.number,
  title: PropTypes.string,
  removeFromCart: PropTypes.func,
  inCart: PropTypes.bool
}

export default Product
