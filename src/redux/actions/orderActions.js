import { CREATE_ORDER, CLEAR_CART, CLEAR_ORDER, FETCH_ORDERS } from '../action.types'

export const createOrder = (order) => (dispatch) => {
  const data = {...order}
  dispatch({ 
    type: CREATE_ORDER, 
    payload: data 
  })

  localStorage.clear("cartItems")
  dispatch({ type: CLEAR_CART })
}

// export const clearOrder = () => (dispatch) => {
//   dispatch({ type: CLEAR_ORDER });
// }

export const clearOrder = () => {
  return { type: CLEAR_ORDER }
}

export const fetchOrders = () => (dispatch) => {
  fetch("/api/orders")
    .then((res) => res.json())
    .then((data) => {
      dispatch({ 
        type: FETCH_ORDERS, 
        payload: data 
      });
    });
};
