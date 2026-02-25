import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Ceylonica</h3>
          <p>Your trusted e-commerce platform</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: support@ceylonica.com</p>
          <p>Phone: +94 11 234 5678</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2026 Ceylonica. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
