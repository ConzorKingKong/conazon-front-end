import React, {useState, useEffect} from 'react';
import ProductCard from '../components/ProductsCard';
import "./Products.css"

function Products() {
  const [products, setProducts] = useState([])

  async function callData() {
    // end slash in url required
    const productsCall = await fetch(`http://localhost/api/products/`)
    const json = await productsCall.json()
    setProducts(json.data)
  }

  useEffect(() => {
    callData()
  }, [])

  return (
    <div className={"products"}>
      <h1>
        products
      </h1>
      <div className={"products-grid"}>
        {products && products.map(product => {
          const {id, name, description, mainImage, category, price, author} = product
          return (
          <div key={id}>
            <ProductCard id={id} name={name} description={description} mainImage={mainImage} category={category} price={price} author={author} />
          </div>
          )
        })}
      </div>
    </div>
  )
}

export default Products;
