// src/Page/Tourisme.js
import React from "react";

function Tourisme() {
  const elements = [
    { icon: "fas fa-map-marked-alt", title: "Excursions", desc: "Découvrez des circuits uniques et guidés." },
    { icon: "fas fa-umbrella-beach", title: "Plages", desc: "Profitez de plages paradisiaques." },
    { icon: "fas fa-mountain", title: "Randonnées", desc: "Explorez nos montagnes et paysages naturels." },
    { icon: "fas fa-ship", title: "Croisières", desc: "Naviguez et vivez des expériences inoubliables." },
    { icon: "fas fa-binoculars", title: "Safaris", desc: "Partez à l’aventure et observez la faune locale." },
    { icon: "fas fa-landmark", title: "Patrimoine", desc: "Visitez nos sites culturels et historiques." }
  ];

  return (
    <section className="content-section py-5">
      <div className="container">
        <h2 className="text-center mb-5">Secteur Tourisme</h2>
        <div className="row g-4">
          {elements.map((item, index) => (
            <div className="col-md-4" key={index}>
              <div className="feature-card text-center p-4 shadow-sm">
                <div className="feature-icon mb-3">
                  <i className={`${item.icon} fa-2x`}></i>
                </div>
                <h3 className="feature-title">{item.title}</h3>
                <p className="feature-description">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Tourisme;





 