import React from "react";
import "./ReceiptModal.css";

export default function ReceiptModal({ receipt, onConfirm }) {
  return (
    <div className="receipt-modal-overlay">
      <div className="receipt-modal-content">
        <div className="receipt-header">
          <div className="success-checkmark">
            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
              <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
          </div>
          <h2 className="receipt-title">Payment Successful!</h2>
          <p className="receipt-subtitle">Your order has been confirmed</p>
        </div>

        <div className="receipt-body">
          <div className="receipt-card">
            <div className="receipt-logo">
              
              <span className="logo-text">ShopHub</span>
            </div>

            <div className="receipt-divider"></div>

            <div className="receipt-section">
              <h3 className="section-title">Order Details</h3>
              
              <div className="receipt-row">
                <span className="row-label">
                  <span className="row-icon">👤</span>
                  Customer Name
                </span>
                <span className="row-value">{receipt.name}</span>
              </div>

              <div className="receipt-row">
                <span className="row-label">
                  <span className="row-icon">📧</span>
                  Email Address
                </span>
                <span className="row-value">{receipt.email}</span>
              </div>

              <div className="receipt-row">
                <span className="row-label">
                  <span className="row-icon">🕐</span>
                  Order Time
                </span>
                <span className="row-value">{new Date(receipt.timestamp).toLocaleString()}</span>
              </div>
            </div>

            <div className="receipt-divider"></div>

            <div className="receipt-section">
              <div className="total-row">
                <span className="total-label">Total Amount</span>
                <span className="total-value">₹{receipt.total.toLocaleString()}</span>
              </div>
            </div>

            <div className="receipt-footer">
              <p className="footer-text">
                A confirmation email has been sent to <strong>{receipt.email}</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="receipt-actions">
          <button className="confirm-button" onClick={onConfirm}>
            <span>Continue Shopping</span>
            <span className="button-arrow">→</span>
          </button>
          
          <button className="download-button" onClick={() => window.print()}>
            
            <span>Download Receipt</span>
          </button>
        </div>

        <div className="receipt-badge">
          <span className="badge-icon">🔒</span>
          <span className="badge-text">Secure Transaction</span>
        </div>
      </div>
    </div>
  );
}