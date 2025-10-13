// // src/Site_Vitrine/Page/Tourisme.js
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "../../Styles/Carde.css";
import { SearchContext } from "../Context/SearchContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // ✅ Ajouté


function Tourisme() {
  const { searchTerm } = useContext(SearchContext);
  const [produits, setProduits] = useState([]);
  const navigate = useNavigate(); //  initialisation navigation
  // Récupération du client connecté
  const client = JSON.parse(localStorage.getItem("client"));
  const clientId = client ? client.id_client : null;



  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/produits/categorie/Tourisme")
      .then((response) => setProduits(response.data))
      .catch((error) => console.error("Erreur API:", error));

  }, []);

  const filteredProduits = produits.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

 const handleEnSavoirPlus = (produitId) => {
   if (!clientId) {
     Swal.fire("Erreur", "Veuillez vous connecter.", "error");
     return;
   }
   navigate(`/espace/${clientId}/${produitId}`);
 };
 
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
                   <button
                    className="card-button"
                    onClick={() => handleEnSavoirPlus(item.id_produit)}
                  >
                    En savoir plus
                  </button>
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
