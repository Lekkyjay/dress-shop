import React, { useState } from 'react'
import Cart from '../components/Cart'
import Filter from '../components/Filter'
import Product from '../components/Product'
import data from '../data.json'

const Products = () => {

  const [item, setItem] = useState({
    products: data.products,
    cartItems: localStorage.getItem("cartItems") ? 
      JSON.parse(localStorage.getItem("cartItems")) : [],
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
      cartItems.push({ ...product, count: 1 });
    }
    setItem({ ...item, cartItems });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  const sortProducts = (event) => {
    const sort = event.target.value;
    console.log('sort', event.target.value);
    setItem({...item,
      sort: sort,
      products: item.products.slice().sort((a, b) =>
          sort === "lowest" ? 
            a.price > b.price ? 1 : -1
          : sort === "highest" ? 
            a.price < b.price ? 1 : -1
          : a._id < b._id ? 1 : -1
        ),
    });
  }

  const filterProducts = (event) => {
    console.log(event.target.value);
    if (event.target.value === "") {
      setItem({...item, size: event.target.value, products: data.products });
    } else {
      setItem({...item,
        size: event.target.value,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(event.target.value) >= 0
        ),
      });
    }
  }

  return (
    <main>
      <div className="content">
        <div className="main">
          <Filter
            count={item.products.length}
            size={item.size}
            sort={item.sort}
            filterProducts={filterProducts}
            sortProducts={sortProducts}
          ></Filter>
          <Product
            products={item.products}
            addToCart={addToCart}
          ></Product>
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
