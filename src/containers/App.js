import React from 'react'
import { switchRender } from '../actions';
import { connect } from 'react-redux'
import ProductsContainer from './ProductsContainer'
import CartContainer from './CartContainer'
import '../styles/styles.css'

//There needs to be some sort of flag here. Since App contains both, and we'd like to be able to swich between the two, there needs to be some sort of conditional rendering here.
//Some sort of flag that tells Redux to render either Products or Cart.

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
