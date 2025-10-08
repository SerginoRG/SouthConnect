// src/Site_Client/ClientMenu/Menu.js
import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaBox, FaVial, FaHome, FaSignOutAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import "../../Styles/Menu.css";

function Menu() {
  const [open, setOpen] = useState(false);
  const [clientEmail, setClientEmail] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // 🔹 Récupérer le client depuis le localStorage
  useEffect(() => {
    const storedClient = localStorage.getItem("client");
    if (storedClient) {
      const parsedClient = JSON.parse(storedClient);
      setClientEmail(parsedClient.email || "Client inconnu");
    }
  }, []);

  // 🔹 Fonction de déconnexion avec confirmation
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
        localStorage.removeItem("client"); // supprimer le client du stockage
        
        navigate("/client"); // rediriger vers la page de connexion
      }
    });
  };

  // ✅ Liens du menu
  const menuItems = [
    { path: "/client/dashboard", label: "Accueil", icon: <FaHome /> },
    { path: "/client/dashboard/produit", label: "Produits", icon: <FaBox /> },
    { path: "/client/dashboard/test", label: "Test", icon: <FaVial /> },
  ];

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className={`sidebar ${open ? "open" : "closed"}`}>
        {/* Bouton Hamburger */}
        <div className="hamburger" onClick={() => setOpen(!open)}>
          <FaBars size={24} />
        </div>

        {/* Logo ou titre */}
        {open && <div className="sidebar-header">SouthConnect</div>}

        {/* Liens du menu */}
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
          </ul>
        </nav>

        {/* 🔹 Affichage email et bouton Déconnexion */}
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

      {/* Overlay pour mobile */}
      {open && <div className="overlay" onClick={() => setOpen(false)} />}

      {/* Contenu principal */}
      <main className={`main-content ${open ? "shifted" : ""}`}>
        <Outlet />
      </main>
    </div>
  );
}

export default Menu;
