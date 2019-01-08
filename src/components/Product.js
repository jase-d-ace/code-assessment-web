import React from 'react'
import PropTypes from 'prop-types'

const Product = ({ price, inventory, title, removeFromCart, inCart }) => (
  <div>
    {title} - &#36;{price}{inventory ? ` x ${inventory}` : null}
    {inCart ? (<button onClick={removeFromCart}>Remove?</button>) : ''}
  </div>
)

Product.propTypes = {
  price: PropTypes.number,
  inventory: PropTypes.number,
  title: PropTypes.string,
  removeFromCart: PropTypes.func,
  inCart: PropTypes.bool
}

export default Product
