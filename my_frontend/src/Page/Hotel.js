// src/Page/Hotel.js
import React, { useState } from "react";
import "../Styles/hotel.css"; // <-- On lie le fichier CSS ici

function Hotel() {
  const [searchTerm, setSearchTerm] = useState("");

  const elements = [
    {
      img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop",
      tag: "Le Grand Palais",
      title: "Hôtel de Luxe",
      desc: "Découvrez l'excellence de l'hospitalité dans un cadre exceptionnel avec des services haut de gamme. Chaque détail a été pensé pour vous offrir un séjour de rêve",
      profileImg: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=600&auto=format&fit=crop&q=60",
      profileName: "Marie Dubois",
      profileRole: "Manager",
      stars: 5
    },
    {
      img: "https://plus.unsplash.com/premium_photo-1661875749873-41f940da9fc8?w=500&auto=format&fit=crop&q=60",
      tag: "L'Écrin Royal",
      title: "Hôtel de Luxe",
      desc: "Nichée au cœur d'un paysage verdoyant, notre villa vous offre une intimité totale et un calme absolu.",
      profileImg: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=600&auto=format&fit=crop&q=60",
      profileName: "Jean Martin",
      profileRole: "Manager",
      stars: 1
    },

    {
      img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop",
      tag: "Le Grand Palais",
      title: "Hôtel de Luxe",
      desc: "Découvrez l'excellence de l'hospitalité dans un cadre exceptionnel avec des services haut de gamme. Chaque détail a été pensé pour vous offrir un séjour de rêve",
      profileImg: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D",
      profileName: "Marie Dubois",
      profileRole: "Manager",
      stars: 5   
    },
    {
      img: "https://plus.unsplash.com/premium_photo-1661875749873-41f940da9fc8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8em9vbSUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D",
      tag: "L'Écrin Royal",
      title: "Hôtel de Luxe",
      desc: "Nichée au cœur d'un paysage verdoyant, notre villa vous offre une intimité totale et un calme absolu. Profitez d'une évasion romantique avec un service personnalisé.",
      profileImg: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fHww",
      profileName: "Jean Martin",
      profileRole: "Manager",
       stars:1 
    },
    {
      img: "https://images.unsplash.com/photo-1455587734955-081b22074882?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWx8ZW58MHx8MHx8fDA%3D",
      tag: " Les Trois Hibiscus",
      title: "Hôtel de Luxe",
      desc: "Un havre de paix au bord de l'océan où chaque lever et coucher du soleil sont une invitation à la sérénité. Laissez-vous bercer par le bruit des vagues et la douceur des alizés.",
      profileImg: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
      profileName: "Sophie Bernard",
      profileRole: "Manager",
       stars: 3
    },
    {
      img: "https://plus.unsplash.com/premium_photo-1661929519129-7a76946c1d38?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aG90ZWx8ZW58MHx8MHx8fDA%3D",
      tag: "Le Phare",
      title: "Hôtel de Luxe",
      desc: "Situé au cœur de l'effervescence urbaine, notre hôtel est le point de départ idéal pour explorer la ville. Profitez d'un design moderne et d'une ambiance dynamique.",
      profileImg: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      profileName: "Claire Dupont",
      profileRole: "Manager",
       stars:2
    },
    {
      img: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGhvdGVsfGVufDB8fDB8fHww",
      tag: "L'Auberge des Marins",
      title: "Hôtel de Luxe",
      desc: "Un hôtel plein de charme et d'histoire où se mêlent tradition et confort moderne. L'endroit parfait pour se ressourcer après une journée d'exploration.",
      profileImg: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=40&h=40&fit=crop&crop=face",
      profileName: "Luc Moreau",
      profileRole: "Manager",
       stars:4
    },
    {
      img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=250&fit=crop",
      tag: "La Demeure Enchantée",
      title: "Hôtel de Luxe",
      desc: "Un petit bijou secret, loin de l'agitation, où chaque chambre a une âme. Laissez-vous charmer par notre jardin et la convivialité de notre équipe.",
      profileImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      profileName: "Pauline Lefèvre",
      profileRole: "Directrice",
       stars:0
    }

    // ... autres hôtels
  ];

  // Filtrage automatique selon recherche
  const filteredElements = elements.filter(
    (item) =>
      item.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.profileName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="content-section py-5">
      <div className="container">
        <h2 className="text-center mb-4">Secteur Hôtellerie</h2>

        {/* Barre de recherche */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Rechercher un hôtel..."
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
            <p className="text-center">Aucun hôtel trouvé</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Hotel;
