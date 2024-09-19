import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom';
import './Product.css';
import { PROTOCOL, DOMAIN } from '../state/Env';
import { SESSION } from '../state/SessionProvider';

function Product() {
  const { productId } = useParams()
  const {sessionState, setSessionState} = useContext(SESSION)
  const [productInfo, setProductInfo] = useState({product: {}, loading: true, exists: false})
  console.log(sessionState)

  // should check if product is already owned
  async function callData() {
    try {
      const productCall = await fetch(`${PROTOCOL}://${DOMAIN}/api/products/${productId}`)
      const json = await productCall.json()
      if (productCall.status !== 200) {
        // handle non existent product
        setProductInfo({product: {}, loading: false, exists: false})
        throw new Error("Error fetching")
      }
      setProductInfo({product: json.data, loading: false, exists: true})
    } catch(e) {
      console.error(e)
    }
  }

  useEffect(() => {
    callData()
  }, [])

  async function addToCart(id) {
    try {
      const addCall = await fetch(`${PROTOCOL}://${DOMAIN}/api/cart/`, {credentials: "include", method: "POST", body: JSON.stringify({product_id: id, quantity: 1})})
      if (addCall.status !== 200) {
        throw new Error("Error adding item to cart")
      }
      const json = await addCall.json()
      sessionState.cart.push(json.data)
      setSessionState({...sessionState})
    } catch(e) {
      return console.error(e)
    }
  }

  function checkCart(id) {
    if (!sessionState.id) return
    if (!sessionState.cart[0]) return <button onClick={() => {addToCart(id)}} >Add to cart</button>
    let inCart = false
    sessionState.cart.forEach((product, i) => {
      if (product.productId === id) inCart = true
    })
    if (inCart) return <p>Product already in cart</p>
    return <button onClick={() => {addToCart(id)}} >Add to cart</button>
  }
  
  return (
  <div className="product">
    {productInfo.loading  && (
      <div>Loading...</div>
    )}
    {(!productInfo.loading && productInfo.exists === false) && (
      <div>Product does not exist</div>
    )}
    {(!productInfo.loading && productInfo.exists) && (
      <div>
        <h1>
          {productInfo.product.name}
        </h1>
        <div>
          <img src={productInfo.product.mainImage} height={300} width={300} alt={productInfo.product.name} />
        </div>
        <div>
          <p>{productInfo.product.description}</p>
          <p>Author: {productInfo.product.author}</p>
        </div>
        <div className='product-cart'>
          <p>${productInfo.product.price}</p>
          <div>
            {/* <select name={"quantity"}>
              {Array.from({length: productInfo.product.quantity}, (_, i) => <option key={i} value={i + 1}>{i + 1}</option>)}
            </select> */}
            {checkCart(productInfo.product.id)}
          </div>
        </div>
      </div>
    )}
  </div>
)
}

export default Product;