// src/Page/Publication.js
import React, { useState } from "react";
import "../Styles/publication.css";


function Publication() {
  const [searchTerm, setSearchTerm] = useState("");

  const publications = [
    {
      img: "https://media.istockphoto.com/id/1447649580/fr/photo/femme-daffaires-sur-t%C3%A9l%C3%A9phone-portable-dans-le-hall-de-lh%C3%B4tel.webp?a=1&b=1&s=612x612&w=0&k=20&c=k7DhuR23tBrgSTvF62NO3WSkQRAfXMSzHandPXywIug=",
      title: "Ouverture de l'Hôtel Paradis",
      desc: "Découvrez notre nouvel hôtel 5 étoiles offrant luxe, confort et vues imprenables.",
      author: "Admin SouthConnect",
      date: "2025-09-20",
    },
    {
      img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80",
      title: "Inauguration du Restaurant La Belle Table",
      desc: "Un lieu où gastronomie et ambiance conviviale se rencontrent pour une expérience unique.",
      author: "Jean Martin",
      date: "2025-09-18",
    },
    {
      img: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&auto=format&fit=crop&q=80",
      title: "Nouveau Café au Centre-ville",
      desc: "Un espace cosy pour savourer cafés d’exception et pâtisseries artisanales.",
      author: "Marie Dubois",
      date: "2025-09-15",
    },
    {
      img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&auto=format&fit=crop&q=80",
      title: "Lancement de la Boutique Chic & Co",
      desc: "Mode, accessoires et décoration : une sélection exclusive pour un style unique.",
      author: "Sophie Bernard",
      date: "2025-09-12",
    },
    {
      img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=800&auto=format&fit=crop&q=80",
      title: "Soirée Gastronomique à L’Oasis",
      desc: "Venez découvrir un menu spécial concocté par nos chefs pour une soirée inoubliable.",
      author: "Luc Moreau",
      date: "2025-09-10",
    },
  ];

  const filteredPublications = publications.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="publication-section py-5">
      <div className="container">
        <h2 className="text-center mb-4">Publications</h2>
 
        {/* Barre de recherche */}
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Rechercher une publication..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="fa-solid fa-magnifying-glass search-icon"></i>
        </div>

   

        <div className="row g-4">
          {filteredPublications.map((item, index) => (
            <div className="col-md-4" key={index}>
              <div className="publication-card">
                <div className="publication-image">
                  <img src={item.img} alt={item.title} />
                </div>
                <div className="publication-content">
                  <h3 className="publication-title">{item.title}</h3>
                  <p className="publication-desc">{item.desc}</p>
                  <div className="publication-footer">
                    <span className="author">Publié par {item.author}</span>
                    <span className="date">{item.date}</span>
                  </div>
                  <a href="https://example.com" className="publication-button">
                    Lire la suite
                  </a>
                </div>
              </div>
            </div>
          ))}
          {filteredPublications.length === 0 && (
            <p className="text-center">Aucune publication trouvée</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Publication;
