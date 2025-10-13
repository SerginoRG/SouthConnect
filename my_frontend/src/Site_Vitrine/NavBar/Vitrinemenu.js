import React from "react";
import { Link } from "react-router-dom";
import "../../Styles/Test.css";

function Navbar() {
  return (
    <nav className="navbar-custom">
      <div className="container-nav">
        {/* Logo */}
        <Link className="logo" to="/">
          <img
            src="/images/Logo/logo.png"
            alt="SouthConnect Logo"
            height="40"
            style={{ borderRadius: "50%" }}
          />
          SouthConnect
        </Link>

        {/* Liens principaux */}
        <ul className="nav-links">
          <li><Link to="/">Accueil</Link></li>

          {/* Menu Secteur avec sous-menu */}
          <li className="dropdown">
            <span className="dropdown-title">Secteur ▾</span>
            <ul className="dropdown-menu">
              <li><Link to="/secteur/Boutique">Boutique</Link></li>
              <li><Link to="/secteur/Tourisme">Tourisme</Link></li>
            </ul>
          </li>

          <li><Link to="/publication">PUB</Link></li>
         
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
