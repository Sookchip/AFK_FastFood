import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import momoQR from "../assets/images/payment/momo-qr.png"; // Make sure to update this path to your correct file path

export default function ThanhToanMomo() {
  const [seconds, setSeconds] = useState(300);
  const [showConfirm, setShowConfirm] = useState(false);

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
    window.sessionStorage.setItem("partySuccess", "true"); // Store success status
    window.location.href = "/party"; // Redirect to Party page (use the correct route)
  };

  return (
    <Container className="my-5">
      <div className="border rounded shadow p-4">
        <h4 className="text-center mb-4 fw-bold bg-warning py-2 rounded">
          Thanh Toán MOMO
        </h4>
        <p className="text-center">
          Vui lòng quét mã QR và chuyển khoản trong vòng 5 phút để hoàn tất đặt
          tiệc.
        </p>

        <Row className="align-items-center mt-4">
          <Col md={5} className="text-center">
            <img
              src={momoQR}
              alt="Mã QR MoMo"
              className="img-fluid"
              style={{ maxWidth: 240 }}
            />
          </Col>
          <Col md={7}>
            <p>
              <strong>Người nhận:</strong> CÔNG TY TNHH AFK
            </p>
            <p>
              <strong>SDT nhận tiền:</strong> 0909 888 777
            </p>
            <p>
              <strong>Số tiền:</strong> 500.000 VNĐ
            </p>
            <p>
              <strong>Nội dung chuyển tiền:</strong> DATTI-0987
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

      {/* Confirmation modal */}
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
