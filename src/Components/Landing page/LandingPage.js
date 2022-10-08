import React from 'react'
import "./LandingPage.css"

function LandingPage() {
  return (
    <div className='landing-page'>
      <div className='container header'>
        <h1 className='line line1'>Welcome to</h1>
        <h1 className='line line2'>CryptoTracker</h1>
        <div className="btn-div">
          <button className='get-started-btn'><span>Get Started </span></button>
        </div>
      </div>
    </div>
  )
}

export default LandingPage