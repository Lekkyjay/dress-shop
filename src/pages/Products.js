import React from 'react'
import Cart from '../components/Cart'
import Filter from '../components/Filter'
import Product from '../components/Product'

const Products = () => {  

  const createOrder = (order) => {
    alert("Need to save order for " + order.name);
  } 
  
  return (
    <main>
      <div className="content">
        <div className="main">
          <Filter />
          <Product />
        </div>
        <div className="sidebar">
          <Cart createOrder={createOrder} />
        </div>
      </div>
    </main>
  )
}

export default Products
