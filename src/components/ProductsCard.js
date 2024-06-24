import React from 'react'
import {Link} from 'react-router-dom'

function ProductCard(props) {
  console.log(props)
  return (
    <Link to={"/products/" + props.id}>
      <img src={props.mainImage} width={300} height={300} alt="Product Image" />
      <div>{props.name}</div>
      <div>{props.author}</div>
      <div>{props.description}</div>
      <div>{props.price}</div>
    </Link>
  )
}

export default ProductCard;