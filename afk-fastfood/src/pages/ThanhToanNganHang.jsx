import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import bankingQR from "../assets/images/payment/banking-qr.png";
export default function ThanhToanNganHang() {
  const [seconds, setSeconds] = useState(300);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (seconds <= 0) return;
    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const handleConfirmPayment = () => {
    setShowConfirm(true);
  };

  const handleFinalConfirm = () => {
    setShowConfirm(false);
    window.sessionStorage.setItem("partySuccess", "true");
    navigate("/party"); // Navigate to the Party page
  };

  return (
    <Container className="my-5">
      <div className="border rounded shadow p-4">
        <h4 className="text-center mb-4 fw-bold bg-warning py-2 rounded">
          Thanh Toán Ngân Hàng
        </h4>
        <p className="text-center">
          Vui lòng quét mã QR và chuyển khoản trong vòng 5 phút để hoàn tất đặt
          tiệc.
        </p>

        <Row className="align-items-center mt-4">
          <Col md={5} className="text-center">
            <img
              src={bankingQR} // Use the imported image path
              alt="Mã QR MoMo"
              className="img-fluid"
              style={{ maxWidth: 240 }}
            />
          </Col>
          <Col md={7}>
            <p>
              <strong>Chủ tài khoản:</strong> CÔNG TY TNHH AFK
            </p>
            <p>
              <strong>Số tài khoản:</strong> 123 456 789
            </p>
            <p>
              <strong>Ngân hàng:</strong> ABC - Chi nhánh Hà Nội
            </p>
            <p>
              <strong>Số tiền:</strong> 700.000 VNĐ
            </p>
            <p>
              <strong>Nội dung chuyển tiền:</strong> DATTI-0001
            </p>
            <p className="mt-4 text-danger">
              <strong>Thời gian còn lại để chuyển khoản:</strong>
              <br />
              <span style={{ fontSize: "1.75rem" }}>{formatTime(seconds)}</span>
            </p>
            <p className="text-muted mt-3">
              Giao dịch sẽ được kiểm tra trong vòng 10 phút sau khi chuyển tiền.
            </p>
          </Col>
        </Row>

        <div className="text-center mt-4">
          <Button
            variant="warning"
            className="px-4 me-3"
            onClick={handleConfirmPayment}
          >
            Xác nhận
          </Button>
          <Button
            variant="secondary"
            className="px-4"
            onClick={() => window.history.back()}
          >
            Hủy
          </Button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Xác nhận thanh toán</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="fs-5 text-center">Bạn chắc chắn đã thanh toán ?</p>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="warning" onClick={handleFinalConfirm}>
            Xác nhận
          </Button>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
