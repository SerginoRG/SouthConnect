import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "../../Styles/Carde.css";
import { SearchContext } from "../Context/SearchContext";

function Tourisme() {
  const { searchTerm } = useContext(SearchContext);
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/produits/Tourisme")
      .then((response) => setProduits(response.data))
      .catch((error) => console.error("Erreur API:", error));
  }, []);

  const filteredProduits = produits.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="content-section py-5">
      <div className="container">
        <div className="row g-4 mt-4">
          {filteredProduits.map((item, index) => (
            <div className="col-md-4" key={index}>
              <div className="card">
                <div className="card-image">
                  <img
                    src={`http://127.0.0.1:8000/storage/${item.image_produit}`}
                    alt={item.title}
                  />
                  <p className="card-tag">{item.categorie}</p>
                </div>
                <div className="card-content">
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-text">{item.description}</p>
                  <a href="https://example.com" className="card-button">
                    En savoir plus
                  </a>
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
