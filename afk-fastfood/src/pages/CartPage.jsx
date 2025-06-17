import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

export default function CartPage() {
  const { cart, dispatch } = useCart();
  const navigate = useNavigate();

  const handleQtyChange = (id, qty) => {
    if (qty < 1) return;
    dispatch({ type: "UPDATE", payload: { id, qty } });
  };

  const handleRemove = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const handleCancel = () => {
    navigate("/");
  };

  const total = cart.items.reduce((sum, item) => sum + item.qty * item.price, 0);

  if (cart.items.length === 0) {
    return <h3 className="text-center mt-5">Giỏ hàng của bạn đang trống.</h3>;
  }

  return (
    <div className="container mt-4 cart-page">
      <h3>Giỏ hàng của bạn:</h3>

      {cart.items.map((item) => (
        <div
          key={item.id}
          className="cart-item d-flex align-items-center py-3 border-bottom"
        >
          <img
            src={item.image}
            alt={item.title}
            width={80}
            height={80}
            className="rounded"
          />
          <div className="ms-3 flex-grow-1">
            <div className="fw-bold">{item.title}</div>
            <div>{item.price.toLocaleString()}đ</div>
            <div className="mt-1">
              <span
                className="text-danger"
                role="button"
                onClick={() => handleRemove(item.id)}
              >
                Xoá
              </span>
            </div>
          </div>
          <div className="qty-box d-flex align-items-center gap-2">
            <button
              className="btn btn-light"
              onClick={() => handleQtyChange(item.id, item.qty - 1)}
            >
              -
            </button>
            <span>{item.qty}</span>
            <button
              className="btn btn-light"
              onClick={() => handleQtyChange(item.id, item.qty + 1)}
            >
              +
            </button>
          </div>
        </div>
      ))}

      <div className="mt-4 border-top pt-3">
        <div className="d-flex justify-content-between">
          <span>Tổng:</span>
          <span>{total.toLocaleString()}đ</span>
        </div>
        <div className="d-flex justify-content-between">
          <span>Giảm giá:</span>
          <span>0đ</span>
        </div>
        <div className="d-flex justify-content-between">
          <span>Phí giao hàng:</span>
          <span>15.000đ</span>
        </div>
        <div className="d-flex justify-content-between fw-bold border-top pt-2">
          <span>Tổng cộng:</span>
          <span>{(total + 15000).toLocaleString()}đ</span>
        </div>

        <div className="d-flex justify-content-end gap-3 mt-4">
          <button className="btn btn-warning px-4" onClick={handleCheckout}>
            Thanh toán
          </button>
          <button className="btn btn-secondary px-4" onClick={handleCancel}>
            Huỷ
          </button>
        </div>
      </div>
    </div>
  );
}
