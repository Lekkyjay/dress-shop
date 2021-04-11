import React, { useState } from 'react'
import Cart from '../components/Cart'
import Filter from '../components/Filter'
import Product from '../components/Product'
import data from '../data.json'

const Products = () => {

  const [item, setItem] = useState({
    products: data.products,
    cartItems: localStorage.getItem("cartItems") 
      ? JSON.parse(localStorage.getItem("cartItems")) 
      : [],
    size: "",
    sort: ""
  })

  const createOrder = (order) => {
    alert("Need to save order for " + order.name);
  };

  const removeFromCart = (product) => {
    const cartItems = item.cartItems.slice();
    setItem({ ...item,
      cartItems: cartItems.filter((x) => x._id !== product._id),
    });
    localStorage.setItem("cartItems", 
      JSON.stringify(item.cartItems.filter((x) => x._id !== product._id))
    );
  };

  const addToCart = (product) => {
    const cartItems = item.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((cartItem) => {
      if (cartItem._id === product._id) {
        cartItem.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      //cartItem structure is created here. count property added to product object.
      cartItems.push({ ...product, count: 1 }); 
    }
    setItem({ ...item, cartItems });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }  

  return (
    <main>
      <div className="content">
        <div className="main">
          <Filter />
          <Product addToCart={addToCart} />
        </div>
        <div className="sidebar">
          <Cart
            cartItems={item.cartItems}
            removeFromCart={removeFromCart}
            createOrder={createOrder}
          />
        </div>
      </div>
    </main>
  )
}

export default Products
