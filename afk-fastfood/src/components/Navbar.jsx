import React from "react";
import { Navbar as BSNavbar, Nav, Container, Badge } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Navbar.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Navbar() {
  const { cart } = useCart();
  const totalItems = cart.items.reduce((sum, i) => sum + i.qty, 0);

  const navItems = [
    { to: "/", label: "Trang chủ" },
    { to: "/menu", label: "Thực đơn" },
    { to: "/party", label: "Đặt tiệc" },
    { to: "/orders", label: "Lịch sử đặt hàng" },
    { to: "/track", label: "Theo dõi đơn hàng" },
  ];

  return (
    <BSNavbar expand="lg" className="custom-navbar">
      <Container>
        <BSNavbar.Brand as={NavLink} to="/" className="fw-bold logo">
          AFK Fastfood
        </BSNavbar.Brand>

        <BSNavbar.Toggle />
        <BSNavbar.Collapse>
          <Nav className="mx-auto nav-center">
            {navItems.map((item) => (
              <Nav.Link
                as={NavLink}
                to={item.to}
                key={item.to}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {item.label}
              </Nav.Link>
            ))}
          </Nav>

          <Nav className="nav-icons">
            <Nav.Link as={NavLink} to="/cart" className="position-relative">
              <i className="bi bi-cart3"></i>
              {totalItems > 0 && (
                <Badge pill bg="danger" className="cart-badge">
                  {totalItems}
                </Badge>
              )}
            </Nav.Link>
            <Nav.Link as={NavLink} to="/profile">
              <i className="bi bi-person-circle user-icon"></i>
            </Nav.Link>
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
}
