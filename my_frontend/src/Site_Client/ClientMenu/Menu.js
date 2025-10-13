// src/Site_Client/ClientMenu/Menu.js
import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaBox, FaVial, FaHome, FaSignOutAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import "../../Styles/Menu.css";

function Menu() {
  const [open, setOpen] = useState(false);
  const [clientEmail, setClientEmail] = useState("");
  const [clientId, setClientId] = useState(null);
  const [produits, setProduits] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedClient = localStorage.getItem("client");
    if (storedClient) {
      const parsedClient = JSON.parse(storedClient);
      setClientEmail(parsedClient.email || "Client inconnu");
      setClientId(parsedClient.id_client);
    }
  }, []);

  // 🔹 Charger les produits pour ce client
  useEffect(() => {
    if (clientId) {
      axios
        .get(`http://127.0.0.1:8000/api/produits/liste?client_id=${clientId}`)
        .then((res) => {
          setProduits(res.data);
        })
        .catch((err) => {
          console.error("Erreur lors du chargement des produits", err);
        });
    }
  }, [clientId]);

  const handleLogout = () => {
    Swal.fire({
      title: "Voulez-vous vous déconnecter ?",
      text: "Vous devrez vous reconnecter pour accéder à vos données.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, déconnecter",
      cancelButtonText: "Non, annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("client");
        navigate("/client");
      }
    });
  };

  const menuItems = [
    { path: "/client/dashboard", label: "Accueil", icon: <FaHome /> },
    { path: "/client/dashboard/produit", label: "Produits", icon: <FaBox /> },
    { path: "/client/dashboard/test", label: "Test", icon: <FaVial /> },
  ];

  return (
    <div className="admin-container">
      <aside className={`sidebar ${open ? "open" : "closed"}`}>
        <div className="hamburger" onClick={() => setOpen(!open)}>
          <FaBars size={24} />
        </div>

        {open && <div className="sidebar-header">SouthConnect</div>}

        <nav className="menu-nav">
          <ul>
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`menu-link ${
                    location.pathname === item.path ? "active" : ""
                  }`}
                  title={!open ? item.label : ""}
                >
                  <span className="menu-icon">{item.icon}</span>
                  {open && <span className="menu-label">{item.label}</span>}
                </Link>
              </li>
            ))}

            {/* 🔹 Sous-menu Carousel avec produits */}
            <li>
              <div className="menu-link">
                <span className="menu-icon">
                  <FaVial />
                </span>
                {open && <span className="menu-label">Carousel</span>}
              </div>
              {open && (
                <ul className="submenu">
                  {produits.length > 0 ? (
                    produits.map((produit) => (
                      <li key={produit.id_produit}>
                        <Link to={`/client/dashboard/carrouselclient/${produit.id_produit}`}>
                          {produit.title}
                        </Link>

                      </li>
                    ))
                  ) : (
                    <li>Aucun produit</li>
                  )}
                </ul>
              )}
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          {open && (
            <>
              <div className="client-info">
                <p>{clientEmail}</p>
              </div>
              <button className="logout-btn" onClick={handleLogout}>
                <FaSignOutAlt className="logout-icon" /> Déconnexion
              </button>
            </>
          )}
        </div>
      </aside>

      {open && <div className="overlay" onClick={() => setOpen(false)} />}

      <main className={`main-content ${open ? "shifted" : ""}`}>
        <Outlet />
      </main>
    </div>
  );
}

export default Menu;
