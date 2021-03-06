import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Fade from 'react-reveal/Fade'
import Modal from 'react-modal'
import Zoom from 'react-reveal/Zoom'
import formatCurrency from '../util'
import { removeFromCart } from '../redux/actions/cartActions'
import { clearOrder, createOrder } from '../redux/actions/orderActions'

const Cart = () => {

  const cartItems = useSelector(state => state.cart.cartItems)
  const order = useSelector(state => state.order.order)

  const dispatch = useDispatch()

  const [client, setClient] = useState({
    name: "",
    email: "",
    address: "",
    showCheckout: false,
  })

  const handleInput = (e) => {
    setClient({...client, [e.target.name]: e.target.value })
  }

  const handleCheckout = (e) => {
    e.preventDefault();
    const order = {
      name: client.name,
      email: client.email,
      address: client.address,
      cartItems: cartItems,
      total: cartItems.reduce((a, c) => a + c.price * c.count, 0)
    };
    dispatch(createOrder(order))
    setClient({
      name: "",
      email: "",
      address: "",
      showCheckout: false
    })
  }

  const closeModal = () => {
    dispatch(clearOrder())
  }

  return (
    <div>
      {cartItems.length === 0 
        ? (<div className="cart cart-header">Cart is empty</div>) 
        : (
          <div className="cart cart-header">
            You have {cartItems.length > 1 ? cartItems.length + ' items ' : cartItems.length + ' item '} in the cart{" "}
          </div>
        )}

      { order && ( 
        <Modal isOpen={true} onRequestClose={closeModal}>
          <Zoom>
            <button className="close-modal" onClick={ closeModal }>
              x
            </button>
            <div className="order-details">
              <h3 className="success-message">Your order has been placed.</h3>
              <h2>Order {order._id}</h2>
              <ul>
                <li>
                  <div>Name:</div>
                  <div>{order.name}</div>
                </li>
                <li>
                  <div>Email:</div>
                  <div>{order.email}</div>
                </li>
                <li>
                  <div>Address:</div>
                  <div>{order.address}</div>
                </li>
                <li>
                  <div>Date:</div>
                  <div>{order.createdAt}</div>
                </li>
                <li>
                  <div>Total:</div>
                  <div>{formatCurrency(order.total)}</div>
                </li>
                <li>
                  <div>Cart Items:</div>
                  <div>
                    {order.cartItems.map((x) => (
                      <div key={x._id}>
                        {x.count} {" x "} {x.title}
                      </div>
                    ))}
                  </div>
                </li>
              </ul>
            </div>
          </Zoom>
        </Modal>
      )}
      
      <div>
        <div className="cart">
          <Fade left cascade>
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li key={item._id}>
                  <div>
                    <img src={item.image} alt={item.title}></img>
                  </div>
                  <div>
                    <div>{item.title}</div>
                    <div className="right">
                      {formatCurrency(item.price)} x {item.count}{" "}
                      <button
                        className="button"
                        onClick={() => dispatch(removeFromCart(item))} 
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Fade>
        </div>
        {cartItems.length !== 0 && (
          <div>
            <div className="cart">
              <div className="total">
                <div>
                  Total:{" "}
                  {formatCurrency(cartItems.reduce((a, c) => a + c.price * c.count, 0))}
                </div>
                <button
                  onClick={ () => setClient({...client, showCheckout: true }) }
                  className="button primary"
                >
                  Proceed
                </button>
              </div>
            </div>
            {client.showCheckout && (
              <Fade right cascade>
                <div className="cart">
                  <form onSubmit={handleCheckout}>
                    <ul className="form-container">
                      <li>
                        <label>Email</label>
                        <input
                          name="email"
                          type="email"
                          required
                          onChange={handleInput}    
                        ></input>
                      </li>
                      <li>
                        <label>Name</label>
                        <input
                          name="name"
                          type="text"
                          required
                          onChange={handleInput}
                        ></input>
                      </li>
                      <li>
                        <label>Address</label>
                        <input
                          name="address"
                          type="text"
                          required
                          onChange={handleInput}
                        ></input>
                      </li>
                      <li>
                        <button className="button primary" type="submit"> Checkout </button>
                      </li>
                    </ul>
                  </form>
                </div>
              </Fade>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
