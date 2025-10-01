import React from "react";

function Footer() {
  return (
    <footer className="py-4 text-center bg-dark text-light mt-5">
      <div className="container">
        <div className="mb-3">
          <a href="https://example.com"><i className="fab fa-facebook fa-lg me-3 text-light"></i></a>
          <a href="https://example.com"><i className="fab fa-twitter fa-lg me-3 text-light"></i></a>
          <a href="https://example.com"><i className="fab fa-instagram fa-lg me-3 text-light"></i></a>
        </div>
        <p className="mb-0">&copy; 2025 MonSite. Tous droits réservés.</p>
      </div>
    </footer>
  );
}

export default Footer;
