import type { Metadata } from "next";
import "./globals.css";

// This helps your site show up correctly on Google
export const metadata: Metadata = {
  title: "The Green Story",
  description: "High-quality, natural herbal personal care.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* The announcement bar and navbar can go here so they appear on EVERY page later */}
        <div className="announcement-bar">
          Free Shipping on all orders above ₹499
        </div>

        <nav className="navbar">
          <div className="nav-links">
            <a href="#">Shop</a>
            <a href="#">Ingredients</a>
            <a href="#">Our Story</a>
          </div>
          <div className="logo">
            <h1>The Green Story.</h1>
          </div>
          <div className="nav-icons">
            <button>Search</button>
            <button>Account</button>
            <button>Cart</button>
          </div>
        </nav>

        {/* This "children" variable loads your page.tsx content */}
        {children}
      </body>
    </html>
  );
}