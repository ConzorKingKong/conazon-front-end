import React, {useState, useEffect} from 'react';
import ProductCard from '../components/ProductsCard';

function Products() {
  const [products, setProducts] = useState([])

  async function callData() {
    const productsCall = await fetch('http://localhost/api/products/products/')
    const json = await productsCall.json()
    console.log(json)
    setProducts(json.data)
  }

  useEffect(() => {
    callData()
  }, [])

  return (
    <div>
      products
      {/* <ProductCard products={products} /> */}
      {products && products.map(product => {
        const {id, name, description, mainImage, category, price, author} = product
        return (
        <div key={id}>
          <ProductCard id={id} name={name} description={description} mainImage={mainImage} category={category} price={price} author={author} />
        </div>
        )
      })}
    </div>
  )
}

export default Products;
