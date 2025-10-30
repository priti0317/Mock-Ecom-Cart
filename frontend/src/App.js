import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage"; // ✅ Import RegisterPage
import ProductList from "./components/ProductList";
import CartPage from "./components/CartPage";
import CheckoutPage from "./components/CheckoutPage";

export default function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Redirect root path to /login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected or main app routes */}
          <Route path="/productList" element={<ProductList />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}
