import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import "./index.css";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />

        <div className="hero-wrapper">
          <HeroCarousel />
        </div>

        <div className="container main-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/party" element={<Party />} />
            <Route path="/orders" element={<OrderHistory />} />
            <Route path="/track" element={<OrderTracking />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>

        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}
