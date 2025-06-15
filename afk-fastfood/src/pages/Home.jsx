import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import ProductCard from "../components/ProductCard";

import gaVienImg from "../assets/images/gavien.png";
import burgerBoImg from "../assets/images/burger.png";
import khoaiChienImg from "../assets/images/khoaitaychien.png";
import miYImg from "../assets/images/miy.png";

import { Link } from "react-router-dom";

const featured = [
  {
    id: 1,
    title: "Gà Viên",
    desc: "Lắc vị cay hoặc sốt BBQ",
    price: 61000,
    image: gaVienImg,
  },
  {
    id: 2,
    title: "Burger Bò",
    desc: "1 burger bò",
    price: 54000,
    image: burgerBoImg,
  },
  {
    id: 3,
    title: "Khoai Tây Chiên",
    desc: "Khoai tươi chiên giòn thấm dầu",
    price: 35000,
    image: khoaiChienImg,
  },
  { id: 4, title: "Mì Ý", desc: "1 phần mì Ý", price: 40000, image: miYImg },
];

export default function Home() {
  return (
    <>
      <section className="mt-5 mb-5 text-center">
        <h2 className="fw-bold" style={{ fontSize: "2rem" }}>
          Món ăn nổi bật
        </h2>
        <div
          className="mx-auto my-3"
          style={{
            width: "60px",
            height: "4px",
            background: "#000",
            borderRadius: "2px",
          }}
        />
        <Row xs={1} sm={2} md={4} className="g-4 my-3">
          {featured.map((item) => (
            <Col key={item.id}>
              <ProductCard product={item} />
            </Col>
          ))}
        </Row>
        <Button
          as={Link}
          to="/menu"
          variant="warning"
          size="lg"
          className="mt-4 px-5"
        >
          Xem thêm thực đơn
        </Button>
      </section>
    </>
  );
}
