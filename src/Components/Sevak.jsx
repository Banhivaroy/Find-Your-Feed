import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase.js";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function SevakSignup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    serviceArea: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firebaseError, setFirebaseError] = useState("");

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      e.email = "Enter a valid email";
    if (!form.phone.trim()) e.phone = "Required";
    if (!form.city.trim()) e.city = "Required";
    if (!form.serviceArea) e.serviceArea = "Please select a service area";
    if (form.password.length < 6) e.password = "Min. 6 characters";
    if (form.password !== form.confirmPassword)
      e.confirmPassword = "Passwords don't match";
    if (!form.agreed) e.agreed = "You must agree to continue";
    return e;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFirebaseError("");

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    try {
      // Step 1: create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password,
      );
      const user = userCredential.user;

      // Step 2: save extra data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        city: form.city,
        serviceArea: form.serviceArea,
        role: "sevak",
        createdAt: new Date(),
      });

      // Step 3: show success screen
      setSubmitted(true);
    } catch (err) {
      // show firebase error on the form
      if (err.code === "auth/email-already-in-use") {
        setFirebaseError("This email is already registered. Please log in.");
      } else if (err.code === "auth/weak-password") {
        setFirebaseError("Password is too weak. Use at least 6 characters.");
      } else {
        setFirebaseError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="sevak-page">
        <div className="sevak-bg-overlay" />
        <div className="sevak-card sevak-success">
          <div className="success-icon">✓</div>
          <h2 className="success-title">Welcome, {form.firstName}!</h2>
          <p className="success-msg">
            Your Sevak registration is complete. We'll be in touch shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="sevak-page">
      <div className="sevak-bg-overlay" />

      <div className="sevak-card">
        <div className="sevak-card-header">
          <p className="sevak-role-label">You are signing up as a —</p>
          <h1 className="sevak-role-title">Sevak</h1>
        </div>

        {/* Firebase error shown at top of form */}
        {firebaseError && (
          <div className="firebase-error">{firebaseError}</div>
        )}

        <form className="sevak-form" onSubmit={handleSubmit} noValidate>

          <div className="sevak-row two-col">
            <div className="sevak-field">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Arjun"
                value={form.firstName}
                onChange={handleChange}
                className={errors.firstName ? "input-error" : ""}
              />
              {errors.firstName && <span className="error-msg">{errors.firstName}</span>}
            </div>
            <div className="sevak-field">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Sharma"
                value={form.lastName}
                onChange={handleChange}
                className={errors.lastName ? "input-error" : ""}
              />
              {errors.lastName && <span className="error-msg">{errors.lastName}</span>}
            </div>
          </div>

          <div className="sevak-field">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="arjun@example.com"
              value={form.email}
              onChange={handleChange}
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>

          <div className="sevak-field">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={form.phone}
              onChange={handleChange}
              className={errors.phone ? "input-error" : ""}
            />
            {errors.phone && <span className="error-msg">{errors.phone}</span>}
          </div>

          <div className="sevak-field">
            <label htmlFor="city">City / Location</label>
            <input
              id="city"
              name="city"
              type="text"
              placeholder="Kolkata, West Bengal"
              value={form.city}
              onChange={handleChange}
              className={errors.city ? "input-error" : ""}
            />
            {errors.city && <span className="error-msg">{errors.city}</span>}
          </div>

          <div className="sevak-field">
            <label htmlFor="serviceArea">Area of Service</label>
            <select
              id="serviceArea"
              name="serviceArea"
              value={form.serviceArea}
              onChange={handleChange}
              className={errors.serviceArea ? "input-error" : ""}
            >
              <option value="" disabled>Select your service area</option>
              <option>Healthcare &amp; Well-being</option>
              <option>Education &amp; Tutoring</option>
              <option>Elder Care</option>
              <option>Community Support</option>
              <option>Skill Training</option>
              <option>Other</option>
            </select>
            {errors.serviceArea && <span className="error-msg">{errors.serviceArea}</span>}
          </div>

          <div className="sevak-row two-col">
            <div className="sevak-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className={errors.password ? "input-error" : ""}
              />
              {errors.password && <span className="error-msg">{errors.password}</span>}
            </div>
            <div className="sevak-field">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? "input-error" : ""}
              />
              {errors.confirmPassword && <span className="error-msg">{errors.confirmPassword}</span>}
            </div>
          </div>

          <label className="sevak-checkbox-label">
            <input
              type="checkbox"
              name="agreed"
              checked={form.agreed}
              onChange={handleChange}
            />
            <span>
              I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
            </span>
          </label>
          {errors.agreed && <span className="error-msg">{errors.agreed}</span>}

          <button type="submit" className="sevak-btn-submit" disabled={loading}>
            {loading ? "Registering..." : "Register as Sevak"}
          </button>

          <p className="sevak-login-link">
            Already registered? <span onClick={() => navigate("/login")}>Sign in here</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SevakSignup;
