// src/pages/CheckoutPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMoneyBillWave, FaUniversity, FaWallet } from "react-icons/fa";
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    payment: "cash",
  });

  const [errors, setErrors] = useState({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (
      !form.name.trim() ||
      /\d|[!@#$%^&*()_+={}[\]:;"'<>?/\\|~`]/.test(form.name)
    ) {
      newErrors.name = "Họ tên không được để trống hoặc chứa số, ký tự đặc biệt";
    }
    if (!/^\d{10,11}$/.test(form.phone.trim())) {
      newErrors.phone = "Số điện thoại phải gồm 10-11 chữ số và không chứa ký tự khác";
    }
    if (!form.address.trim()) {
      newErrors.address = "Không được bỏ trống thông tin này. Ví dụ: 175 Tây Sơn, Đống Đa, Hà Nội";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors((prev) => {
      const newErr = { ...prev };
      delete newErr[name];
      return newErr;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (form.payment === "cash") {
        setShowSuccessPopup(true);
        dispatch({ type: "CLEAR" });
        setTimeout(() => {
          closePopup();
        }, 3000);
      } else {
        navigate("/order-success", { state: { form } });
      }
    }
  };

  const handleCancel = () => {
    navigate("/cart");
  };

  const closePopup = () => {
    setShowSuccessPopup(false);
    navigate("/");
  };

  return (
    <div className="container my-5">
      <div className="card shadow-lg">
        <div className="card-body p-5">
          <h2 className="card-title mb-4 text-center">Thông tin giao hàng</h2>
          <form onSubmit={handleSubmit}>
            <div className="row g-4">
              <div className="col-md-6">
                <label className="form-label">Họ và tên *</label>
                <input
                  type="text"
                  name="name"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  placeholder="Nguyễn Văn A"
                  value={form.name}
                  onChange={handleChange}
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>

              <div className="col-md-6">
                <label className="form-label">Số điện thoại *</label>
                <input
                  type="text"
                  name="phone"
                  className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                  placeholder="0912xxxxxx"
                  value={form.phone}
                  onChange={handleChange}
                />
                {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
              </div>

              <div className="col-md-6">
                <label className="form-label">Địa chỉ *</label>
                <input
                  type="text"
                  name="address"
                  className={`form-control ${errors.address ? "is-invalid" : ""}`}
                  placeholder="175 Tây Sơn, Đống Đa, Hà Nội"
                  value={form.address}
                  onChange={handleChange}
                />
                {errors.address && <div className="invalid-feedback">{errors.address}</div>}
              </div>

              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="abc@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="form-label fw-bold">Phương thức thanh toán</label>
              <div className="d-flex flex-wrap gap-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={form.payment === "cash"}
                    onChange={handleChange}
                    id="payment-cash"
                  />
                  <label className="form-check-label" htmlFor="payment-cash">
                    <FaMoneyBillWave className="me-1 text-success" /> Tiền mặt
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="payment"
                    value="bank"
                    checked={form.payment === "bank"}
                    onChange={handleChange}
                    id="payment-bank"
                  />
                  <label className="form-check-label" htmlFor="payment-bank">
                    <FaUniversity className="me-1 text-primary" /> Banking
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="payment"
                    value="momo"
                    checked={form.payment === "momo"}
                    onChange={handleChange}
                    id="payment-momo"
                  />
                  <label className="form-check-label" htmlFor="payment-momo">
                    <FaWallet className="me-1 text-danger" /> Ví MoMo
                  </label>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-3 mt-5">
              <button
                type="submit"
                className="btn btn-warning px-4"
              >
                Xác nhận
              </button>
              <button type="button" className="btn btn-secondary px-4" onClick={handleCancel}>
                Hủy
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Popup Thành công */}
      {showSuccessPopup && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 9999 }}
        >
          <div className="bg-white p-4 rounded shadow-lg text-center">
            <h5 className="mb-3 text-success">🎉 Đặt hàng thành công!</h5>
            <p>Cảm ơn bạn đã đặt hàng. Đơn hàng sẽ được xử lý sớm nhất.</p>
            <button className="btn btn-primary mt-2" onClick={closePopup}>
              Về trang chủ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
