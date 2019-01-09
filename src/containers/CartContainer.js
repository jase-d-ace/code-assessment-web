import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { checkout, removeFromCart, addQuantity, subtractQuantity } from '../actions'
import { getTotal, getCartProducts } from '../reducers'
import Cart from '../components/Cart'

const CartContainer = ({ products, total, checkout, removeFromCart, addQuantity, subtractQuantity }) => (
  <Cart
    products={products}
    total={total}
    onCheckoutClicked={() => checkout(products)} 
    addQuantity={addQuantity}
    subtractQuantity={subtractQuantity}
    removeFromCart={removeFromCart}/>
)

CartContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired
  })).isRequired,
  total: PropTypes.string,
  checkout: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  addQuantity: PropTypes.func.isRequired,
  subtractQuantity: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  products: getCartProducts(state),
  total: getTotal(state)
})

export default connect(
  mapStateToProps,
  { checkout, removeFromCart, addQuantity, subtractQuantity }
)(CartContainer)
