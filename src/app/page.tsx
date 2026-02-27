"use client";

import { useState } from "react";

export default function Home() {
  // Array of your products
  const products = [
    {
      id: 1,
      name: "Ubtan Body Wash",
      description: "Bridal Glow & Deep Cleansing - 200ml",
      price: "₹550",
      image: "https://via.placeholder.com/300x400?text=Ubtan+Body+Wash"
    },
    {
      id: 2,
      name: "Hair Toner",
      description: "Root Stimulator & Refresher - 100ml",
      price: "₹350",
      image: "https://via.placeholder.com/300x400?text=Hair+Toner"
    },
    {
      id: 3,
      name: "Onion Hair Oil",
      description: "With Black Seed & Shikakai - 100ml",
      price: "₹350",
      image: "https://via.placeholder.com/300x400?text=Onion+Hair+Oil"
    },
    {
      id: 4,
      name: "Amla & Reetha Shampoo",
      description: "Gentle Herbal Cleanser - 200ml",
      price: "₹550",
      image: "https://via.placeholder.com/300x400?text=Amla+Shampoo"
    }
  ];

  return (
    <main>
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h2>Luxury Ayurvedic Care</h2>
          <p>Nature-backed, transparent, and gentle formulas for your hair and body.</p>
          <button className="btn-primary">Shop The Collection</button>
        </div>
      </header>

      {/* Bestsellers Section */}
      <section className="products-section">
        <h2 className="section-title">Our Bestsellers</h2>
        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <span className="price">{product.price}</span>
                <button 
                  className="add-to-cart" 
                  onClick={() => alert(`Added ${product.name} to cart!`)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-col">
            <h4>About</h4>
            <a href="#">Our Roots</a>
            <a href="#">Sourcing Transparency</a>
          </div>
          <div className="footer-col">
            <h4>Help</h4>
            <a href="#">Contact Us</a>
            <a href="#">FAQ</a>
            <a href="#">Shipping & Returns</a>
          </div>
        </div>
      </footer>
    </main>
  );
}