// src/Page/Hotel.js
import React, { useState } from "react";
import "../Styles/hotel.css"; // <-- Fichier CSS

function Boutique() {
  const [searchTerm, setSearchTerm] = useState("");

  const elements = [
    {
      img: "https://media.istockphoto.com/id/2184718397/photo/interested-woman-chooses-clothes-to-buy-in-store-holds-hanger-with-dress-in-hands-looks-price.jpg?s=612x612&w=0&k=20&c=TeUBiBQv--r04mV2UOshvQBv79--u2bxv9LJM4zmDVk=",
      tag: "Élégance Parisienne",
      title: "Boutique de Mode",
      desc: "Collection de vêtements modernes et élégants pour toutes les occasions.",
      profileImg: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=60",
      profileName: "Claire Fontaine",
      profileRole: "Styliste",
      stars: 0
    },
    {
      img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&auto=format&fit=crop&q=60",
      tag: "Le Fil Créatif",
      title: "Boutique d’Artisanat",
      desc: "Articles faits main, décorations uniques et créations originales.",
      profileImg: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=60",
      profileName: "Jean Martin",
      profileRole: "Artisan",
      stars: 0
    },
    {
      img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60",
      tag: "Bijoux Élégants",
      title: "Bijouterie",
      desc: "Des créations raffinées pour sublimer vos tenues au quotidien ou lors d’événements.",
      profileImg: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=40&h=40&fit=crop&crop=face",
      profileName: "Sophie Bernard",
      profileRole: "Créatrice de bijoux",
      stars: 0
    },
    {
      img: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=500&auto=format&fit=crop&q=60",
      tag: "Maison Verte",
      title: "Boutique Déco & Plantes",
      desc: "Un espace nature pour embellir votre intérieur avec style.",
      profileImg: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face",
      profileName: "Luc Moreau",
      profileRole: "Décorateur",
      stars: 0
    },
    {
      img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60",
      tag: "Cuir & Style",
      title: "Maroquinerie",
      desc: "Sacs, portefeuilles et accessoires en cuir de grande qualité.",
      profileImg: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=40&h=40&fit=crop&crop=face",
      profileName: "Pauline Lefèvre",
      profileRole: "Créatrice",
      stars: 0
    }
  ];


  

  const filteredElements = elements.filter(
    (item) =>
      item.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.profileName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="content-section py-5">
      <div className="container">
        <h2 className="text-center mb-4">Secteur Boutique</h2>

        {/* Barre de recherche */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Rechercher un boutique..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="row g-4 mt-4">
          {filteredElements.map((item, index) => (
            <div className="col-md-4" key={index}>
              <div className="card">
                <div className="card-image">
                  <img src={item.img} alt={item.title} />
                  <p className="card-tag">{item.tag}</p>
                </div>
                <div className="card-content">
                  <h3 className="card-title">{item.title}</h3>
                  <div className="card-stars">{"⭐".repeat(item.stars)}</div>
                  <p className="card-text">{item.desc}</p>
                  <div className="card-footer">
                    <div className="card-profile">
                      <img src={item.profileImg} alt={item.profileName} />
                      <div className="card-profile-info">
                        <span className="card-profile-name">{item.profileName}</span>
                        <span className="card-profile-role">{item.profileRole}</span>
                      </div>
                    </div>
                    <a href="https://example.com" className="card-button">En savoir plus</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filteredElements.length === 0 && (
            <p className="text-center">Aucun boutique trouvé</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Boutique;
