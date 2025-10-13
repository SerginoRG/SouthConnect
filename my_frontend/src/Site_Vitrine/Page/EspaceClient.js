import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../Styles/Espace.css";

export default function EspaceClient() {
  const { clientId, produitId } = useParams(); // récupère client et produit
  const [bgIndex, setBgIndex] = useState(0);
  const [carousels, setCarousels] = useState([]);
  const [produit, setProduit] = useState(null); // ✅ stocker le produit

  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    message: "",
  });

  const services = [ 
    { id: 1, image: "/images/Espase/espace_1.jpeg", description: "Dégustez une grande variété de thés du monde entier." }, 
    { id: 2, image: "/images/Espase/espace_6.jpeg", description: "Savourez nos pâtisseries artisanales faites maison." },
    { id: 3, image: "/images/Espase/espace_3.jpeg", description: "Profitez d’un moment de détente sur notre terrasse verdoyante." }, 
    { id: 4, image: "/images/Espase/espace_4.jpeg", description: "Service de livraison rapide pour vos commandes de thés et douceurs." }, 
    { id: 5, image: "/images/Espase/espace_5.jpeg", description: "Organisation d’événements privés et dégustations thématiques." }, 
    { id: 6, image: "/images/Espase/espace_2.jpeg", description: "Espace calme et Wi-Fi gratuit pour travailler ou se détendre." }, 
  ];

  // Charger les carousels pour ce client et produit
  useEffect(() => {
    if (clientId) {
      axios
        .get(`http://127.0.0.1:8000/api/carousels?client_id=${clientId}&produit_id=${produitId}`)
        .then((res) => setCarousels(res.data))
        .catch((err) => console.error(err));
    }
  }, [clientId, produitId]);

  // Charger le produit pour récupérer le titre
 useEffect(() => {
  if (produitId) {
    axios
      .get(`http://127.0.0.1:8000/api/produits/${produitId}`)
      .then((res) => {
        console.log("Produit récupéré :", res.data); // ✅ debug
        setProduit(res.data);
      })
      .catch((err) => console.error(err));
  }
}, [produitId]);


  // Carrousel automatique
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) =>
        carousels.length > 0 ? (prevIndex + 1) % carousels.length : 0
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [carousels]);

  const handlePrevious = () => {
    setBgIndex((prevIndex) =>
      carousels.length > 0
        ? prevIndex === 0
          ? carousels.length - 1
          : prevIndex - 1
        : 0
    );
  };

  const handleNext = () => {
    setBgIndex((prevIndex) =>
      carousels.length > 0 ? (prevIndex + 1) % carousels.length : 0
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Merci pour votre message ! Nous vous répondrons rapidement.");
    setFormData({ nom: "", email: "", telephone: "", message: "" });
  };

  return (
    <>
      {/* --- Section Carrousel --- */}
      <section
        className="hero-section-client"
        style={{
          background: carousels.length > 0
            ? `url(http://127.0.0.1:8000/storage/${carousels[bgIndex].image_carousel}) no-repeat center center/cover`
            : `url(/images/FlashPubs/raiky_1.jpg) no-repeat center center/cover`,
        }}
      >
        <nav className="top-nav-client">
          <ul>
            <li><a href="#services">Nos Services</a></li>
            <li><a href="#contact">Contactez-nous</a></li>
          </ul>
        </nav>

        <button className="hero-btn-client hero-btn-left-client" onClick={handlePrevious}>
          &lt;
        </button>
        <button className="hero-btn-client hero-btn-right-client" onClick={handleNext}>
          &gt;
        </button>

        <div className="container-client">
          <div className="hero-content-client text-center">
            <h1 className="hero-title-client">
              {carousels.length > 0
                ? carousels[bgIndex].titre_carousel
                : `Bienvenue sur l’espace du client #${clientId}`}
            </h1>
            <p className="hero-subtitle-client">
              {carousels.length > 0
                ? carousels[bgIndex].description_carousel
                : "Découvrez nos services et plus encore"}
            </p>
          </div>
        </div>
      </section>

      {/* --- Section Nos Services dynamiques --- */} 
      <section id="services" className="services-section">
        <div className="services-header">
          <h2>Nos services</h2>
          <p>
  {produit
    ? `Découvrez les services proposés pour le produit "${produit.title || produit.nom_produit}".`
    : "Chargement du produit..."}
</p>

        </div>
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <img src={service.image} alt={`service ${service.id}`} />
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </section>


      {/* --- Section Contact --- */}
       <footer id="contact" className="footer-section"> 
        <h2>Contactez-nous</h2> 
        <form onSubmit={handleSubmit} className="contact-form"> 
          <div className="form-group">
             <input type="text" name="nom" placeholder="Votre nom" value={formData.nom} onChange={handleChange} required /> </div> <div className="form-group"> 
            <input type="email" name="email" placeholder="Votre email" value={formData.email} onChange={handleChange} required /> </div> <div className="form-group"> <input type="tel" name="telephone" placeholder="Votre téléphone" value={formData.telephone} onChange={handleChange} /> </div> <div className="form-group"> <textarea name="message" placeholder="Votre message" rows="4" value={formData.message} onChange={handleChange} required > </textarea> </div> <button type="submit" className="contact-btn">Envoyer</button> </form> <p className="footer-note">© 2025 OUSI - Tous droits réservés.</p> </footer>
    </>
  );
}
