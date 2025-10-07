import React, { useState, useEffect, useContext } from "react";
import "../../Styles/style.css";
import { SearchContext } from "../Context/SearchContext";

export default function Background() {
  const { searchTerm, setSearchTerm } = useContext(SearchContext); // contexte

  const [bgIndex, setBgIndex] = useState(0);

   const backgrounds = [
    "/images/FlashPubs/raiky_1.jpg",
    "/images/FlashPubs/raiky_2.jpg",
    "/images/FlashPubs/raiky_3.jpg",
     "/images/FlashPubs/raiky_4.jpg",
     "/images/FlashPubs/raiky_5.jpg",
     "/images/FlashPubs/raiky_6.jpg",
  ];

  
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgrounds.length]);

  const handlePrevious = () => {
    setBgIndex((prevIndex) =>
      prevIndex === 0 ? backgrounds.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setBgIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
  };

  return (
    <>
      <section
        className="hero-section"
        style={{
          background: `url(${backgrounds[bgIndex]}) no-repeat center center/cover`,
          transition: "background 1s ease-in-out",
        }}
      >
        <button className="hero-btn hero-btn-left" onClick={handlePrevious}>
          &lt;
        </button>

        <button className="hero-btn hero-btn-right" onClick={handleNext}>
          &gt;
        </button>

        <div className="container">
          <div className="hero-content text-center">
            <h1 className="hero-title">Bienvenue sur SouthConnect</h1>
            <p className="hero-subtitle">
              Découvrez nos services exceptionnels dans le secteur du tourisme
              et plus encore
            </p>

            <div className="search-bar mt-4">
              <input
                type="text"
                className="form-control"
                placeholder="Rechercher un hôtel, restaurant, café..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
