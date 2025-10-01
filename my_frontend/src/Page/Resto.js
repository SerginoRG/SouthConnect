// src/Page/Hotel.js
import React, { useState } from "react";
import "../Styles/hotel.css"; // <-- Fichier CSS

function Resto() {
  const [searchTerm, setSearchTerm] = useState("");

  const elements = [
    {
      img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
      tag: "Le Grand Palais",
      title: "Restaurant Gastronomique",
      desc: "Découvrez l'excellence culinaire dans un cadre exceptionnel avec des plats raffinés.",
      profileImg: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=600&auto=format&fit=crop&q=60",
      profileName: "Marie Dubois",
      profileRole: "Chef",
      stars: 5
    },
    {
      img: "https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
      tag: "L'Écrin Royal",
      title: "Restaurant Traditionnel",
      desc: "Ambiance chaleureuse avec des spécialités locales préparées avec soin.",
      profileImg: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=600&auto=format&fit=crop&q=60",
      profileName: "Jean Martin",
      profileRole: "Chef",
      stars: 4
    },
    {
      img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
      tag: "Les Trois Hibiscus",
      title: "Restaurant de Plage",
      desc: "Un cadre idyllique au bord de l’océan avec des plats frais et savoureux.",
      profileImg: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
      profileName: "Sophie Bernard",
      profileRole: "Chef",
      stars: 3
    },
    {
      img: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
      tag: "L'Auberge des Marins",
      title: "Restaurant Familial",
      desc: "Un lieu convivial où tradition et modernité se rencontrent.",
      profileImg: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=40&h=40&fit=crop&crop=face",
      profileName: "Luc Moreau",
      profileRole: "Chef",
      stars: 4
    },
    {
      img: "https://images.unsplash.com/photo-1581349485608-9469926a8e5e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHJlc3RhdXJhbnQlMjBraXRjaGVufGVufDB8fDB8fHww",
      tag: "La Demeure Enchantée",
      title: "Bistro Chic",
      desc: "Un petit bijou où chaque plat raconte une histoire.",
      profileImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      profileName: "Pauline Lefèvre",
      profileRole: "Chef",
      stars: 2
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
        <h2 className="text-center mb-4">Secteur Restaurant</h2>

        {/* Barre de recherche */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Rechercher un restaurant..."
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
            <p className="text-center">Aucun restaurant trouvé</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Resto;
