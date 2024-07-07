import React, {useState, useEffect, useContext} from 'react';
import ProductCard from '../components/ProductsCard';
import "./Products.css";
import { PROTOCOL, DOMAIN } from '../state/Env';
import { SESSION } from '../state/SessionProvider';

function Products() {
  const [products, setProducts] = useState([])
  const {sessionState, setSessionState} = useContext(SESSION)

  async function callData() {
    // end slash in url required
    const productsCall = await fetch(`${PROTOCOL}://${DOMAIN}/api/products/`)
    const json = await productsCall.json()
    setProducts(json.data)
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
      setSessionState(sessionState)
    } catch(e) {
      return console.error(e)
    }
  }

  function checkCart(id) {
    if (!sessionState.id) return
    if (!sessionState.cart[0]) return <button onClick={() => {addToCart(id)}} >Add to cart</button>
    let inCart = false
    sessionState.cart.forEach(product => {
      if (product.productId === id) inCart = true
    })
    if (inCart) return
    return (
      <button onClick={() => {addToCart(id)}} >Add to cart</button>
    )
  }

  return (
    <div className={"products"}>
      <h1>
        Products
      </h1>
      <div className={"products-grid"}>
        {products && products.map(product => {
          const {id, name, description, mainImage, category, price, author} = product
          return (
          <div key={id}>
            <ProductCard id={id} name={name} description={description} mainImage={mainImage} category={category} price={price} author={author} width={300} height={300} />
            {checkCart(id)}
          </div>
          )
        })}
      </div>
    </div>
  )
}

export default Products;
