import React from 'react'
import PropTypes from 'prop-types'

const Product = ({ price, inventory, title, removeFromCart }) => (
  <div>
    {title} - &#36;{price}{inventory ? ` x ${inventory}` : null}
        <button onClick={removeFromCart}>Remove?</button>
  </div>
)

Product.propTypes = {
  price: PropTypes.number,
  inventory: PropTypes.number,
  title: PropTypes.string,
  removeFromCart: PropTypes.func
}

export default Product
