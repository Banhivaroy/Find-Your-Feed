import React from "react";
import { useNavigate } from "react-router-dom";
function Sevak() {
    const navigate = useNavigate();
  return (
    <div>
      <div className="sevak-signup">
        <div className="signup-card">
          <h1 className="signup-title">Create your account</h1>
          <p className="signup-subtitle">
            Join Find Your Feed and start making an impact.
          </p>
          <form className="sevak-form">
            <div className="form-group">
              <label>Name of your Hotel</label>
              <input type="text" placeholder="Enter hotel name" />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="Enter your email" />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" placeholder="Enter your phone number" />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Create a password" />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" placeholder="Confirm your password" />
            </div>

            <button className="signup-btn" type="submit" onClick={() => navigate('/SevakHomePage')}>
              Create Account
            </button>
            <button className="back" onClick={() => navigate('/signup')}> &#8592; Go Back</button>

            <p className="login-link">
              Already have an account? <span>Login</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Sevak;
