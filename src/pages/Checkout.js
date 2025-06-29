import React, {useState, useEffect, useContext} from "react";
import { SESSION } from '../state/SessionProvider';
import { PROTOCOL, DOMAIN } from '../state/Env';
import ProductCard from "../components/ProductsCard";
import './Checkout.css';


function Checkout() {
  const {sessionState, setSessionState} = useContext(SESSION)
  const {cart} = sessionState
  const [products, setProducts] = useState([])

  async function productsInCart() {
    if (!cart || !cart[0]) return
    const responses = await Promise.all(cart.map(item => fetch(`${PROTOCOL}://${DOMAIN}/api/products/${item.productId}/`)));
    const data = await Promise.all(responses.map(item => item.json()));
    const result = data.map((item, i) => {
      item.data.userQuantity = cart[i].quantity
      return item.data
    })
    setProducts(result)
  }

  useEffect(() => {
    productsInCart()
  }, [])

  const submitCheckout = async () => {
    // get user info for sending email
    let userData
    try {
      const response = await fetch(`${PROTOCOL}://${DOMAIN}/api/me`, {
        credentials: "include",
        method: "GET"
      })
      userData = await response.json()
    } catch(e) {
      console.error(e)
    }
    
    let checkoutData
    try {
      const response = await fetch(`${PROTOCOL}://${DOMAIN}/api/checkout/`, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(userData.data)
      })
      checkoutData = await response.json()
    } catch(e) {
      console.error(e)
    }

    // this is mad illegal
    // This code resets the users cart. This should be done on the back-end and the api endpoint needs to be rewritten
    // it is not restful it's a nightmare
    let cartData
    try {
      const response = await fetch(`${PROTOCOL}://${DOMAIN}/api/cart/user/${sessionState.id}`, {
        credentials: "include",
        method: "PUT"
      })
      cartData = await response.json()
      setSessionState({id: sessionState.id, cart: [], purchases: sessionState.purchases.push(checkoutData.data)})
    } catch (e) {
      console.error(e)
    }
    window.location = `${PROTOCOL}://${DOMAIN}/user/${sessionState.id}`
  }

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <div>
        <h2>Address</h2>
        <p>Address goes here</p>
      </div>
      <div>
        <h2>Payment method</h2>
        <p>Card other stuff</p>
      </div>
      <div>
        <h2>Items</h2>
        <div className='checkout-cart-wrapper'>
        {(products && products[0]) && products.map((item, i) => {
          const {id, name, description, mainImage, category, price, author} = item
          return (
            <div key={i}>
              <ProductCard id={id} name={name} description={description} mainImage={mainImage} category={category} price={price} author={author} width={100} height={100} />
            </div>
          )
        })}
      </div>
      </div>
      <div>
        <button onClick={() => {submitCheckout()}}>
          Place order
        </button>
      </div>
    </div>
  )
}

export default Checkout;