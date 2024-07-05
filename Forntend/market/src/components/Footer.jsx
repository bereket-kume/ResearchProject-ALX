// Footer.js

import React from 'react';
import './Footer.css'; // Import your CSS file for styling (optional)

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-8">
          <div className="footer-section">
            <h3 className="text-lg font-semibold mb-2">About Us</h3>
            <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla condimentum tortor sem.</p>
          </div>
          <div className="footer-section">
            <h3 className="text-lg font-semibold mb-2">Links</h3>
            <ul className="list-none">
              <li><a href="/">Home</a></li>
                <li><a href="/shop">Shop</a></li>
                
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="text-lg font-semibold mb-2">Social Media</h3>
            <ul className="list-none">
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">LinkedIn</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <p className="text-gray-500">Adama, Ethiopis</p>
            <p className="text-gray-500">Email: bereketkume@gmail.com</p>
            <p className="text-gray-500">Phone: +251 941545652</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 py-4">
        <div className="container mx-auto px-4 text-center text-gray-300">
          &copy; {new Date().getFullYear()} bereketkume. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
