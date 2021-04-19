import React from 'react'
import Cart from '../components/Cart'
import Filter from '../components/Filter'
import Product from '../components/Product'

const Products = () => {  
  
  return (
    <main className="products-main">
      <div className="content">
        <div className="main">
          <Filter />
          <Product />
        </div>
        <div className="sidebar">
          <Cart />
        </div>
      </div>
      <footer>
        <p>Dress Shop. &#169; {new Date().getFullYear()} </p>
      </footer>
    </main>
  )
}

export default Products
