import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
import "../../Styles/Produit.css";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

export default function Client() {
  const [clients, setClients] = useState([]);
  const [pending, setPending] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 champ de recherche

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/clients");
      setClients(response.data);
    } catch (error) {
      console.error(error);
      Swal.fire("Erreur", "Impossible de charger les clients.", "error");
    } finally {
      setPending(false);
    }
  };

  // ✅ Filtrage dynamique des clients selon la recherche
  const filteredClients = clients.filter(
    (client) =>
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.password.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClient = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/clients", { email, password });
      Swal.fire("Succès", "Client ajouté avec succès.", "success");
      setShowAddModal(false);
      resetForm();
      fetchClients();
    } catch (error) {
      Swal.fire("Erreur", "Impossible d'ajouter le client.", "error");
    }
  };

  const handleEditClient = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/clients/${editId}`, {
        email,
        password,
      });
      Swal.fire("Succès", "Client modifié avec succès.", "success");
      setShowEditModal(false);
      resetForm();
      fetchClients();
    } catch (error) {
      Swal.fire("Erreur", "Impossible de modifier le client.", "error");
    }
  };

  const handleDeleteClient = async (id) => {
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
          await axios.delete(`http://127.0.0.1:8000/api/clients/${id}`);
          Swal.fire("Supprimé !", "Le client a été supprimé.", "success");
          fetchClients();
        } catch (error) {
          Swal.fire("Erreur", "Impossible de supprimer le client.", "error");
        }
      }
    });
  };

  const handleToggleStatut = async (client) => {
    try {
      const newStatut = !client.statut;
      await axios.put(`http://127.0.0.1:8000/api/clients/${client.id_client}`, {
        email: client.email,
        password: client.password,
        is_active: newStatut,
      });

      setClients(
        clients.map((c) =>
          c.id_client === client.id_client ? { ...c, statut: newStatut } : c
        )
      );

      Swal.fire({
        icon: "success",
        title: "Statut modifié",
        text: `Le client est maintenant ${
          newStatut ? "actif" : "inactif"
        }`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire("Erreur", "Impossible de modifier le statut.", "error");
    }
  };

  const openEditModal = (client) => {
    setEmail(client.email);
    setPassword(client.password);
    setEditId(client.id_client);
    setShowEditModal(true);
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setEditId(null);
  };

  const columns = [
    {
      name: "Date de création",
      selector: (row) => new Date(row.created_at).toLocaleDateString(),
      sortable: true,
      width: "150px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      grow: 2,
    },
    {
      name: "Mot de passe",
      selector: (row) => row.password,
      grow: 1,
    },
    {
      name: "Statut",
      cell: (row) => (
        <input
          type="checkbox"
          checked={row.statut}
          onChange={() => handleToggleStatut(row)}
          style={{ cursor: "pointer" }}
        />
      ),
      width: "100px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="produit-actions-buttons">
          <button
            className="produit-btn-icon edit"
            onClick={() => openEditModal(row)}
            title="Modifier"
          >
            <FaEdit size={18} />
          </button>
          <button
            className="produit-btn-icon delete"
            onClick={() => handleDeleteClient(row.id_client)}
            title="Supprimer"
          >
            <FaTrash size={18} />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "120px",
    },
  ];

  return (
    <div className="produit-container">
      <div className="produit-header">
        <h2 className="produit-table-title">Liste des clients</h2>
        <button
          className="produit-add-btn"
          onClick={() => {
            resetForm();
            setShowAddModal(true);
          }}
        >
          ➕ Ajouter un client
        </button>
      </div>

      {/* 🔍 Barre de recherche */}
      <div className="produit-search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Rechercher un client..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tableau */}
      <div className="produit-table-container">
        <DataTable
          columns={columns}
          data={filteredClients}
          progressPending={pending}
          pagination
          highlightOnHover
           paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 20]}
          responsive
        />
      </div>

      {/* Modal Ajouter Client */}
      {showAddModal && (
        <div
          className="produit-modal-overlay"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="produit-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className="produit-close-btn"
              onClick={() => setShowAddModal(false)}
            >
              &times;
            </span>
            <h2>Ajouter un client</h2>
            <form onSubmit={handleAddClient}>
              <div className="produit-form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="produit-form-group">
                <label>Mot de passe</label>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="produit-form-actions">
                <button
                  type="button"
                  className="produit-cancel-btn"
                  onClick={() => setShowAddModal(false)}
                >
                  Annuler
                </button>
                <button type="submit" className="produit-submit-btn">
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Modifier Client */}
      {showEditModal && (
        <div
          className="produit-modal-overlay"
          onClick={() => setShowEditModal(false)}
        >
          <div
            className="produit-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className="produit-close-btn"
              onClick={() => setShowEditModal(false)}
            >
              &times;
            </span>
            <h2>Modifier le client</h2>
            <form onSubmit={handleEditClient}>
              <div className="produit-form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="produit-form-group">
                <label>Mot de passe</label>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="produit-form-actions">
                <button
                  type="button"
                  className="produit-cancel-btn"
                  onClick={() => setShowEditModal(false)}
                >
                  Annuler
                </button>
                <button type="submit" className="produit-submit-btn">
                  Modifier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
