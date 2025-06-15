import React from "react";
import { Carousel } from "react-bootstrap";
import slide1 from "../assets/images/slide-1.png";
import slide2 from "../assets/images/slide-2.png";
import slide3 from "../assets/images/slide-3.png";
import "./HeroCarousel.css";

export default function HeroCarousel() {
  const slides = [
    { id: 1, img: slide1, alt: "Slide 1" },
    { id: 2, img: slide2, alt: "Slide 2" },
    { id: 3, img: slide3, alt: "Slide 3" },
  ];

  return (
    <Carousel fade indicators={false}>
      {slides.map((s) => (
        <Carousel.Item key={s.id}>
          <img className="d-block w-100 carousel-img" src={s.img} alt={s.alt} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
