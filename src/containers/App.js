import React from 'react'
import { switchRender } from '../actions';
import { connect } from 'react-redux'
import ProductsContainer from './ProductsContainer'
import CartContainer from './CartContainer'
import shoppingCart from '../images/shopping-cart.png'
import '../styles/styles.css'

const App = ({switchRender, showCart}) => (
  <div>
    <div className="header-container">
      <h2 className="header">Chez Andrada</h2>
      <a className="cart-toggle" href="#" onClick={switchRender}><img className="icon" src={shoppingCart} alt="shopping cart" /><span className="link">{showCart ? "Back to Products" : "See your Cart"}</span></a>
    </div>  
    <hr/>
    {showCart ? <CartContainer /> : <ProductsContainer />}
  </div>
)

const mapStateToProps = (state) => ({
  showCart: state.showCart
})

export default connect(mapStateToProps, { switchRender })(App)
