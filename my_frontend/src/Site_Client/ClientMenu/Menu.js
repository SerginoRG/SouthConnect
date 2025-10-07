// src/Site_Client/ClientMenu/Menu.js
import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaBars, FaBox, FaVial, FaHome } from "react-icons/fa"; // ✅ Ajout de FaHome
import "../../Styles/Menu.css";

function Menu() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // ✅ Chemins corrigés
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
