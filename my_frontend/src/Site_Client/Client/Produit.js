// scr/Site_Client/Client/Produit.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
import "../../Styles/Produit.css";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

export default function Produit() {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [categorie, setCategorie] = useState("Tourisme");
  const [showModal, setShowModal] = useState(false);

  // ✅ États pour la modification
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // ✅ Liste des produits
  const [produits, setProduits] = useState([]);
  const [pending, setPending] = useState(true);

  const [searchTerm, setSearchTerm] = useState(""); // 🔍 champ de recherche

  // ✅ Charger tous les produits au montage
  useEffect(() => {
    fetchProduits();
  }, []);

  const fetchProduits = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/produits");
      setProduits(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement :", error);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Impossible de charger les produits.",
      });
    } finally {
      setPending(false);
    }
  };

  // ✅ Gestion de l'image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // ✅ Ajouter un produit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", titre);
      formData.append("description", description);
      formData.append("categorie", categorie);
      if (image) formData.append("image_produit", image);

      const response = await axios.post("http://127.0.0.1:8000/api/produits", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        icon: "success",
        title: "Succès",
        text: response.data.message,
        showConfirmButton: false,
        timer: 2000,
      });

      resetForm();
      fetchProduits();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Échec de l'ajout du produit. Vérifiez vos données.",
      });
    }
  };

  // ✅ Pré-remplir les champs pour modification
  const handleEdit = (produit) => {
    setEditMode(true);
    setEditId(produit.id);
    setTitre(produit.title);
    setDescription(produit.description);
    setCategorie(produit.categorie);
    setImagePreview(produit.image_produit ? `http://127.0.0.1:8000/storage/${produit.image_produit}` : null);
    setShowModal(true);
  };

  // ✅ Mettre à jour un produit
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", titre);
      formData.append("description", description);
      formData.append("categorie", categorie);
      if (image) formData.append("image_produit", image);

      const response = await axios.post(
        `http://127.0.0.1:8000/api/produits/${editId}?_method=PUT`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Succès",
        text: response.data.message,
        timer: 2000,
        showConfirmButton: false,
      });

      resetForm();
      fetchProduits();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Échec de la modification du produit.",
      });
    }
  };

  // ✅ Supprimer un produit avec confirmation SweetAlert
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Cette action est irréversible !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://127.0.0.1:8000/api/produits/${id}`);
          Swal.fire("Supprimé !", "Le produit a été supprimé.", "success");
          fetchProduits();
        } catch (error) {
          Swal.fire("Erreur", "Impossible de supprimer le produit.", "error");
        }
      }
    });
  };

  // ✅ Réinitialiser le formulaire
  const resetForm = () => {
    setTitre("");
    setDescription("");
    setImage(null);
    setImagePreview(null);
    setCategorie("Tourisme");
    setEditMode(false);
    setEditId(null);
    setShowModal(false);
  };

  // 🔍 Filtrer les produits selon le terme de recherche
  const filteredProduits = produits.filter((produit) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      produit.title?.toLowerCase().includes(searchLower) ||
      produit.description?.toLowerCase().includes(searchLower) ||
      produit.categorie?.toLowerCase().includes(searchLower)
    );
  });

  // ✅ Colonnes du DataTable
  const columns = [
    {
      name: "Image",
      selector: (row) => row.image_produit,
      cell: (row) =>
        row.image_produit ? (
          <img
            src={`http://127.0.0.1:8000/storage/${row.image_produit}`}
            alt={row.title}
            width="80"
            height="60"
            style={{ objectFit: "cover", borderRadius: "8px" }}
          />
        ) : (
          <span>Pas d'image</span>
        ),
    },
    { name: "Titre", selector: (row) => row.title, sortable: true },
    { name: "Description", selector: (row) => row.description, wrap: true },
    { name: "Catégorie", selector: (row) => row.categorie, sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <div className="produit-actions-buttons">
          <button
            className="produit-btn-icon edit"
            onClick={() => handleEdit(row)}
            title="Modifier le produit"
          >
            <FaEdit size={18} />
          </button>
          <button
            className="produit-btn-icon delete"
            onClick={() => handleDelete(row.id)}
            title="Supprimer le produit"
          >
            <FaTrash size={18} />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }
  ];

  return (
    <div className="produit-container">
      <div className="produit-header">
        <h2 className="produit-table-title">Liste des produits</h2>
        <button
          className="produit-add-btn"
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          ➕ Ajouter un produit
        </button>
      </div>

      {/* 🔍 Barre de recherche */}
      <div className="produit-search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Rechercher par titre, description ou catégorie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* ✅ Tableau des produits */}
      <div className="produit-table-container">
        <DataTable
          columns={columns}
          data={filteredProduits}
          progressPending={pending}
          pagination
          highlightOnHover
          responsive
          persistTableHead
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 20]}
          noDataComponent="Aucun produit trouvé"
          customStyles={{
            headCells: {
              style: { backgroundColor: "#f3f4f6", fontWeight: "bold" },
            },
          }}
        />
      </div>

      {/* ✅ Modale d'ajout / modification */}
      {showModal && (
        <div className="produit-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="produit-modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="produit-close-btn" onClick={() => setShowModal(false)}>
              &times;
            </span>

            <div className="produit-card">
              <div className="produit-card-header">
                <h2>{editMode ? "Modifier le produit" : "Ajouter un produit"}</h2>
              </div>

              <form onSubmit={editMode ? handleUpdate : handleSubmit} className="produit-form">
                <div className="produit-form-group">
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

                <div className="produit-form-group">
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

                <div className="produit-form-group">
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

                <div className="produit-form-group">
                  <label htmlFor="image">Image du produit</label>
                  <div className="produit-file-input-wrapper">
                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="produit-file-input"
                    />
                    <label htmlFor="image" className="produit-file-label">
                      {image ? "Changer l'image" : "Choisir une image"}
                    </label>
                    {imagePreview && (
                      <div className="produit-image-preview">
                        <img src={imagePreview} alt="Aperçu" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="produit-form-actions">
                  <button 
                    type="button" 
                    className="produit-cancel-btn"
                    onClick={resetForm}
                  >
                    Annuler
                  </button>
                  <button type="submit" className="produit-submit-btn">
                    {editMode ? "Modifier le produit" : "Ajouter le produit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}