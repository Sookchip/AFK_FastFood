// Ví dụ src/pages/Menu.jsx
import React, { useState, useEffect } from "react";
import "./Profile.css"; // We'll create this CSS file next

export default function Menu() {
  const [userData, setUserData] = useState({
    username: "Phan Van An",
    email: "An31@gmail.com",
    gender: "Nam",
    address: "Hà Nam",
    dob: "31/01/2004",
    phone: "0875558494",
  });

  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error for this field as user starts typing
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  // Function to validate form fields
  const validate = () => {
    let newErrors = {};
    if (!userData.username.trim()) {
      newErrors.username = "Vui lòng cung cấp đầy đủ thông tin!";
    }
    if (!userData.email.trim()) {
      newErrors.email = "Vui lòng cung cấp đầy đủ thông tin!";
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = "Email không hợp lệ!";
    }
    if (!userData.gender.trim()) {
      newErrors.gender = "Vui lòng cung cấp đầy đủ thông tin!";
    }
    if (!userData.address.trim()) {
      newErrors.address = "Vui lòng cung cấp đầy đủ thông tin!";
    }
    if (!userData.dob.trim()) {
      newErrors.dob = "Vui lòng cung cấp đầy đủ thông tin!";
    } else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(userData.dob)) {
      newErrors.dob = "Ngày sinh không hợp lệ (DD/MM/YYYY)!";
    }
    if (!userData.phone.trim()) {
      newErrors.phone = "Vui lòng cung cấp đầy đủ thông tin!";
    } else if (!/^\d{10}$/.test(userData.phone)) {
      // Basic phone number validation (10 digits)
      newErrors.phone = "Số điện thoại không hợp lệ!";
    }
    return newErrors;
  };

  // Function to handle "Chỉnh sửa" (Edit) or "Cập nhật" (Update) button click
  const handleSubmit = () => {
    if (!isEditing) {
      setIsEditing(true);
      setErrors({}); // Clear previous errors when entering edit mode
      setShowSuccessMessage(false); // Hide success message if it was showing
    } else {
      const validationErrors = validate();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setShowSuccessMessage(false); // Hide success message on validation error
      } else {
        // Simulate an API call for saving data
        console.log("Updating user data:", userData);
        setIsEditing(false);
        setErrors({});
        setShowSuccessMessage(true);

        // Hide success message after 3 seconds
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      }
    }
  };

  // Function to handle "Hủy" (Cancel) button click
  const handleCancel = () => {
    setIsEditing(false);
    setErrors({}); // Clear errors
    setShowSuccessMessage(false); // Hide success message
    // Optionally, reset to original data if you had a copy
    // For simplicity, we're not resetting to an original state here.
    // In a real app, you might fetch initial data again or store a pristine copy.
  };

  return (
    <div className="user-information-container">
      <div className="header-nav">
        <span className="nav-item">Tài khoản</span> &gt;
        <span className="nav-item">Quản lý thông tin cá nhân</span>
        {isEditing && (
          <span className="nav-item">&gt; Chỉnh sửa thông tin cá nhân</span>
        )}
      </div>

      <div className="user-info-form">
        <div className="form-group">
          <label htmlFor="username">
            Tên người dùng <span className="required">*</span>:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={userData.username}
            onChange={handleChange}
            readOnly={!isEditing}
            className={errors.username ? "input-error" : ""}
          />
          {errors.username && (
            <p className="error-message">{errors.username}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">
            Email <span className="required">*</span>:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            readOnly={!isEditing}
            className={errors.email ? "input-error" : ""}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="gender">
            Giới tính <span className="required">*</span>:
          </label>
          <input
            type="text"
            id="gender"
            name="gender"
            value={userData.gender}
            onChange={handleChange}
            readOnly={!isEditing}
            className={errors.gender ? "input-error" : ""}
          />
          {errors.gender && <p className="error-message">{errors.gender}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="address">
            Địa chỉ <span className="required">*</span>:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={userData.address}
            onChange={handleChange}
            readOnly={!isEditing}
            className={errors.address ? "input-error" : ""}
          />
          {errors.address && <p className="error-message">{errors.address}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="dob">
            Ngày sinh <span className="required">*</span>:
          </label>
          <input
            type="text"
            id="dob"
            name="dob"
            value={userData.dob}
            onChange={handleChange}
            readOnly={!isEditing}
            placeholder="DD/MM/YYYY"
            className={errors.dob ? "input-error" : ""}
          />
          {errors.dob && <p className="error-message">{errors.dob}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">
            Số điện thoại <span className="required">*</span>:
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            readOnly={!isEditing}
            className={errors.phone ? "input-error" : ""}
          />
          {errors.phone && <p className="error-message">{errors.phone}</p>}
        </div>

        <div className="form-actions">
          <button onClick={handleSubmit} className="btn-primary">
            {isEditing ? "Cập nhật" : "Chỉnh sửa"}
          </button>
          {isEditing && (
            <button onClick={handleCancel} className="btn-secondary">
              Hủy
            </button>
          )}
        </div>
      </div>

      {showSuccessMessage && (
        <div className="success-message-popup">
          <span className="check-icon">✔</span>
          <div className="message-content">
            <strong>Thông báo</strong>
            <p>Cập nhật thông tin thành công</p>
          </div>
          <button
            className="close-button"
            onClick={() => setShowSuccessMessage(false)}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
