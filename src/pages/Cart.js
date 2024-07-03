import React, {useState, useEffect, useContext} from 'react'
import { SESSION } from '../state/SessionProvider'
import './Cart.css'
import ProductCard from '../components/ProductsCard'

function Cart() {
  const {sessionState, setSessionState} = useContext(SESSION)
  const {cart} = sessionState
  const [products, setProducts] = useState([])

  async function productsInCart() {
    if (!cart || !cart[0]) return
    const responses = await Promise.all(cart.map(item => fetch(`http://localhost/api/products/${item.id}/`)));
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

  async function removeFromCart(id) {
    try {
      const deleteCall = await fetch(`http://localhost/api/cart/${id}`, {method: 'DELETE', credentials: 'include'})
      if (deleteCall.status !== 200) {
        throw new Error("Delete call error")
      }
      const data = await deleteCall.json()
      // update state to refresh page
      sessionState.cart = sessionState.cart.filter(item => {
        return item.id !== id
      }).map(i => i)
      setSessionState(sessionState)
    } catch(e) {
      return console.error(e)
    }
  }

  return (
    <div className={"cart"} >
      <h1>Current Cart</h1>
      <p>{(!products || !products[0] && "Empty")}</p>
      <div className='cart-cart-wrapper'>
        {(products && products[0]) && products.map((item, i) => {
          const {id, name, description, mainImage, category, price, author} = item
          return (
            <div key={i}>
              <ProductCard id={id} name={name} description={description} mainImage={mainImage} category={category} price={price} author={author} width={100} height={100} />
              <button onClick={() => {removeFromCart(id)}}>Remove from cart</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Cart;