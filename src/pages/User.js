import React, {useState, useEffect, useContext} from 'react';
import { SESSION } from '../state/SessionProvider';
import { useParams } from 'react-router-dom';
import "./User.css"
import ProductCard from '../components/ProductsCard';
import { PROTOCOL, DOMAIN } from '../state/Env';

function User() {
  const {sessionState, setSessionState} = useContext(SESSION)
  const {id, purchases, cart} = sessionState
  const userId = parseInt(useParams().userId)

  const [userInfo, setUserInfo] = useState({exists: false, name: null, picture: null, products: []})

  // call to get general info of user. If user path matches sessionId, call for purchases
  async function callUserAndProducts() {
    try {
      const userCall = await fetch(`${PROTOCOL}://${DOMAIN}/api/users/${userId}`)
      if (userCall.status === 404) {
        // user doesn't exist
        return
      }
      if (userCall.status !== 200) {
        throw new Error("User call error")
      }
      const userJson = await userCall.json()
      const {name, picture} = userJson.data
      if (id !== userId || (!cart || !cart[0])) {
        setUserInfo({exists: true, name, picture, products: []})
        return
      }
      const responses = await Promise.all(cart.map(item => fetch(`${PROTOCOL}://${DOMAIN}/api/products/${item.productId}/`)));
      const data = await Promise.all(responses.map(item => item.json()));
      const result = data.map((item, i) => {
        item.data.userQuantity = cart[i].quantity
        return item.data
      })
      setUserInfo({exists: true, name, picture, products: result})
    } catch(e) {
      console.error(e)
    }
  }

  useEffect(() => {
    callUserAndProducts()
  }, [])

  async function removeFromCart(productId) {
    try {
      let cartId
      cart.forEach(item => {
        if (item.productId === productId) {
          return cartId = item.id
        }
      })
      const deleteCall = await fetch(`${PROTOCOL}://${DOMAIN}/api/cart/${cartId}`, {method: 'DELETE', credentials: 'include'})
      if (deleteCall.status !== 200) {
        throw new Error("Delete call error")
      }
      const newCart = sessionState.cart.filter(item => {
        return item.productId !== productId
      }).map(i => i)
      setSessionState({...sessionState, cart: newCart})
      userInfo.products = userInfo.products.filter(item => {
        return item.id !== productId
      }).map(i => i)
      setUserInfo({...userInfo})
    } catch(e) {
      return console.error(e)
    }
  }

  if (!userInfo.exists) {
    return (
      <>
        <p>User does not exist</p>
      </>
    )
  }

  return (
  <div className={"user"}>
    <div>
      <img src={userInfo.picture} alt={userInfo.name} />
      <div>{userInfo.name}</div>
    </div>
    {id === userId && (<div>
      <div>
        <p>Current Cart:</p>
        <div className='user-cart-wrapper'>
          {(!userInfo.products || !userInfo.products[0]) && (<p>Empty Cart</p>)}
          {(userInfo.products && userInfo.products[0]) && userInfo.products.map((item, i) => {
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
      <div>
        <p>Previous purchases:</p>
        <div>
          {purchases.map((purchase, i) => {
            return (
              <div key={i} className='user-purchases'>
                <p>Purchased: {new Date(purchase.createdAt).toISOString().split('T')[0]}</p>
                <p>Cost: {purchase.totalPrice}</p>
                <p>Items: {purchase.cartItemIds}</p>
              </div>
            )
          })}
        </div>
      </div>
  </div>)}
</div>)
}

export default User;