import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import { menuData } from "../data/menuData";

const Section = ({ title, items }) => (
  <section className="my-5 text-center" id={title.toLowerCase().replace(/\s/g, "-")}>
    <h3 className="fw-bold mb-4">{title}</h3>
    <Row xs={1} sm={2} md={3} lg={4} className="g-4">
      {items.map((item) => (
        <Col key={item.id}>
          <ProductCard product={item} />
        </Col>
      ))}
    </Row>
  </section>
);

export default function Menu() {
  return (
    <Container className="mt-5 mb-5">
      <Section title="Ưu đãi" items={menuData.uuDai} />
      <Section title="Món mới" items={menuData.monMoi} />
      <Section title="Combo" items={menuData.combo} />
      <Section title="Gà rán" items={menuData.gaRan} />
      <Section title="Burger - Cơm" items={menuData.burger} />
      <Section title="Đồ uống" items={menuData.doUong} />
    </Container>
  );
}