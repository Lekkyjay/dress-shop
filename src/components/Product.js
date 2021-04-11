import React, { useEffect, useState } from 'react'
import { FaCartPlus, FaSearch } from 'react-icons/fa'
import Fade from 'react-reveal/Fade'
import Modal from 'react-modal'
import Zoom from 'react-reveal/Zoom'
import formatCurrency from '../util'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../redux/actions/productActions'
import { addToCart } from '../redux/actions/cartActions'

const Product = () => {

  const [product, setProduct] = useState(null)  //for toggling the Modal

  const dispatch = useDispatch()
  const products = useSelector(state => state.products.filteredItems)
  
  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  const openModal = (product) => {
    setProduct(product);
  }

  const closeModal = () => {
    setProduct(null);
  }
  
  return (
    <div>
      <Fade bottom cascade>
        <ul className="products">
        {!products 
          ? <div>Loading ...</div>
          : products.map((product) => (
          <li key={product._id} className="product">          
            <div className="product-header">
              <img src={product.image} alt={product.title}></img>
            </div>
            <div className="product-footer">
              <p className="title">{product.title}</p>
              <p className="price">{formatCurrency(product.price)}</p>
            </div>
            <div className="product-icons">          
              <FaSearch className="product-icon" onClick={() => openModal(product)} />          
              <FaCartPlus className="product-icon" onClick={() => dispatch(addToCart(product))} />
            </div>
          </li>
        ))}
        </ul>
      </Fade>
      {product && (
        <Modal isOpen={true} onRequestClose={closeModal}>
          <Zoom>
            <button className="close-modal" onClick={closeModal}>
              x
            </button>
            <div className="product-details">
              <img src={ product.image } alt={ product.title }></img>
              <div className="product-details-description">
                <p> <strong>{ product.title }</strong> </p>
                <p>{ product.description }</p>
                <p> Avaiable Sizes:{" "}
                  {product.availableSizes.map((x) => (
                    <span>
                      {" "}
                      <button className="button">{x}</button>
                    </span>
                  ))}
                </p>
                <div className="product-price">
                  <div>{formatCurrency(product.price)}</div>
                  <button
                    className="button primary"
                    onClick={() => {
                      dispatch(addToCart(product))
                      closeModal()
                    }}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </Zoom>
        </Modal>
      )}
    </div>
  )
}

export default Product
