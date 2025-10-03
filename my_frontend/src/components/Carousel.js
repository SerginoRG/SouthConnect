// src/Page/Carousel.js
import React, { useState, useEffect, useRef, useCallback } from "react";
import "../Styles/Carousel.css";

export default function Carousel() {
  const cardsData = [
    {
      img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop",
      tag: "Hôtel",
      title: "Hôtel de Luxe",
      text: "Découvrez l'excellence de l'hospitalité dans un cadre exceptionnel avec des services haut de gamme et un confort inégalé.",
      profileImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      profileName: "Marie Dubois",
      profileRole: "Manager",
    },
    {
      img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=250&fit=crop",
      tag: "Restaurant",
      title: "Restaurant Gastronomique",
      text: "Une expérience culinaire unique avec des plats raffinés préparés par nos chefs étoilés dans une ambiance chaleureuse.",
      profileImg: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=40&h=40&fit=crop&crop=face",
      profileName: "Jean Martin",
      profileRole: "Chef",
    },
    {
      img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=250&fit=crop",
      tag: "Boutique",
      title: "Boutique Tendance",
      text: "Découvrez notre collection exclusive d'articles de mode et d'accessoires soigneusement sélectionnés par nos stylistes.",
      profileImg: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      profileName: "Sophie Laurent",
      profileRole: "Styliste",
    },
    {
      img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=250&fit=crop",
      tag: "Spa",
      title: "Spa & Wellness",
      text: "Ressourcez-vous dans notre espace détente avec des soins personnalisés et des thérapies relaxantes dans un cadre zen.",
      profileImg: "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
      profileName: "Emma Wilson",
      profileRole: "Thérapeute",
    },
    {
      img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=250&fit=crop",
      tag: "Resort",
      title: "Resort Tropical",
      text: "Évadez-vous dans notre resort paradisiaque avec vue sur l'océan, piscines privées et activités nautiques exclusives.",
      profileImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      profileName: "Alex Rivera",
      profileRole: "Directeur",
    },
    {
      img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=250&fit=crop",
      tag: "Café",
      title: "Café Artisanal",
      text: "Savourez nos cafés d'exception torréfiés artisanalement accompagnés de pâtisseries maison dans une atmosphère cosy.",
      profileImg: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=40&h=40&fit=crop&crop=face",
      profileName: "Lucas Petit",
      profileRole: "Barista",
    },
  ];

  const [diapositiveActuelle, setDiapositiveActuelle] = useState(0);
  const [cartesParDiapositive, setCartesParDiapositive] = useState(2);
  const delaiLectureAuto = 4000;
  const intervalRef = useRef(null);
  const progressionRef = useRef(null);

  useEffect(() => {
    const gererRedimensionnement = () => {
      if (window.innerWidth < 768) {
        setCartesParDiapositive(1);
      } else if (window.innerWidth < 1024) {
        setCartesParDiapositive(2);
      } else {
        setCartesParDiapositive(3);
      }
    };
    gererRedimensionnement();
    window.addEventListener("resize", gererRedimensionnement);
    return () => window.removeEventListener("resize", gererRedimensionnement);
  }, []);

  const totalDiapositives = Math.ceil(cardsData.length / cartesParDiapositive);

  const diapositiveNext = useCallback(() => {
    setDiapositiveActuelle((prev) => (prev + 1) % totalDiapositives);
  }, [totalDiapositives]);

  const diapositivePrev = () => {
    setDiapositiveActuelle((prev) => (prev - 1 + totalDiapositives) % totalDiapositives);
  };

  const allerALaDiapositive = (index) => {
    setDiapositiveActuelle(index);
  };

  useEffect(() => {
    intervalRef.current = setInterval(diapositiveNext, delaiLectureAuto);

    let progression = 0;
    const increment = 100 / (delaiLectureAuto / 50);
    progressionRef.current = setInterval(() => {
      progression += increment;
      const barre = document.querySelector(".barre-progression");
      if (barre) barre.style.width = progression + "%";
      if (progression >= 100) progression = 0;
    }, 50);

    return () => {
      clearInterval(intervalRef.current);
      clearInterval(progressionRef.current);
    };
  }, [cartesParDiapositive, diapositiveNext]);

  return (
    <>
      {/* Carousel */}
      <div className="enveloppe">
        <button className="bouton-navigation bouton-prec" onClick={diapositivePrev}>
          ‹
        </button>
        <button className="bouton-navigation bouton-suiv" onClick={diapositiveNext}>
          ›
        </button>

        <div
          className="liste-cartes"
          style={{
            transform: `translateX(-${diapositiveActuelle * (100 / totalDiapositives)}%)`,
            width: `${totalDiapositives * 100}%`,
          }}
        >
          {cardsData.map((card, index) => (
            <div className="carte" key={index}>
              <div className="image-carte">
                <img src={card.img} alt={card.title} />
                <p className="etiquette-carte">{card.tag}</p>
              </div>
              <div className="contenu-carte">
                <h3 className="titre-carte">{card.title}</h3>
                <p className="texte-carte">{card.text}</p>
                <div className="pied-carte">
                  <div className="profil-carte">
                    <img src={card.profileImg} alt={card.profileName} />
                    <div className="info-profil-carte">
                      <span className="nom-profil-carte">{card.profileName}</span>
                      <span className="role-profil-carte">{card.profileRole}</span>
                    </div>
                  </div>
                  <a href="https://example.com" className="bouton-carte">
                    En savoir plus
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="barre-progression"></div>
      </div>

      {/* Contrôles */}
      <div className="controles-carrousel">
        <div className="conteneur-points">
          {Array.from({ length: totalDiapositives }).map((_, i) => (
            <span
              key={i}
              className={`point ${i === diapositiveActuelle ? "actif" : ""}`}
              onClick={() => allerALaDiapositive(i)}
            ></span>
          ))}
        </div>
      </div>
    </>
  );
}
