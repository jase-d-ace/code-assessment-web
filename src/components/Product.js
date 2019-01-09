import React from 'react'
import PropTypes from 'prop-types'

const Product = ({ price, inventory, title, removeFromCart, inCart, addQuantity, subtractQuantity }) => {
  const buttons = inCart ? (<div><button onClick={removeFromCart}>Remove?</button> <br /> <button onClick={addQuantity}>+</button> <button onClick={subtractQuantity}>-</button></div>) : ''
  return (<div>
    {title} - &#36;{price}{inventory ? ` x ${inventory}` : null}
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
