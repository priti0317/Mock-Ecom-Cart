import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { UserContext } from "../context/UserContext";
import "./styles.css";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      return alert("Please enter both email and password");
    }

    setIsLoading(true);
    try {
      const res = await API.post("/users/login", form);
      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data.user);
      alert("Login successful!");
      navigate("/ProductList");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Invalid credentials, try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Header Section */}
        <div className="login-header">
          <div className="logo">
            
            <h1>ShopHub</h1>
          </div>
          <h2>Welcome Back</h2>
          <p>Sign in to your account to continue</p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
              className="modern-input"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
              className="modern-input"
            />
          </div>

          <button 
            type="submit" 
            className={`login-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="spinner"></div>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Footer Section */}
        <div className="login-footer">
          <p>
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="register-link"
            >
              Create account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}