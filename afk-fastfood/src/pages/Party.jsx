import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './Party.css';

import sinhNhatImg from '../assets/images/party/sinh-nhat.png';
import lienHoanImg from '../assets/images/party/lien-hoan.png';
import bannerImg from '../assets/images/party/banner.png';

const partyPackages = [
  {
    id: 1,
    title: 'Gói Tiệc Sinh Nhật',
    desc: 'Dành cho buổi sinh nhật ấm cúng',
    price: 'Giá từ 500.000đ',
    image: sinhNhatImg
  },
  {
    id: 2,
    title: 'Gói Tiệc Liên Hoan',
    desc: 'Phù hợp buổi liên hoan bạn bè',
    price: 'Giá từ 700.000đ',
    image: lienHoanImg
  }
];

export default function Party() {
  return (
    <Container className="party-page my-5">
      <section className="text-center mb-4 party-header">
        <div className="line"></div>
        <h2 className="fw-bold mx-3">ĐẶT TIỆC – CHỌN GÓI</h2>
        <div className="line"></div>
      </section>

      <section className="text-center mb-5">
        <img src={bannerImg} alt="Party banner" className="img-fluid rounded-party" />
        <p className="subtitle mt-3">TỔ CHỨC NHỮNG BỮA TIỆC VUI NHỘN CÙNG AFK FAST FOOD</p>
      </section>

      <section className="packages-section mb-5 py-4">
        <h3 className="h5 text-center mb-4">Đặt Tiệc Dễ Dàng – Chỉ vài bước</h3>
        <Row xs={1} md={2} className="g-4 justify-content-center">
          {partyPackages.map((pkg) => (
            <Col key={pkg.id} lg={5}>
              <Card className="party-card h-100 shadow-sm">
                <Card.Img src={pkg.image} alt={pkg.title} className="img-top-card" />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-bold">{pkg.title}</Card.Title>
                  <Card.Text className="text-muted small">{pkg.desc}</Card.Text>
                  <div className="mt-auto text-danger fw-bold fs-5">{pkg.price}</div>
                  <Button variant="warning" className="mt-3">Chọn gói này</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </Container>
  );
}
