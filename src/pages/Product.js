import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

function Product() {
  const { productId } = useParams()
  const [productInfo, setProductInfo] = useState({product: {}, loading: true, exists: false})

  async function callData() {
    try {
      console.log("PRODUCTID", productId)
      const productCall = await fetch(`http://localhost/api/products/products/${productId}`)
      const json = await productCall.json()
      if (productCall.status !== 200) {
        // handle non existent product
        console.log(json.status)
        setProductInfo({product: {}, loading: false, exists: false})
        throw new Error("Error fetching")
      }
      setProductInfo({product: json, loading: false, exists: true})
    } catch(e) {
      console.error(e)
    }
  }

  useEffect(() => {
    callData()
  }, [])
  

  
  return (
  <div>
    {productInfo.loading  && (
      <div>Loading...</div>
    )}
    {(!productInfo.loading && productInfo.exists === false) && (
      <div>Product does not exist</div>
    )}
    {(!productInfo.loading && productInfo.exists === true) && (
      <div>{JSON.stringify(productInfo.product)}</div>
    )}
  </div>
)
}

export default Product;