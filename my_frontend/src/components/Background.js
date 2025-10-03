// src/components/Background.js
import React, { useState, useEffect } from "react";
import "../Styles/style.css";

export default function Background() {   // <-- Ici avec Majuscule
  const [searchTerm, setSearchTerm] = useState("");
  const [bgIndex, setBgIndex] = useState(0);

  const backgrounds = [
    "https://media.istockphoto.com/id/2184718397/photo/interested-woman-chooses-clothes-to-buy-in-store-holds-hanger-with-dress-in-hands-looks-price.jpg?s=612x612&w=0&k=20&c=TeUBiBQv--r04mV2UOshvQBv79--u2bxv9LJM4zmDVk=",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600",
    "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnVyZWF1fGVufDB8fDB8fHww",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgrounds.length]); // ⚡ Ajouté backgrounds.length dans le tableau des dépendances

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
      {/* Hero */}
      <section
        className="hero-section"
        style={{
          background: `url(${backgrounds[bgIndex]}) no-repeat center center/cover`,
          transition: "background 1s ease-in-out",
        }}
      >
        {/* Bouton Previous */}
        <button className="hero-btn hero-btn-left" onClick={handlePrevious}>
          &lt;
        </button>

        {/* Bouton Next */}
        <button className="hero-btn hero-btn-right" onClick={handleNext}>
          &gt;
        </button>

        <div className="container">
          <div className="hero-content text-center">
            <h1 className="hero-title">Bienvenue sur SouthConnect</h1>
            <p className="hero-subtitle">
              Découvrez nos services exceptionnels dans le secteur du tourisme et plus encore
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
