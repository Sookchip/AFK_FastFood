import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import "animate.css";
import {
  FaCreditCard,
  FaMoneyBillAlt,
  FaUniversity,
  FaWallet,
} from "react-icons/fa";
import "./Party.css";

import sinhNhatImg from "../assets/images/party/sinh-nhat.png";
import lienHoanImg from "../assets/images/party/lien-hoan.png";
import bannerImg from "../assets/images/party/banner.png";

const partyPackages = [
  {
    id: 1,
    title: "Gói Tiệc Sinh Nhật",
    desc: "Dành cho buổi sinh nhật ấm cúng",
    price: "Giá từ 500.000đ",
    image: sinhNhatImg,
  },
  {
    id: 2,
    title: "Gói Tiệc Liên Hoan",
    desc: "Phù hợp buổi liên hoan bạn bè",
    price: "Giá từ 700.000đ",
    image: lienHoanImg,
  },
];

export default function Party() {
  const [showModal, setShowModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showSuccess, setShowSuccess] = useState(
    () => window.sessionStorage.getItem("partySuccess") === "true"
  );
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    guests: "",
    city: "",
    district: "",
    store: "",
    note: "",
    payment: "",
  });
  const [errors, setErrors] = useState({});

  // Hide success notification after 5 seconds
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        window.sessionStorage.removeItem("partySuccess");
        setShowSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const handleShow = (pkg) => {
    setSelectedPackage(pkg);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedPackage(null);
  };

  return (
    <>
      {/* Display success notification if payment is successful */}
      {showSuccess && (
        <div
          className="position-fixed top-0 end-0 p-3 animate__animated animate__fadeInRight"
          style={{ zIndex: 1056, width: "100%", maxWidth: "420px" }}
        >
          <div className="bg-warning-subtle border-start border-4 border-success rounded shadow p-3 d-flex align-items-start justify-content-between">
            <div className="d-flex">
              <div className="me-3">
                <span
                  className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center"
                  style={{ width: 30, height: 30 }}
                >
                  ✓
                </span>
              </div>
              <div>
                <h5 className="mb-1 fw-bold">Thông báo</h5>
                <p className="mb-0">
                  Thanh toán thành công.
                  <br />
                  Vui lòng đến đúng giờ đã đặt tiệc.
                </p>
              </div>
            </div>
            <button
              type="button"
              className="btn-close ms-3 mt-1"
              onClick={() => setShowSuccess(false)}
            ></button>
          </div>
        </div>
      )}

      <Container className="party-page my-5">
        <section className="text-center mb-4 party-header">
          <div className="line"></div>
          <h2 className="fw-bold mx-3">ĐẶT TIỆC – CHỌN GÓI</h2>
          <div className="line"></div>
        </section>

        <section className="text-center mb-5">
          <p className="subtitle mt-3">
            TỔ CHỨC NHỮNG BỮA TIỆC VUI NHỘN CÙNG AFK FAST FOOD
          </p>
          <img
            src={bannerImg}
            alt="Party banner"
            className="img-fluid rounded-party"
          />
        </section>

        <section className="packages-section mb-5 py-4">
          <h3 className="h5 text-center mb-4">
            Đặt Tiệc Dễ Dàng – Chỉ vài bước
          </h3>
          <Row xs={1} md={2} className="g-4 justify-content-center">
            {partyPackages.map((pkg) => (
              <Col key={pkg.id} lg={5}>
                <Card className="party-card h-100 shadow-sm">
                  <Card.Img
                    src={pkg.image}
                    alt={pkg.title}
                    className="img-top-card"
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="fw-bold">{pkg.title}</Card.Title>
                    <Card.Text className="text-muted small">
                      {pkg.desc}
                    </Card.Text>
                    <div className="mt-auto text-danger fw-bold fs-5">
                      {pkg.price}
                    </div>
                    <Button
                      variant="warning"
                      className="mt-3"
                      onClick={() => handleShow(pkg)}
                    >
                      Chọn gói này
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {selectedPackage && (
          <Modal show={showModal} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton style={{ backgroundColor: "#FBAA3E" }}>
              <Modal.Title className="text-center w-100">
                Chi tiết Đơn Đặt Tiệc - {selectedPackage.title}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Row className="gy-3">
                  <Col md={6}>
                    <div className="border rounded p-3">
                      <h6 className="text-center fw-bold mb-3">
                        Thông tin liên hệ
                      </h6>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          Họ và tên người đặt{" "}
                          <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          placeholder="Nhập họ và tên của bạn"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          isInvalid={!!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          Số điện thoại <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          placeholder="Nhập số điện thoại của bạn"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          isInvalid={!!errors.phone}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.phone}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          placeholder="Nhập email của bạn"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                      </Form.Group>
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="border rounded p-3">
                      <h6 className="text-center fw-bold mb-3">
                        Thông tin buổi tiệc
                      </h6>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          Ngày tổ chức <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="date"
                          value={formData.date}
                          onChange={(e) =>
                            setFormData({ ...formData, date: e.target.value })
                          }
                          isInvalid={!!errors.date}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.date}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          Số người tham dự{" "}
                          <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          placeholder="Nhập số người tham dự"
                          type="number"
                          value={formData.guests}
                          onChange={(e) =>
                            setFormData({ ...formData, guests: e.target.value })
                          }
                          isInvalid={!!errors.guests}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.guests}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-2">
                        <Form.Label>
                          Địa điểm tổ chức{" "}
                          <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Select
                          className="mb-2"
                          value={formData.city}
                          onChange={(e) =>
                            setFormData({ ...formData, city: e.target.value })
                          }
                          isInvalid={!!errors.city}
                        >
                          <option>Chọn thành phố</option>
                          <option>Hà Nội</option>
                          <option>TP HCM</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.city}
                        </Form.Control.Feedback>
                        <Form.Select
                          className="mb-2"
                          value={formData.district}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              district: e.target.value,
                            })
                          }
                          isInvalid={!!errors.district}
                        >
                          <option>Chọn quận/huyện</option>
                          <option>Ba Đình</option>
                          <option>Đống Đa</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.district}
                        </Form.Control.Feedback>
                        <Form.Select
                          value={formData.store}
                          onChange={(e) =>
                            setFormData({ ...formData, store: e.target.value })
                          }
                          isInvalid={!!errors.store}
                        >
                          <option>Chọn cửa hàng AFK</option>
                          <option>AFK Ba Đình</option>
                          <option>AFK Đống Đa</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.store}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Ghi chú</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          placeholder="Nhập ghi chú"
                          value={formData.note}
                          onChange={(e) =>
                            setFormData({ ...formData, note: e.target.value })
                          }
                        />
                      </Form.Group>
                    </div>
                  </Col>
                </Row>

                <div className="text-center mt-5">
                  <div className="border rounded py-4 px-3 d-inline-block w-100">
                    <h6 className="fw-bold mb-4">Phương thức thanh toán</h6>
                    <div className="d-flex justify-content-center gap-5 fs-5">
                      <Form.Check
                        type="radio"
                        name="payment"
                        id="cash"
                        checked={formData.payment === "cash"}
                        onChange={() =>
                          setFormData({ ...formData, payment: "cash" })
                        }
                        label={
                          <>
                            <FaMoneyBillAlt className="me-2 text-success" />
                            Tiền mặt
                          </>
                        }
                      />
                      <Form.Check
                        type="radio"
                        name="payment"
                        id="momo"
                        checked={formData.payment === "momo"}
                        onChange={() =>
                          setFormData({ ...formData, payment: "momo" })
                        }
                        label={
                          <>
                            <FaWallet className="me-2 text-danger" />
                            Ví MoMo
                          </>
                        }
                      />
                      <Form.Check
                        type="radio"
                        name="payment"
                        id="banking"
                        checked={formData.payment === "banking"}
                        onChange={() =>
                          setFormData({ ...formData, payment: "banking" })
                        }
                        label={
                          <>
                            <FaUniversity className="me-2 text-primary" />
                            Banking
                          </>
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <Button
                    variant="warning"
                    className="me-3 px-4 rounded-pill"
                    onClick={() => {
                      const newErrors = {};
                      if (!formData.name.trim())
                        newErrors.name =
                          "Họ tên không được để trống hoặc chứa ký tự đặc biệt";
                      if (!/^[0-9]{10,11}$/.test(formData.phone))
                        newErrors.phone = "Số điện thoại không hợp lệ";
                      if (!formData.date)
                        newErrors.date = "Vui lòng chọn ngày tổ chức";
                      if (!formData.guests || formData.guests <= 0)
                        newErrors.guests = "Vui lòng nhập số người tham dự";
                      if (!formData.city || formData.city === "Chọn thành phố")
                        newErrors.city = "Vui lòng chọn tỉnh, thành phố";
                      if (
                        !formData.district ||
                        formData.district === "Chọn quận/huyện"
                      )
                        newErrors.district = "Vui lòng chọn quận, huyện";
                      if (
                        !formData.store ||
                        formData.store === "Chọn cửa hàng AFK"
                      )
                        newErrors.store = "Vui lòng chọn cửa hàng";
                      if (!formData.payment)
                        newErrors.payment =
                          "Vui lòng chọn phương thức thanh toán";

                      if (Object.keys(newErrors).length > 0) {
                        setErrors(newErrors);
                        return;
                      }
                      if (formData.payment === "momo") {
                        window.location.href = "/thanh-toan-momo";
                        return;
                      }
                      if (formData.payment === "banking") {
                        window.location.href = "/thanh-toan-ngan-hang";
                        return;
                      }
                      setErrors({});
                      setShowModal(false);
                      setTimeout(() => {
                        window.sessionStorage.setItem("partySuccess", "true");
                        window.scrollTo(0, 0);
                        setShowSuccess(true);
                      }, 300);
                    }}
                  >
                    Xác nhận
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleClose}
                    className="px-4 rounded-pill"
                  >
                    Hủy
                  </Button>
                </div>
              </Form>
            </Modal.Body>
          </Modal>
        )}
      </Container>
    </>
  );
}
