import React from 'react'
import PropTypes from 'prop-types'

const Product = ({ price, inventory, title, removeFromCart, inCart, addQuantity, subtractQuantity, quantity }) => {
  const disabled = inventory === 0 ? 'disabled' : '';
  const buttons = inCart ? (<div><button onClick={removeFromCart}>Remove?</button> <br /> <button onClick={subtractQuantity}>-</button> <button onClick={addQuantity} disabled={disabled}>+</button></div>) : ''
  return (<div>
    {title} - &#36;{price}{(inventory && !inCart) ? ` x ${inventory}` : null} {inCart ? ` x${quantity}` : null}
    {buttons}
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
