import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import './Product.css';
import { PROTOCOL, DOMAIN } from '../state/Env';

function Product() {
  const { productId } = useParams()
  const [productInfo, setProductInfo] = useState({product: {}, loading: true, exists: false})

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
            <select name={"quantity"}>
              {Array.from({length: productInfo.product.quantity}, (_, i) => <option key={i} value={i + 1}>{i + 1}</option>)}
            </select>
            <button>Add to cart</button>
          </div>
        </div>
      </div>
    )}
  </div>
)
}

export default Product;