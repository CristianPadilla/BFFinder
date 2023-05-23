import React, { useEffect, useState } from "react";
import "styles/login.scss";
//import { Button } from "@mui/material";
import imglog from "imgs/login_cat.svg";
import imgreg from "imgs/register_dog.svg";
//import axios from 'axios';

const API = "";

const Login = () => {
  
  /*const [log, setLog] = useState([]);
  
  const handleClick = () => {
    setLog('Si envia');
  }*/

  /*useEffect(async () => {
    const response = await axios(API);
    setLog(response.data);
  }, [])*/

  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUpMode(true);
  };

  const handleSignInClick = () => {
    setIsSignUpMode(false);
  };

  useEffect(() => {
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");

    sign_up_btn.addEventListener("click", handleSignUpClick);
    sign_in_btn.addEventListener("click", handleSignInClick);

    return () => {
      sign_up_btn.removeEventListener("click", handleSignUpClick);
      sign_in_btn.removeEventListener("click", handleSignInClick);
    };
  }, []);

  return (
    <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
        <div className="forms-container">
          <div className="signin-signup">
            <form action="#" className="sign-in-form">
              <h2 className="titulo">Iniciar Sesión</h2>

              <div className="input-field">
                <i className="fas fa-user" />
                <input type="text" placeholder="ejemplo@mail.com" />
              </div>

              <div className="input-field">
                <i className="fas fa-lock" />
                <input type="password" placeholder="******" />
              </div>

              <input
                id="sign-in-btn"
                type="submit"
                value="Iniciar Sesión"
                className="btn"
              />

              <p className="social-text">O Ingresa con Google</p>

              <div className="social-media">
                <button type="button" className="googlebutton">
                  Iniciar sesión con Google
                </button>
              </div>
            </form>

            <form action="#" className="sign-up-form" id="sign-up-form">
              <h2 className="titulo">Registrarse</h2>

              <div className="input-field">
                <i className="fas fa-user" />
                <input type="text" placeholder="Username" />
              </div>

              <div className="input-field">
                <i className="fas fa-envelope" />
                <input type="email" placeholder="ejemplo@mail.com" />
              </div>

              <div className="input-field">
                <i className="fas fa-lock" />
                <input type="password" placeholder="Crea contraseña" />
              </div>

              <input type="submit" id="sign-up-btn" value="Registrarse" className="btn" />

              <p className="social-text">O Registrate con Google</p>

              <div className="social-media">
                <button type="button" className="googlebutton">
                  Registrarse con Google
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3> No tienes una cuenta?</h3>
              <p>
                Cree una nueva cuenta, para ingresar a BFFinder y adoptar a los
                peluditos que requieren un hogar 🐾.
              </p>
              <button className="btn transparent" id="sign-up-btn" onClick={handleSignUpClick}>
                Registrate
              </button>
            </div>
            <img src={imglog} className="image" alt="imglog" />
          </div>

          <div className="panel right-panel">
            <div className="content">
              <h3>Ya tienes una cuenta?</h3>
              <p>Ingresa para ir al login.</p>
              <button className="btn transparent" id="sign-in-btn" onClick={handleSignInClick}>
                Logueate
              </button>
            </div>
            <img src={imgreg} className="image" alt="imgreg" />
          </div>
        </div>
    </div>
  );
};

export default Login;
