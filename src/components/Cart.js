import React from 'react'
import PropTypes from 'prop-types'
import Product from './Product'
import shoppingCartLarge from '../images/shopping-cart-large.png';
import CheckOutButton from './CheckOutButton';

const Cart = ({ products, inCart, total, onCheckoutClicked, removeFromCart, addQuantity, subtractQuantity }) => {
  const hasProducts = products.length > 0
  const nodes = hasProducts ? (
    products.map(product =>
      <Product
        title={product.title}
        price={product.price}
        inventory={product.inventory}
        quantity={product.quantity}
        key={product.id}
        inCart={product.inCart}
        addQuantity={() => addQuantity(product.id)}
        subtractQuantity={() => subtractQuantity(product.id)}
        removeFromCart={() => removeFromCart(product.id)}
      />
    )
  ) : (
    <div className="empty-cart">
      <img src={shoppingCartLarge} className="cart-img" alt="cart" />
      <em className="empty-text">Please add some products your to cart.</em>
    </div>
  )


  return (
    <div>
      <h1>Your Cart</h1>
      <div className="cart-container">{nodes}</div>
        {hasProducts ? (<CheckOutButton total={total} onCheckoutClicked={onCheckoutClicked} />) : ''}
    </div>
  )
}

Cart.propTypes = {
  products: PropTypes.array,
  total: PropTypes.string,
  onCheckoutClicked: PropTypes.func
}

export default Cart
