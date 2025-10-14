import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Site vitrine
import Home from "./Site_Vitrine/Page/Home";
import Tourisme from "./Site_Vitrine/Page/Tourisme";
import Vitrinemenu from "./Site_Vitrine/NavBar/Vitrinemenu";
import Footer from "./Site_Vitrine/NavBar/Footer";
import Publication from "./Site_Vitrine/Page/Publication";
import Boutique from "./Site_Vitrine/Page/Boutique";
import EspaceClient from "./Site_Vitrine/Page/EspaceClient";
import Background from "./Site_Vitrine/Components/Background";
import { SearchProvider } from "./Site_Vitrine/Context/SearchContext";

// Site Client
import LoginClient from "./Site_Client/Login/login";
import Acceuil from "./Site_Client/Client/Acceuil";
import Menu from "./Site_Client/ClientMenu/Menu";
import Produit from "./Site_Client/Client/Produit";
import Test from "./Site_Client/Client/Test";
import CarrouselClient from "./Site_Client/Client/Carousel";
import Services from "./Site_Client/Client/Services";

// Site Admin
import Login from "./Site_Admin/Login/Login";
import MenuAdmin from "./Site_Admin/MenuAdmin/Menu";
import AcceuilAdmin from "./Site_Admin/Page/Acceuil";
import Client from "./Site_Admin/Page/Client";
import FlashPubs from "./Site_Admin/Page/FlashPubs";


import "./Styles/style.css";


function App() {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          {/* ---------- SITE VITRINE ---------- */}
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
                 
                </SearchProvider>
                <Footer />
              </>
            }
          />

  
<Route path="/espace/:clientId/:produitId" element={<EspaceClient />} />


         {/* ---------- SITE CLIENT ---------- */}
          <Route path="/client" element={<LoginClient />} />

          <Route path="/client/dashboard/*" element={<Menu />}>
            <Route index element={<Acceuil />} />  
            <Route path="produit" element={<Produit />} /> 
            <Route path="test" element={<Test />} />    
           <Route path="carrouselclient/:id_produit" element={<CarrouselClient />} />
           <Route path="servicesclient/:id_produit" element={<Services />} />
          </Route>



          {/* ---------- SITE ADMIN ---------- */}
          {/* Page de connexion admin */}
          <Route path="/admin" element={<Login />} />

          {/* Menu et sous-pages admin */}
          <Route path="/admin/dashboard/*" element={<MenuAdmin />}>
            <Route index element={<AcceuilAdmin />} />
            <Route path="clients" element={<Client />} />
            <Route path="flashPubs" element={<FlashPubs />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
