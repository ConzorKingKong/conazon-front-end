import React from 'react'
import './Cart.css'

function Cart(props) {
  const {cart} = props

  return (
    <div className={"cart"} >
      <p>Current Cart:</p>
      <div>
        {cart && cart[0] && cart.map((item, i) => {
          return (
            <div key={i} >
              <p>{item.id}</p>
              <p>{item.quantity}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Cart;