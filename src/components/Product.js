import React from 'react'
import PropTypes from 'prop-types'

const Product = ({ price, inventory, title, removeFromCart, inCart, addQuantity, subtractQuantity, quantity, onAddToCartClicked }) => {
  const disabled = inventory === 0 ? 'disabled' : '';
  const buttons = inCart ? (<div><button onClick={removeFromCart}>Remove?</button> <br /> <button onClick={subtractQuantity}>-</button> <button onClick={addQuantity} disabled={disabled}>+</button></div>) : (<button
      onClick={onAddToCartClicked}
      className="add-to-cart"
      disabled={inventory > 0 ? '' : 'disabled'}>
      {inventory > 0 ? 'ADD TO CART' : 'SOLD OUT'}
    </button>)
  return (
    <div className="product-container" >
        <img src="https://lorempixel.com/400/400" alt="product" className="product-img" />
                      <div className="product-info"><div className="product-banner"><span className="product-title">{title}</span> <span> &#36;{price}</span></div>{(inventory && !inCart) ? (<p className="remaining">{inventory} REMAINING </p>): null} {inCart ? (<p> x{quantity}</p>) : null}
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
