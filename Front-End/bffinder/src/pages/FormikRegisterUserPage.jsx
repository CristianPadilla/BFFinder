import React from "react";
import "../styles/login.scss";

export function FormikRegisterUserPage() {
  return (
    <>
      <form className="sign-up-form" id="sign-up-form">
        <h2 className="titulo">Registrarse</h2>

        <div className="input-field">
          <i className="fas fa-user" />
          <input type="text" placeholder="Nombre" value="" name="firstname" />
        </div>
        <div className="input-field">
          <i className="fas fa-user" />
          <input type="text" placeholder="Apellido" value="" name="lastname" />
        </div>
        <div className="input-field">
          <i className="fas fa-user" />
          <input type="number" placeholder="Telefono" value="" name="phone" />
        </div>
        <div className="input-field">
          <i className="fas fa-envelope" />
          <input
            type="email"
            placeholder="ejemplo@mail.com"
            value=""
            name="email"
          />
        </div>
        <div className="input-field">
          <i className="fas fa-lock" />
          <input
            type="password"
            placeholder="Crea contraseña"
            value=""
            name="password"
          />
        </div>

        <div>
          <label class="switch">
            <input type="checkbox" />
            <span class="slider round"></span>
          </label>
        </div>

        <input
          type="submit"
          id="sign-up-btn"
          value="Registrarse"
          className="btn"
          // onClick={registerUser}
        />

        <p className="social-text">O Registrate con Google</p>
        <div className="social-media">
          <button type="button" className="googlebutton">
            Registrarse con Google
          </button>
        </div>
      </form>
    </>
  );
}
