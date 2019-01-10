import React from 'react'
import { switchRender } from '../actions';
import { connect } from 'react-redux'
import ProductsContainer from './ProductsContainer'
import CartContainer from './CartContainer'
import '../styles/styles.css'

const App = ({switchRender, showCart}) => (
  <div>
    <h2 className="header">Acme Store</h2>
    <button onClick={switchRender}>switch?</button>
    <hr/>
    {showCart ? <CartContainer /> : <ProductsContainer />}
  </div>
)

const mapStateToProps = (state) => ({
  showCart: state.showCart
})

export default connect(mapStateToProps, { switchRender })(App)
