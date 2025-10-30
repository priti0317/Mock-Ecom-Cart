import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import ReceiptModal from "./ReceiptModal";
import "./CheckoutPage.css";

export default function CheckoutPage() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const cartRes = await API.get("/cart");
      const payload = {
        cartItems: cartRes.data.items,
        name: form.name,
        email: form.email,
      };
      const res = await API.post("/checkout", payload);
      setReceipt(res.data);
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page-container">
      <header className="checkout-header">
        <div className="header-content">
          <button className="back-button" onClick={() => navigate("/cart")}>
            <span className="back-icon">←</span>
            <span>Back to Cart</span>
          </button>
          <h1 className="brand-title">ShopHub</h1>
          <div className="header-spacer"></div>
        </div>
      </header>

      <main className="checkout-main">
        <div className="checkout-content">
          <div className="checkout-hero">
            
            <h2 className="checkout-title">Checkout</h2>
            <p className="checkout-subtitle">Complete your purchase by entering your details below</p>
          </div>

          <div className="checkout-card">
            <div className="progress-steps">
              <div className="step active">
                <div className="step-number">1</div>
                <span className="step-label">Cart</span>
              </div>
              <div className="step-line active"></div>
              <div className="step active">
                <div className="step-number">2</div>
                <span className="step-label">Details</span>
              </div>
              <div className="step-line"></div>
              <div className="step">
                <div className="step-number">3</div>
                <span className="step-label">Payment</span>
              </div>
            </div>

            <form className="checkout-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-section">
                <h3 className="section-title">
                  <span className="section-icon">👤</span>
                  Contact Information
                </h3>

                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Full Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                  <span className="input-hint">We'll send your receipt to this email</span>
                </div>
              </div>

              

              <div className="form-actions">
                <button
                  type="button"
                  className="generate-bill-button"
                  onClick={handleCheckout}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="button-spinner"></span>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span className="button-icon">📄</span>
                      <span>Generate Bill</span>
                      <span className="button-arrow">→</span>
                    </>
                  )}
                </button>

                
              </div>
            </form>
          </div>

         
        </div>
      </main>

      {receipt && <ReceiptModal receipt={receipt} onConfirm={() => navigate("/ProductList")} />}
    </div>
  );
}