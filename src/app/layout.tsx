import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ReactNode } from "react";
import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";
import SiteShell from "../components/SiteShell";

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
        {/* Load GA script */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-Y0TK6P88FP`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Y0TK6P88FP', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        <CartProvider>
          <WishlistProvider>
            <SiteShell>{children}</SiteShell>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}