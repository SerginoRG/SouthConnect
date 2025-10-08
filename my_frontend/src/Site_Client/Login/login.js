// src/Site_Client/Login/Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../Styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/client/login", {
    email,
    password,
});

      localStorage.setItem("client", JSON.stringify(response.data.client));

     

      navigate("/client/dashboard");
    } catch (error) {
      Swal.fire("Erreur", "Email ou mot de passe incorrect", "error");
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
          <form onSubmit={handleLogin}>
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
