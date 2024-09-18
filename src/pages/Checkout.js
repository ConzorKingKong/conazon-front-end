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
    let data
    try {
      const response = await fetch(`${PROTOCOL}://${DOMAIN}/api/checkout/`, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({})
      })
      data = await response.json()
    } catch(e) {
      console.error(e)
    }
    console.log(data)
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