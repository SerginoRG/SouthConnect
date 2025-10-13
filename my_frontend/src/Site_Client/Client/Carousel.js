import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
import { useParams } from "react-router-dom";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import "../../Styles/Produit.css";

export default function CarrouselClient() {
  const { id_produit } = useParams();
  const client = JSON.parse(localStorage.getItem("client"));
  const clientId = client ? client.id_client : null;
  const clientStatut = client ? client.statut : false;

  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [carousels, setCarousels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchCarousels();
  }, [clientId, id_produit]);

  const fetchCarousels = async () => {
    try {
      if (!clientId || !id_produit) return;
      const response = await axios.get(
        `http://127.0.0.1:8000/api/carousels?client_id=${clientId}&produit_id=${id_produit}`
      );
      setCarousels(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement :", error);
    }
  };

  const resetForm = () => {
    setTitre("");
    setDescription("");
    setImage(null);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!client) return Swal.fire("Erreur", "Veuillez vous reconnecter.", "error");
    if (!clientStatut) return Swal.fire("Attention", "Vous devez vous abonner pour effectuer cette action", "warning");

    try {
      const formData = new FormData();
      formData.append("titre_carousel", titre);
      formData.append("description_carousel", description);
      formData.append("client_id", clientId.toString());
      formData.append("id_produit", id_produit.toString());
      if (image) formData.append("image_carousel", image);

      let response;
      if (editingId) {
        response = await axios.post(
          `http://127.0.0.1:8000/api/carousels/${editingId}?_method=PUT`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        response = await axios.post(
          "http://127.0.0.1:8000/api/carousels",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      Swal.fire({
        icon: "success",
        title: "Succès",
        text: response.data.message || "Opération réussie !",
        timer: 2000,
        showConfirmButton: false,
      });

      resetForm();
      setModalOpen(false);
      fetchCarousels();
    } catch (error) {
      console.error(error);
      Swal.fire("Erreur", "Impossible d'enregistrer le carousel.", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!clientStatut) return Swal.fire("Attention", "Vous devez vous abonner pour effectuer cette action", "warning");

    Swal.fire({
      title: "Supprimer ce carousel ?",
      text: "Cette action est irréversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://127.0.0.1:8000/api/carousels/${id}`);
          Swal.fire("Supprimé", "Le carousel a été supprimé.", "success");
          fetchCarousels();
        } catch (error) {
          Swal.fire("Erreur", "Suppression échouée.", "error");
        }
      }
    });
  };

  const handleEdit = (carousel) => {
    if (!clientStatut) return Swal.fire("Attention", "Vous devez vous abonner pour effectuer cette action", "warning");
    setTitre(carousel.titre_carousel);
    setDescription(carousel.description_carousel);
    setEditingId(carousel.id_carousel);
    setModalOpen(true);
  };

  const handleAdd = () => {
    if (!clientStatut) return Swal.fire("Attention", "Vous devez vous abonner pour effectuer cette action", "warning");
    resetForm();
    setModalOpen(true);
  };

  const columns = [
    { name: "Titre", selector: (row) => row.titre_carousel, sortable: true },
    { name: "Description", selector: (row) => row.description_carousel },
    {
      name: "Image",
      cell: (row) =>
        row.image_carousel ? (
          <img
            src={`http://127.0.0.1:8000/storage/${row.image_carousel}`}
            alt={row.titre_carousel}
            width="70"
            height="70"
            style={{ objectFit: "cover", borderRadius: "8px" }}
          />
        ) : "Aucune",
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <button className="produit-btn-icon edit" onClick={() => handleEdit(row)} disabled={!clientStatut} style={{opacity: clientStatut ? 1 : 0.5, cursor: clientStatut ? "pointer" : "not-allowed"}}><FaEdit /></button>
          <button className="produit-btn-icon delete" onClick={() => handleDelete(row.id_carousel)} disabled={!clientStatut} style={{opacity: clientStatut ? 1 : 0.5, cursor: clientStatut ? "pointer" : "not-allowed"}}><FaTrash /></button>
        </>
      ),
    },
  ];

  const filteredCarousels = carousels.filter((p) => p.titre_carousel.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="produit-container">
      <h2 className="titre-page">Gestion des Carousels</h2>
      {!clientStatut && <div style={{ color: "red", marginBottom: "10px" }}>⚠️ Vous devez vous abonner.</div>}
      {carousels.length >= 3 && <div style={{ color: "orange", marginBottom: "10px" }}>⚠️ Vous avez atteint la limite de 3 carousels.</div>}

      <div className="produit-header">
        <button className="produit-add-btn" onClick={handleAdd} disabled={!clientStatut || carousels.length >= 3} style={{opacity: !clientStatut || carousels.length >= 3 ? 0.5 : 1, cursor: !clientStatut || carousels.length >= 3 ? "not-allowed" : "pointer"}}>Ajouter un carousel</button>
        <div className="produit-search-bar">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Rechercher un carousel..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>

      <div className="produit-table-container">
        <DataTable columns={columns} data={filteredCarousels} pagination highlightOnHover striped noDataComponent="Aucun carousel trouvé." />
      </div>

      {modalOpen && clientStatut && (
        <div className="produit-modal-overlay">
          <div className="produit-modal-content">
            <span className="produit-close-btn" onClick={() => setModalOpen(false)}>&times;</span>
            <h2>{editingId ? "Modifier un carousel" : "Ajouter un carousel"}</h2>
            <form onSubmit={handleSubmit} className="produit-form">
              <div className="produit-form-group">
                <input type="text" placeholder="Titre du carousel" value={titre} onChange={(e) => setTitre(e.target.value)} required />
              </div>
              <div className="produit-form-group">
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
              </div>
              <div className="produit-form-group produit-file-input-wrapper">
                <input type="file" accept="image/*" className="produit-file-input" id="file-upload" onChange={(e) => setImage(e.target.files[0])} />
                <label htmlFor="file-upload" className="produit-file-label">Choisir une image</label>
              </div>
              <div className="produit-form-actions">
                <button type="button" className="produit-cancel-btn" onClick={() => setModalOpen(false)}>Annuler</button>
                <button type="submit" className="produit-submit-btn">{editingId ? "Modifier" : "Ajouter"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
