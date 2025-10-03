// src/Page/Home.js
import React from "react";
import "../Styles/style.css";
import Carousel from "../components/Carousel"; // vérifie bien le type d'export dans Carousel.js

export default function Home() {
  return (
    <>
      <Carousel />
    </>
  );
}
