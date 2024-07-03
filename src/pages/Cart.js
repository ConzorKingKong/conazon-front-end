import React, {useState, useEffect, useContext} from 'react'
import { SESSION } from '../state/SessionProvider'
import './Cart.css'

function Cart() {
  const {sessionState} = useContext(SESSION)
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

  return (
    <div className={"cart"} >
      <p>Current Cart:</p>
      <div>
        {(products && products[0]) && products.map((item, i) => {
          return (
            <div key={i}>
              <p>{item.name}</p>
              <p>{item.userQuantity}</p>
              <button>Remove from cart</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Cart;