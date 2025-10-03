// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Site vitrine
import Home from "./Page/Home";
import Tourisme from "./Page/Tourisme";
import Navbar from "./NavBar/Navbar";
import Footer from "./NavBar/Footer";
import Publication from "./Page/Publication";
import Boutique from "./Page/Boutique";
import ContactModal from "./Page/ContactModal";
import Background from "./components/Background";

// Admin
import Acceuil from "./Admin/Acceuil";
import Menu from "./Admin/Menu";
import Produit from "./Admin/Produit";
import Test from "./Admin/Test";

import "./Styles/style.css";

import { SearchProvider } from "./context/SearchContext";

function App() {
  return (
    <div className="app-container">
     
        <Router>
          <Routes>
            {/* Routes Site Vitrine */}
            <Route
              path="/*"
              element={
                <>
                  <Navbar />
                   <SearchProvider>
                  <Background />
                  <main className="main-content">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/secteur/tourisme" element={<Tourisme />} />
                      <Route path="/secteur/boutique" element={<Boutique />} />
                      <Route path="/publication" element={<Publication />} />
                    </Routes>
                  </main>
                  <ContactModal />
                  </SearchProvider>
                  <Footer />
                </>
              }
            />

            {/* Routes Admin */}
            <Route path="/admin/*" element={<Menu />}>
              <Route index element={<Acceuil />} />
              <Route path="produit" element={<Produit />} />
              <Route path="test" element={<Test />} />
            </Route>
          </Routes>
        </Router>
      
    </div>
  );
}

export default App;
