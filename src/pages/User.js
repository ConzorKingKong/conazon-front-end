import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import "./User.css"

function User(props) {
  const {id, purchases, cart} = props
  const userId = parseInt(useParams().userId)

  const [userInfo, setUserInfo] = useState({name: null, picture: null})

  // call to get general info of user. If user path matches sessionId, call for purchases
  async function callUser() {
    try {
      const userCall = await fetch(`http://localhost/api/users/${userId}`)
      console.log(userCall)
      if (userCall.status !== 200) {
        throw new Error("User call error")
      }
      const userJson = await userCall.json()
      setUserInfo(userJson.data)
    } catch(e) {
      console.error(e)
    }
  }

  useEffect(() => {
    callUser()
  }, [])

  return (
  <div className={"user"}>
    <div>
      <img src={userInfo.picture} />
      <div>{userInfo.name}</div>
    </div>
    {id === userId && (<div>
      <div>
        <p>Current Cart:</p>
        <div>
          {cart.map((item, i) => {
            return (
              <div>
                <p>{item.id}</p>
                <p>{item.quantity}</p>
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