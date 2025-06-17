import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

import Navbar from "./components/Navbar";
import HeroCarousel from "./components/HeroCarousel";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Party from "./pages/Party";
import OrderHistory from "./pages/OrderHistory";
import OrderTracking from "./pages/OrderTracking";
import CartPage from "./pages/CartPage";
import Profile from "./pages/Profile";
import ThanhToanMomo from "./pages/ThanhToanMomo";
import ThanhToanNganHang from "./pages/ThanhToanNganHang";
import "./index.css";

// Bao BrowserRouter trong component để dùng hook useLocation
function AppWrapper() {
  const location = useLocation();

  return (
    <>
      <Navbar />

      {/* Chỉ hiện HeroCarousel ở trang chủ */}
      {location.pathname === "/" && (
        <div className="hero-wrapper">
          <HeroCarousel />
        </div>
      )}

      <div className="container main-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/party" element={<Party />} />
          <Route path="/thanh-toan-momo" element={<ThanhToanMomo />} />
          <Route path="/thanh-toan-ngan-hang" element={<ThanhToanNganHang />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/track" element={<OrderTracking />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <AppWrapper />
      </BrowserRouter>
    </CartProvider>
  );
}
