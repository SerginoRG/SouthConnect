import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
import "../../Styles/Produit.css";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

export default function Produit() {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [categorie, setCategorie] = useState("");
  const [image, setImage] = useState(null);
  const [produits, setProduits] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const client = JSON.parse(localStorage.getItem("client"));
  const clientId = client ? client.id_client : null;
  const clientStatut = client ? client.statut : false; // statut du compte

  useEffect(() => {
    fetchProduits();
  }, []);

  const fetchProduits = async () => {
    try {
      if (!clientId) return;
      const response = await axios.get(
        `http://127.0.0.1:8000/api/produits?client_id=${clientId}`
      );
      setProduits(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement :", error);
    }
  };

  const resetForm = () => {
    setTitre("");
    setDescription("");
    setCategorie("");
    setImage(null);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!client) {
      Swal.fire("Erreur", "Veuillez vous reconnecter.", "error");
      return;
    }

    if (!clientStatut) {
      Swal.fire("Attention", "Vous devez vous abonner pour effectuer cette action", "warning");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", titre);
      formData.append("description", description);
      formData.append("categorie", categorie);
      formData.append("client_id", client.id_client);
      if (image) formData.append("image_produit", image);

      let response;
      if (editingId) {
        response = await axios.post(
          `http://127.0.0.1:8000/api/produits/${editingId}?_method=PUT`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        response = await axios.post(
          "http://127.0.0.1:8000/api/produits",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      Swal.fire({
        icon: "success",
        title: "Succès",
        text: response.data.message,
        timer: 2000,
        showConfirmButton: false,
      });

      resetForm();
      setModalOpen(false);
      fetchProduits();
    } catch (error) {
      console.error(error);
      Swal.fire("Erreur", "Impossible d'enregistrer le produit.", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!clientStatut) {
      Swal.fire("Attention", "Vous devez vous abonner pour effectuer cette action", "warning");
      return;
    }

    Swal.fire({
      title: "Supprimer ce produit ?",
      text: "Cette action est irréversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://127.0.0.1:8000/api/produits/${id}`);
          Swal.fire("Supprimé", "Le produit a été supprimé.", "success");
          fetchProduits();
        } catch (error) {
          Swal.fire("Erreur", "Suppression échouée.", "error");
        }
      }
    });
  };

  const handleEdit = (produit) => {
    if (!clientStatut) {
      Swal.fire("Attention", "Vous devez vous abonner pour effectuer cette action", "warning");
      return;
    }

    setTitre(produit.title);
    setDescription(produit.description);
    setCategorie(produit.categorie);
    setEditingId(produit.id);
    setModalOpen(true);
  };

  const handleAdd = () => {
    if (!clientStatut) {
      Swal.fire("Attention", "Vous devez vous abonner pour effectuer cette action", "warning");
      return;
    }
    resetForm();
    setModalOpen(true);
  };

  const columns = [
    { name: "Titre", selector: (row) => row.title, sortable: true },
    { name: "Description", selector: (row) => row.description },
    { name: "Catégorie", selector: (row) => row.categorie },
    {
      name: "Image",
      cell: (row) =>
        row.image_produit ? (
          <img
            src={`http://127.0.0.1:8000/storage/${row.image_produit}`}
            alt={row.title}
            width="70"
            height="70"
          />
        ) : (
          "Aucune"
        ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <button
            className="produit-btn-icon edit"
            onClick={() => handleEdit(row)}
            disabled={!clientStatut}
            style={{ opacity: clientStatut ? 1 : 0.5, cursor: clientStatut ? "pointer" : "not-allowed" }}
          >
            <FaEdit />
          </button>
          <button
            className="produit-btn-icon delete"
            onClick={() => handleDelete(row.id)}
            disabled={!clientStatut}
            style={{ opacity: clientStatut ? 1 : 0.5, cursor: clientStatut ? "pointer" : "not-allowed" }}
          >
            <FaTrash />
          </button>
        </>
      ),
    },
  ];

  const filteredProduits = produits.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="produit-container">
      <h2 className="titre-page">Gestion des Produits</h2>

      {!clientStatut && (
        <div style={{ color: "red", marginBottom: "10px" }}>
          ⚠️ Vous devez vous abonner.
        </div>
      )}

      <div className="produit-header">
        <button
          className="produit-add-btn"
          onClick={handleAdd}
          disabled={!clientStatut}
          style={{ opacity: clientStatut ? 1 : 0.5, cursor: clientStatut ? "pointer" : "not-allowed" }}
        >
          Ajouter un produit
        </button>
        <div className="produit-search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="produit-table-container">
        <DataTable
          columns={columns}
          data={filteredProduits}
          pagination
          highlightOnHover
          striped
          noDataComponent="Aucun produit trouvé."
        />
      </div>

      {/* Modale */}
      {modalOpen && clientStatut && (
        <div className="produit-modal-overlay">
          <div className="produit-modal-content">
            <span className="produit-close-btn" onClick={() => setModalOpen(false)}>
              &times;
            </span>
            <h2>{editingId ? "Modifier un produit" : "Ajouter un produit"}</h2>

          <form onSubmit={handleSubmit} className="produit-form">
            <div className="produit-form-group">
              <input
                type="text"
                placeholder="Titre du produit"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
                required
              />
            </div>

            <div className="produit-form-group">
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="produit-form-group">
              <select
                value={categorie}
                onChange={(e) => setCategorie(e.target.value)}
                required
              >
                <option value="">-- Sélectionner une catégorie --</option>
                <option value="Tourisme">Tourisme</option>
                <option value="Restauration">Restauration</option>
                <option value="Boutique">Boutique</option>
                <option value="Hôtel">Hôtel</option>
              </select>
            </div>

            <div className="produit-form-group produit-file-input-wrapper">
              <input
                type="file"
                accept="image/*"
                className="produit-file-input"
                id="file-upload"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <label htmlFor="file-upload" className="produit-file-label">
                Choisir une image
              </label>
            </div>

            <div className="produit-form-actions">
              <button
                type="button"
                className="produit-cancel-btn"
                onClick={() => setModalOpen(false)}
              >
                Annuler
              </button>
              <button type="submit" className="produit-submit-btn">
                {editingId ? "Modifier" : "Ajouter"}
              </button>
            </div>
          </form>

          </div>
        </div>
      )}
    </div>
  );
}
