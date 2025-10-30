import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "./ProductList.css";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [zoomedImage, setZoomedImage] = useState(null); // 👈 for image popup
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const addToCart = async (productId, productName) => {
    try {
      await API.post("/cart", { productId, qty: 1 });
      setSuccessMessage(`${productName} added to cart!`);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      alert("Failed to add item to cart. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="product-list-container">
        <header className="product-header">
          <div className="header-content">
            <h1 className="brand-title">ShopHub</h1>
            <button className="cart-button skeleton-button">
              <span className="cart-icon">🛒</span>
              <span>Cart</span>
            </button>
          </div>
        </header>

        <main className="main-content">
          <div className="section-header">
            <h2 className="section-title">Discover Products</h2>
            <p className="section-subtitle">Explore our curated collection</p>
          </div>

          <div className="product-grid">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="product-card skeleton">
                <div className="product-image-wrapper skeleton-image"></div>
                <div className="product-info">
                  <div className="skeleton-text skeleton-title"></div>
                  <div className="skeleton-text skeleton-price"></div>
                  <div className="skeleton-button-full"></div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      {successMessage && (
        <div className="success-toast">
          <span className="success-icon">✅</span>
          <span>{successMessage}</span>
        </div>
      )}

      <header className="product-header">
        <div className="header-content">
          <h1 className="brand-title">ShopHub</h1>
          <button className="cart-button" onClick={() => navigate("/cart")}>
            <span className="cart-icon">🛒</span>
            <span>Cart</span>
          </button>
        </div>
      </header>

      <main className="main-content">
        

        <div className="product-grid">
          {products.map((p) => (
            <div key={p.id} className="product-card">
              <div className="product-image-wrapper">
                <img
                  src={p.image}
                  alt={p.name}
                  className="product-image"
                  onClick={() => setZoomedImage(p.image)} // 👈 click to zoom
                />
              </div>
              <div className="product-info">
                <h3 className="product-name">{p.name}</h3>
                <div className="product-footer">
                  <span className="product-price">
                    ₹{p.price.toLocaleString()}
                  </span>
                  <button
                    className="add-to-cart-button"
                    onClick={() => addToCart(p.id, p.name)}
                  >
                    <span className="button-icon">+</span>
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 🖼️ Image Zoom Popup */}
      {zoomedImage && (
        <div
          className="zoom-overlay"
          onClick={() => setZoomedImage(null)} // click anywhere to close
        >
          <img src={zoomedImage} alt="Zoomed Product" className="zoomed-image" />
        </div>
      )}
    </div>
  );
}
