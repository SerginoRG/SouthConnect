import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-custom fixed-top bg-light shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img
            src="/images/Logo/logo.png"
            alt="SouthConnect Logo"
            height="40"
            style={{ borderRadius: "50%" }}
          />{" "}
          SouthConnect
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menuNavbar"
          aria-controls="menuNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menuNavbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {/* Accueil */}
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                <i className="fas fa-home me-1"></i>Accueil
              </Link>
            </li>

            {/* Secteur avec sous-menu */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="secteurDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-industry me-1"></i>Secteur
              </Link>
              <ul className="dropdown-menu" aria-labelledby="secteurDropdown">
               {/*
                <li>
                  <Link className="dropdown-item" to="/secteur/hotel">
                    Hôtel
                  </Link>
                </li>

                */}

                <li>
                  <Link className="dropdown-item" to="/secteur/Boutique">
                    Boutique
                  </Link>
                </li>
                 {/*
                 <li>
                  <Link className="dropdown-item" to="/secteur/resto">
                    Restaurant
                  </Link>
                </li>
                  */}
                   <li>
                  <Link className="dropdown-item" to="/secteur/tourisme">
                    Tourisme
                  </Link>
                </li>
               
              </ul>
            </li>

            {/* PUB */}
            <li className="nav-item">
  
              <Link   className="nav-link" to="/publication">
                <i className="fas fa-bullhorn me-1"></i>
                    PUB
                  </Link>
           
            </li>
          </ul>

        {/* Bouton Contact en modale */}
          <button
            className="btn btn-warning ms-lg-3"
            data-bs-toggle="modal"
            data-bs-target="#contactModal"
          >
            <i className="fas fa-envelope me-1"></i>Contactez-nous
          </button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
