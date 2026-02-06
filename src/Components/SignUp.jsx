import React from 'react'
import { useNavigate } from 'react-router-dom'

function SignUp() {
  const navigate = useNavigate();
  return (
    <div>
      <div className='signup-hero'>
        <div className='hero-role'>
          <h1 className='role-title'>You are serving the role of a-</h1>

            <div className='hero-btns'>
              <button className='hero-button Sevak' onClick={() => navigate('/sevak')}>Sevak</button>
              <button className='hero-button Grahak' onClick={() => navigate('/grahak')}>Grahak</button>
            </div>
        </div>
      
      </div>
    </div>
  )
}

export default SignUp
