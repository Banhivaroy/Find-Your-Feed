import React from 'react'
import { Link } from 'react-router-dom'
function SevakHomePage() {
  return (
    <div>
      <div className='friends'>
        <h1 className='friends-title'>Your Friends</h1>
        <p className='friends-sub-head'>Communities you have previously donated to</p>
        <div className='friends-list'>
            <ul>
                <li><Link to="/SwastSathi.com">Swast Sathi</Link></li>
                <li><Link to="/Foodisourfriend.com">Food is our friend</Link></li>
                <li><Link to="/LiveYourLife.com">Live your life</Link></li>
            </ul>
        </div>
      </div>
    </div>
  )
}

export default SevakHomePage
