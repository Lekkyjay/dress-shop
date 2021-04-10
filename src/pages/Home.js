import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="hero">
      <div className="left">
        <h1>UP TO 50% OFF ON SALES</h1>
        <small>Get all exclusive offers for the season</small>
        <Link to="/products">View Collection</Link>
      </div>
      <div className="right">
        <img src="/images/dress.png" alt="" />
      </div>
    </div>
  )
}

export default Home
