import React from 'react'
import PropTypes from 'prop-types'
import Product from './Product'

const Cart = ({ products, inCart, total, onCheckoutClicked, removeFromCart, addQuantity, subtractQuantity }) => {
  const hasProducts = products.length > 0
  const nodes = hasProducts ? (
    products.map(product =>
      <Product
        title={product.title}
        price={product.price}
        quantity={product.quantity}
        key={product.id}
        inCart={product.inCart}
        addQuantity={() => addQuantity(product.id)}
        subtractQuantity={() => subtractQuantity(product.id)}
        removeFromCart={() => removeFromCart(product.id)}
      />
    )
  ) : (
    <em>Please add some products to cart.</em>
  )

  return (
    <div>
      <h3>Your Cart</h3>
      <div>{nodes}</div>
      <p>Total: &#36;{total}</p>
      <button onClick={onCheckoutClicked}
        disabled={hasProducts ? '' : 'disabled'}>
        Checkout
      </button>
    </div>
  )
}

Cart.propTypes = {
  products: PropTypes.array,
  total: PropTypes.string,
  onCheckoutClicked: PropTypes.func
}

export default Cart
