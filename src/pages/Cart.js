import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

function Cart(props) {
  const {id} = props
  const [cart, setCart] = useState({})

  async function callData() {
    if (id === null) return
    try {
      const cartCall = await fetch(`http://localhost/api/cart/cart/${id}`)
      if (cartCall.status !== 200) {
        // handle non existent product
        console.log(json.status)
        setCart({})
        throw new Error("Error fetching")
      }
      const json = await cartCall.json()
      setCart(json.data)
    } catch(e) {
      console.error(e)
    }
  }

  useEffect(() => {
    callData()
  }, [])

  return (
    <div>Cart {props.id} {JSON.stringify(cart)}</div>
  )
}

export default Cart;