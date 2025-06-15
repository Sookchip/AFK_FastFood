import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import HeroCarousel from "./components/HeroCarousel";
import Footer from "./components/Footer";
import Home from "./pages/Home";
// ... các page khác
import "./index.css";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />

        {/* Carousel với khoảng cách từ Navbar */}
        <div className="hero-wrapper">
          <HeroCarousel />
        </div>

        {/* Nội dung chính */}
        <div className="container main-container">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* ... các route khác */}
          </Routes>
        </div>

        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}
