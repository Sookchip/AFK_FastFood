import React from "react";
import { Card, Button } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const { dispatch } = useCart();
  const addToCart = () => dispatch({ type: "ADD", payload: product });

  return (
    <Card className="product-card h-100 shadow-sm">
      <div className="product-img-wrapper">
        <Card.Img src={product.image} alt={product.title} />
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.title}</Card.Title>
        <Card.Text className="text-muted small">{product.desc}</Card.Text>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <strong>{product.price.toLocaleString()}đ</strong>
          <Button variant="warning" size="sm" onClick={addToCart}>
            Thêm vào
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
