import React, {useState, useEffect, useContext} from 'react';
import { SESSION } from '../state/SessionProvider';
import { useParams } from 'react-router-dom';
import "./User.css"

function User() {
  const {sessionState} = useContext(SESSION)
  const {id, purchases, cart} = sessionState
  const userId = parseInt(useParams().userId)

  const [userInfo, setUserInfo] = useState({exists: false, name: null, picture: null, products: []})

  // call to get general info of user. If user path matches sessionId, call for purchases
  async function callUserAndProducts() {
    try {
      const userCall = await fetch(`http://localhost/api/users/${userId}`)
      if (userCall.status === 404) {
        // user doesn't exist
        return
      }
      if (userCall.status !== 200) {
        throw new Error("User call error")
      }
      const userJson = await userCall.json()
      const {name, picture} = userJson.data
      if (id !== userId) {
        setUserInfo({name, picture, products: []})
        return
      }
      if (!cart || !cart[0]) return
      const responses = await Promise.all(cart.map(item => fetch(`http://localhost/api/products/${item.id}/`)));
      const data = await Promise.all(responses.map(item => item.json()));
      const result = data.map((item, i) => {
        item.data.userQuantity = cart[i].quantity
        return item.data
      })
      setUserInfo({name, picture, products: result})
    } catch(e) {
      console.error(e)
    }
  }

  useEffect(() => {
    callUserAndProducts()
  }, [])

  return (
  <div className={"user"}>
    <div>
      <img src={userInfo.picture} alt={userInfo.name} />
      <div>{userInfo.name}</div>
    </div>
    {id === userId && (<div>
      <div>
        <p>Current Cart:</p>
        <div>
        {(userInfo.products && userInfo.products[0]) && userInfo.products.map((item, i) => {
          return (
            <div key={i}>
              <p>{item.name}</p>
              <p>{item.userQuantity}</p>
            </div>
          )
        })}
        </div>
      </div>
      <div>
        <p>Previous purchases:</p>
        <div>
          {purchases.map((purchase, i) => {
            return (
              <div key={i} >
                <p>Purchased: {new Date(purchase.createdAt).toISOString().split('T')[0]}</p>
                <p>Cost: {purchase.totalPrice}</p>
                <p>Status: {purchase.billingStatus}</p>
                <p>Shipping status: {purchase.shippingStatus}</p>
                <p>Tracking: {purchase.trackingNumber}</p>
              </div>
            )
          })}
        </div>
      </div>
  </div>)}
</div>)
}

export default User;