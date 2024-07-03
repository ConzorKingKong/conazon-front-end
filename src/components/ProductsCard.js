import React from 'react'
import {Link} from 'react-router-dom'

function ProductCard(props) {
  const {id, mainImage, name, author, description, price, width, height} = props
  return (
    <Link to={"/products/" + id} style={{textDecoration: "none"}}>
      <img src={mainImage} width={width} height={height} alt={name} />
      <p>{name}</p>
      <p>{author}</p>
      <p>{description}</p>
      <p>${price}</p>
    </Link>
  )
}

export default ProductCard;