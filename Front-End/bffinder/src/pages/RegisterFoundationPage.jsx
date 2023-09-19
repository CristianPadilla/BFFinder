import React from "react";
import { TextInputComponent } from "../Components/TextInputComponent";
export function RegisterFoundationPage() {
  return (
    <>
      <form className="sign-up-form" id="sign-up-form">
        <h2 className="titulo">Registrarse</h2>

        <div className="input-field">
          <i className="fas fa-user" />
          <input type="text" placeholder="Nombre" value="" name="firstname" />
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

        {/* <TextInputComponent
              type="date"
              label="Fecha de nacimiento"
              name="date"
              className="form-datepicker"
              value={dat}
              onChange={onInputChange}  
            /> */}

        {/* <TextInputComponent
          type="text"
          label="Información adicional de domicilio"
          name="address_additional"
          placeholder="Piso 3, apartamento 2"
        />

        <TextInputComponent
          type="text"
          label="Barrio/Localidad"
          name="neighborhood"
          placeholder="San Francisco"
        /> */}

        <input
          type="submit"
          id="sign-up-btn"
          value="Registrarse"
          className="btn"
          // onClick={registerUser}
        />
      </form>
    </>
  );
}
