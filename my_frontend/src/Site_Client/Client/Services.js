import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
import { useParams } from "react-router-dom";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import "../../Styles/Produit.css";

export default function Services() {
  const { id_produit } = useParams();
  const client = JSON.parse(localStorage.getItem("client"));
  const clientId = client ? client.id_client : null;
  const clientStatut = client ? client.statut : false;

  const [titre_service, setTitre_service] = useState("");
  const [image_service, setImage_service] = useState(null);
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchServices();
  }, [clientId, id_produit]);

  const fetchServices = async () => {
    try {
      if (!clientId || !id_produit) return;
      const response = await axios.get(
        `http://127.0.0.1:8000/api/services?client_id=${clientId}&produit_id=${id_produit}`
      );
      setServices(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement :", error);
    }
  };

  const resetForm = () => {
    setTitre_service("");
    setImage_service(null);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!client) return Swal.fire("Erreur", "Veuillez vous reconnecter.", "error");
    if (!clientStatut)
      return Swal.fire("Attention", "Vous devez vous abonner pour effectuer cette action", "warning");

    try {
      const formData = new FormData();
      formData.append("titre_service", titre_service);
      formData.append("client_id", clientId.toString());
      formData.append("id_produit", id_produit.toString());
      if (image_service) formData.append("image_service", image_service);

      let response;
      if (editingId) {
        response = await axios.post(
          `http://127.0.0.1:8000/api/services/${editingId}?_method=PUT`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        response = await axios.post("http://127.0.0.1:8000/api/services", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
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
      fetchServices();
    } catch (error) {
      console.error(error);
      Swal.fire("Erreur", "Impossible d'enregistrer le service.", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!clientStatut)
      return Swal.fire("Attention", "Vous devez vous abonner pour effectuer cette action", "warning");

    Swal.fire({
      title: "Supprimer ce service ?",
      text: "Cette action est irréversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://127.0.0.1:8000/api/services/${id}`);
          Swal.fire("Supprimé", "Le service a été supprimé.", "success");
          fetchServices();
        } catch (error) {
          Swal.fire("Erreur", "Suppression échouée.", "error");
        }
      }
    });
  };

  const handleEdit = (service) => {
    if (!clientStatut)
      return Swal.fire("Attention", "Vous devez vous abonner pour effectuer cette action", "warning");
    setTitre_service(service.titre_service);
    setEditingId(service.id_service);
    setModalOpen(true);
  };

  const handleAdd = () => {
    if (!clientStatut)
      return Swal.fire("Attention", "Vous devez vous abonner pour effectuer cette action", "warning");
    resetForm();
    setModalOpen(true);
  };

  const columns = [
    { name: "Titre", selector: (row) => row.titre_service, sortable: true },
    {
      name: "Image",
      cell: (row) =>
        row.image_service ? (
          <img
            src={`http://127.0.0.1:8000/storage/${row.image_service}`}
            alt={row.titre_service}
            width="70"
            height="70"
            style={{ objectFit: "cover", borderRadius: "8px" }}
          />
        ) : (
          "Aucune"
        ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <button className="produit-btn-icon edit" onClick={() => handleEdit(row)}>
            <FaEdit />
          </button>
          <button className="produit-btn-icon delete" onClick={() => handleDelete(row.id_service)}>
            <FaTrash />
          </button>
        </>
      ),
    },
  ];

  const filteredServices = services.filter((p) =>
    p.titre_service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="produit-container">
      <h2 className="titre-page">Gestion des Services</h2>

      <div className="produit-header">
        <button className="produit-add-btn" onClick={handleAdd}>
          Ajouter un service
        </button>
        <div className="produit-search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher un service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="produit-table-container">
        <DataTable
          columns={columns}
          data={filteredServices}
          pagination
          highlightOnHover
          striped
          noDataComponent="Aucun service trouvé."
        />
      </div>

      {modalOpen && (
        <div className="produit-modal-overlay">
          <div className="produit-modal-content">
            <span className="produit-close-btn" onClick={() => setModalOpen(false)}>
              &times;
            </span>
            <h2>{editingId ? "Modifier un service" : "Ajouter un service"}</h2>
            <form onSubmit={handleSubmit} className="produit-form">
              <div className="produit-form-group">
                <input
                type="text"
                placeholder="Titre du service"
                value={titre_service}
                onChange={(e) => {
                    const words = e.target.value.split(/\s+/); // Sépare par espaces
                    if (words.length <= 20) {
                    setTitre_service(e.target.value);
                    } else {
                    Swal.fire("Attention", "Le titre ne peut pas dépasser 20 mots.", "warning");
                    }
                }}
               
                />

              </div>

              <div className="produit-form-group produit-file-input-wrapper">
                <input
                  type="file"
                  accept="image/*"
                  className="produit-file-input"
                  id="file-upload"
                  onChange={(e) => setImage_service(e.target.files[0])}
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
