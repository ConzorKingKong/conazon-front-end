import React from 'react'
import {Link} from 'react-router-dom'

function ProductCard(props) {
  return (
    <Link to={"/products/" + props.id} style={{textDecoration: "none"}}>
      <img src={props.mainImage} width={300} height={300} alt={props.name} />
      <p>{props.name}</p>
      <p>{props.author}</p>
      <p>{props.description}</p>
      <p>${props.price}</p>
    </Link>
  )
}

export default ProductCard;