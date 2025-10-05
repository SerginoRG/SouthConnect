// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Site vitrine
import Home from "./Site_Vitrine/Page/Home";
import Tourisme from "./Site_Vitrine/Page/Tourisme";
import Vitrinemenu from "./Site_Vitrine/NavBar/Vitrinemenu";
import Footer from "./Site_Vitrine/NavBar/Footer";
import Publication from "./Site_Vitrine/Page/Publication";
import Boutique from "./Site_Vitrine/Page/Boutique";
import ContactModal from "./Site_Vitrine/Page/ContactModal";
import Background from "./Site_Vitrine/Components/Background";

// Site Client
import Acceuil from "./Site_Client/Client/Acceuil";
import Menu from "./Site_Client/ClientMenu/Menu";
import Produit from "./Site_Client/Client/Produit";
import Test from "./Site_Client/Client/Test";


// Site Admin
import Login from "./Site_Admin/Login/Login";


import "./Styles/style.css";

import { SearchProvider } from "./Site_Vitrine/Context/SearchContext";

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
                  <Vitrinemenu />
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
            {/* Routes Client */}
       
         
           <Route path="/client/*" element={<Menu />}>
              <Route index element={< Acceuil/>} />
              <Route path="produit" element={< Produit/>} />
              <Route path="test" element={<Test />} />
            </Route>
          
          <Route path="/login/*" >
          <Route index element={<Login/>} />
          </Route>

          </Routes>
        </Router>
      
    </div>
  );
}

export default App;
