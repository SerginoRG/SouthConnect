import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../Styles/Produit.css";

export default function Produit() {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [categorie, setCategorie] = useState("Tourisme");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", titre);
      formData.append("description", description);
      formData.append("categorie", categorie);
      if (image) formData.append("image_produit", image);

      const response = await axios.post("http://127.0.0.1:8000/api/produits", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // ✅ Message SweetAlert success
      Swal.fire({
        icon: "success",
        title: "Succès",
        text: response.data.message,
        showConfirmButton: false,
        timer: 2000, // disparaît après 2s
      });

      // Reset du formulaire
      setTitre("");
      setDescription("");
      setImage(null);
      setImagePreview(null);
      setCategorie("Tourisme");
    } catch (error) {
      console.error(error);

      // ❌ Message SweetAlert erreur
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Échec de l’ajout du produit. Vérifiez vos données.",
      });
    }
  };

  return (
    <div className="produit-container">
      <div className="produit-card">
        <div className="card-header">
          <h2>Gestion des Produits</h2>
          <p>Ajoutez un nouveau produit</p>
        </div>

        <form onSubmit={handleSubmit} className="produit-form">
          {/* Champ Titre */}
          <div className="form-group">
            <label htmlFor="titre">Titre</label>
            <input
              id="titre"
              type="text"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              placeholder="Entrez le titre du produit"
              required
            />
          </div>

          {/* Champ Description */}
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez votre produit..."
              required
              rows="4"
            />
          </div>

          {/* Catégorie */}
          <div className="form-group">
            <label htmlFor="categorie">Catégorie</label>
            <select
              id="categorie"
              value={categorie}
              onChange={(e) => setCategorie(e.target.value)}
            >
              <option value="Tourisme">Tourisme</option>
              <option value="Boutique">Boutique</option>
            </select>
          </div>

         {/* Importation Image */} 
         <div className="form-group"> 
          <label htmlFor="image">Image du produit</label>
           <div className="file-input-wrapper"> 
            <input 
            id="image" 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
            className="file-input" /> 
            <label htmlFor="image" className="file-label"> "Changer l'image" : "Choisir une image" 
              {imagePreview && ( <div className="image-preview"> 
                <img src={imagePreview} alt="Aperçu" /> 
                </div> )}
                 </label> 
                 </div> 
                 </div>

          {/* Bouton */}
          <button type="submit" className="submit-btn">
            Ajouter le produit
          </button>
        </form>
      </div>
    </div>
  );
}
