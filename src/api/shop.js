/**
 * Mocking client-server processing
 */
// import _products from './products.json'

/*
 * asynchronous function that hits the mock API endpoint for JSON data.
 * return value is a promise that is then resolved in the getProducts method 
*/
const shops = async () => {
  //async await construct to hold the returned promise from fetch
  let store = await (await fetch('http://tech.work.co/shopping-cart/products.json')).json();
  return store;
}

const TIMEOUT = 100

/*
 * modified getProducts method to call the above function, and then resolve the promise before calling the action
*/
export default {
  getProducts: (cb, timeout) => setTimeout(() => shops().then(items => cb(items)), timeout || TIMEOUT),
  buyProducts: (payload, cb, timeout) => setTimeout(() => cb(), timeout || TIMEOUT)
}
