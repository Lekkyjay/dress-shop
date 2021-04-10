import React from 'react'
import { Link } from 'react-router-dom'
import { FaCartPlus, FaSearch } from 'react-icons/fa'
import formatCurrency from '../util'

const Product = ({ products }) => {
  return (
    <div>
      <ul className="products">
      {products.map((product) => (
        <li key={product._id} className="product">          
          <div className="product-header">
            <img src={product.image} alt={product.title}></img>
          </div>
          <div className="product-footer">
            <p className="title">{product.title}</p>
            <p className="price">{formatCurrency(product.price)}</p>
          </div>
          <div className="product-icons">
          <Link to="">
            <FaSearch className="product-icon" />
          </Link>
          <Link to="">
            <FaCartPlus className="product-icon" />
          </Link>          
          </div>
        </li>
      ))}
      </ul>
    </div>
  )
}

export default Product
