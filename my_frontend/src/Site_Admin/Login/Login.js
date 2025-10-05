import React from 'react';
import "../../Styles/Login.css";

function Login() {
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
          <h2>Connexion</h2>
          <form id="loginForm">
            <div className="login-input-group">
              <label htmlFor="username">Nom d'utilisateur ou adresse Email</label>
              <input 
                type="text" 
                id="username" 
                placeholder="Entrer votre nom d'utilisateur ou adresse Email" 
                required 
              />
              <p id="errorUsername" className="login-error-msg"></p>
            </div>
            <div className="login-input-group">
              <label htmlFor="password">Mot de passe</label>
              <input 
                type="password" 
                id="password" 
                placeholder="Entrer votre mot de passe" 
                required 
              />
              <p id="errorPassword" className="login-error-msg"></p>
            </div>
            <button type="submit" className="login-submit-btn">Se connecter</button>
          </form>
        </div>
      </div>
    </div>
  );
}


export default Login;