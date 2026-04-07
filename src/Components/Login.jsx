import { useState} from "react"
import {auth} from "../firebase"
import "../App.css"
import {useNavigate} from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"



function SevakLogin() {
  const navigate = useNavigate();
  const [form,setForm] = useState({
    email: "",
    password: ""
  })
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);

  const handleChange = (e) =>{
    const {name,value} = e.target;
    setForm((prev) => ({...prev, [name] : value}));
    setError("");
  }
   const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      navigate("/SevakHomePage"); // change to your route
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setError("No account found with this email.");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (err.code === "auth/too-many-requests") {
        setError("Too many attempts. Please try again later.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  
  return (
   <div className="sevak-login-page">
      <div className="sevak-login-bg-overlay" />

      <div className="sevak-login-card">

        <div className="sevak-login-header">
          <p className="sevak-role-label">Signing in as —</p>
          <h1 className="sevak-role-title">Sevak</h1>
          <p className="sevak-login-subtitle">
            Welcome back. Log in to continue your service.
          </p>
        </div>

        {error && <div className="sevak-login-error">{error}</div>}

        <form className="sevak-login-form" onSubmit={handleSubmit} noValidate>

          <div className="sevak-login-field">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="arjun@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="sevak-login-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
            />
            <span
              className="sevak-forgot"
              onClick={() => navigate("#")}
            >
              Forgot password?
            </span>
          </div>

          <button
            type="submit"
            className="sevak-login-btn"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <button
            type="button"
            className="sevak-back-btn"
            onClick={() => navigate(-1)}
          >
            &#8592; Go back
          </button>

          <p className="sevak-register-link">
            New here?{" "}
            <span onClick={() => navigate("/sevak")}>
              Create an account
            </span>
          </p>

        </form>
      </div>
    </div>
  )
}

export default SevakLogin 
