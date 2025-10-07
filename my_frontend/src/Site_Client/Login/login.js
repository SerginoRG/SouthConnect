// scr/Site_Client/Login/Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../Styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setErrorMsg("");

  try {
    const response = await axios.post("http://127.0.0.1:8000/api/client/login", {
      email,
      password,
    });

    // Stocker les infos client dans le localStorage
    localStorage.setItem("client", JSON.stringify(response.data.client));

    console.log("Client connecté :", response.data.client);
    navigate("/client/dashboard");
  } catch (error) {
    if (error.response && error.response.data.error) {
      setErrorMsg(error.response.data.error);
    } else {
      setErrorMsg("Une erreur est survenue. Veuillez réessayer.");
    }
  }
};


  return (
    <div className="login-page">
      <div className="login-wrapper">
        <div className="login-logo">
          <img
            src="/images/Logo/logo.png"
            alt="SouthConnect Logo"
            height="40"
            style={{ borderRadius: "50%" }}
          />
        </div>

        <div className="login-container">
          <h2>Connexion Client</h2>
          <form onSubmit={handleSubmit}>
            <div className="login-input-group">
              <label>Adresse Email</label>
              <input
                type="email"
                placeholder="Entrer votre adresse Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="login-input-group">
              <label>Mot de passe</label>
              <input
                type="password"
                placeholder="Entrer votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Message d’erreur affiché sous le formulaire */}
            {errorMsg && <p className="login-error-msg">{errorMsg}</p>}

            <button type="submit" className="login-submit-btn">
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
