import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";
import CartDrawer from "../components/CartDrawer";
import MobileBottomBar from "../components/MobileBottomBar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "The Green Story | Natural Herbal Care",
  description: "High-quality, natural herbal personal care.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="flex flex-col min-h-screen">
        <CartProvider>
          <WishlistProvider>
            <Header />
            <CartDrawer />
            <main className="flex-grow pb-16 md:pb-0">{children}</main>
            <Footer />
            <MobileBottomBar />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}