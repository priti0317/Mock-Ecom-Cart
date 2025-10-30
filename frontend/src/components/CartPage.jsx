import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";

export default function CartPage() {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const navigate = useNavigate();

  const loadCart = async () => {
    try {
      const res = await API.get("/cart");
      setCart(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to load cart:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeItem = async (id) => {
    setRemovingId(id);
    try {
      await API.delete(`/cart/${id}`);
      await loadCart();
      setRemovingId(null);
    } catch (err) {
      console.error("Failed to remove item:", err);
      setRemovingId(null);
    }
  };

  if (loading) {
    return (
      <div className="cart-page-container">
        <header className="cart-header">
          <div className="header-content">
            <button className="back-button" onClick={() => navigate("/ProductList")}>
              <span className="back-icon">←</span>
              <span>Continue Shopping</span>
            </button>
            <h1 className="brand-title">ShopHub</h1>
            <div className="header-spacer"></div>
          </div>
        </header>

        <main className="cart-main">
          <div className="cart-content">
            <div className="cart-header-section">
              <h2 className="page-title">Shopping Cart</h2>
              <p className="page-subtitle">Loading your items...</p>
            </div>

            <div className="cart-grid">
              <div className="cart-items-section">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="cart-item skeleton">
                    <div className="skeleton-image"></div>
                    <div className="item-details">
                      <div className="skeleton-text skeleton-title"></div>
                      <div className="skeleton-text skeleton-price"></div>
                    </div>
                    <div className="skeleton-button"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      <header className="cart-header">
        <div className="header-content">
          <button className="back-button" onClick={() => navigate("/ProductList")}>
            <span className="back-icon">←</span>
            <span>Continue Shopping</span>
          </button>
          <h1 className="brand-title">ShopHub</h1>
          <div className="header-spacer"></div>
        </div>
      </header>

      <main className="cart-main">
        <div className="cart-content">
          <div className="cart-header-section">
            <h2 className="page-title">Shopping Cart</h2>
            
          </div>

          {cart.items.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <h3 className="empty-cart-title">Your cart is empty</h3>
              <p className="empty-cart-text">Looks like you haven't added anything to your cart yet.</p>
              <button
                className="shop-now-button"
                onClick={() => navigate("/ProductList")}
              >
                <span>Start Shopping</span>
                <span className="button-arrow">→</span>
              </button>
            </div>
          ) : (
            <div className="cart-grid">
              <div className="cart-items-section">
                <div className="items-header">
                  <span>Product Details</span>
                  <span>Quantity</span>
                  <span>Price</span>
                  <span>Actions</span>
                </div>

                {cart.items.map((item) => (
                  <div 
                    key={item.id} 
                    className={`cart-item ${removingId === item.id ? 'removing' : ''}`}
                  >
                    <div className="item-image-wrapper">
                      <div className="item-image">
                        <span className="item-placeholder">📦</span>
                      </div>
                    </div>

                    <div className="item-details">
                      <h3 className="item-name">{item.name}</h3>
                      
                    </div>

                    <div className="item-quantity">
                      <div className="quantity-badge">
                        <span>Qty: {item.qty}</span>
                      </div>
                    </div>

                    <div className="item-price">
                      <span className="price-label">₹{item.price.toLocaleString()}</span>
                    </div>

                    <div className="item-actions">
                      <button 
                        className="remove-button"
                        onClick={() => removeItem(item.id)}
                        disabled={removingId === item.id}
                      >
                        {removingId === item.id ? (
                          <span className="spinner"></span>
                        ) : (
                          <span className="remove-icon"></span>
                        )}
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div className="summary-card">
                  <h3 className="summary-title">Order Summary</h3>
                  
                  <div className="summary-row">
                    <span className="summary-label">Subtotal</span>
                    <span className="summary-value">₹{cart.total.toLocaleString()}</span>
                  </div>

                  <div className="summary-row">
                    <span className="summary-label">Shipping</span>
                    <span className="summary-value shipping-free">FREE</span>
                  </div>

                  

                  <div className="summary-divider"></div>

                  <div className="summary-row summary-total">
                    <span className="summary-label">Total</span>
                    <span className="summary-value total-amount">
                      ₹{Math.round(cart.total).toLocaleString()}
                    </span>
                  </div>

                  <button 
                    className="checkout-button"
                    onClick={() => navigate("/checkout")}
                  >
                    <span>Proceed to Checkout</span>
                    <span className="checkout-icon">→</span>
                  </button>

                  
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}