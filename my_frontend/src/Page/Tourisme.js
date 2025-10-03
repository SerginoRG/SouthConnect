// src/Page/Tourisme.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/hotel.css";; // <-- tu peux créer un fichier CSS séparé

function Tourisme() {
  const [produits, setProduits] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Charger uniquement les produits de la catégorie "Tourisme"
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/produits/Tourisme")
      .then(response => setProduits(response.data))
      .catch(error => console.error("Erreur API:", error));
  }, []);

  // Recherche
  const filteredProduits = produits.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="content-section py-5">
      <div className="container">
        <h2 className="text-center mb-4">Secteur Tourisme</h2>

        {/* Barre de recherche */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Rechercher un produit tourisme..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="row g-4 mt-4">
          {filteredProduits.map((item, index) => (
            <div className="col-md-4" key={index}>
              <div className="card">
                <div className="card-image">
                  <img 
                    src={`http://127.0.0.1:8000/storage/${item.image_produit}`} 
                    alt={item.title} 
                  />
             
                </div>
                <div className="card-content">
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-text">{item.description}</p>
                  <a href="https://example.com" className="card-button">En savoir plus</a>
                </div>
              </div>
            </div>
          ))}
          {filteredProduits.length === 0 && (
            <p className="text-center">Aucun produit tourisme trouvé</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Tourisme;
