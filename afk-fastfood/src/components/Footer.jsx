import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaPhoneAlt } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="custom-footer pt-4 pb-3">
      <Container>
        <Row>
          <Col md={3} sm={6} className="mb-3">
            <h5>
              AFK
              <br />
              FAST
              <br />
              FOOD
            </h5>
            <small>© 2025 AFK Fast Food Vietnam</small>
            <span className="mx-2">|</span>
            <a href="/privacy" className="text-white text-decoration-none">
              Privacy Policy
            </a>
          </Col>

          <Col md={3} sm={6} className="mb-3 phone-col">
            <div className="d-flex align-items-center mb-1">
              <FaPhoneAlt className="me-2 icon-phone" />
              <span>Hotline đặt hàng nhanh chóng</span>
            </div>
            <div className="hotline-number">19001500</div>
          </Col>

          <Col md={2} sm={6} className="mb-3">
            <ul className="footer-list">
              <li>Về chúng tôi</li>
              <li>Tuyển dụng</li>
              <li>Cửa hàng</li>
            </ul>
          </Col>

          <Col md={4} sm={6} className="mb-3">
            <ul className="footer-list">
              <li>Thực đơn</li>
              <li>Đặt tiệc</li>
              <li>Xem lịch sử đặt hàng</li>
            </ul>
            {/* Tạm bỏ App Store + Google Play theo yêu cầu */}
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
