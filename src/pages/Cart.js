import React from 'react'

function Cart(props) {
  const {cart} = props

  return (
    <div>Cart {JSON.stringify(cart)}</div>
  )
}

export default Cart;