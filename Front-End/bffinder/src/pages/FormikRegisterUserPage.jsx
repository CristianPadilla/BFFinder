import React from "react";
import "../styles/login.scss";
import { useFormik } from "formik";

export function FormikRegisterUserPage() {
  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      email2: "",
      department: "",
      city: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <>
      <form
      onSubmit={handleSubmit}
        className="sign-up-form  animate__animated animate__backInLeft"
        id="sign-up-form"
      >
        {/* <h2 className="titulo">Registrarse</h2> */}

        <div className="input-field">
          <i className="fas fa-user" />
          <input
            type="text"
            placeholder="Nombre"
            value={values.firstname}
            name="firstname"
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <i className="fas fa-user" />
          <input
            type="text"
            placeholder="Apellido"
            name="lastname"
            value={values.lastname}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <i className="fas fa-user" />
          <input
            type="number"
            placeholder="Telefono"
            name="phone"
            value={values.phone}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <i className="fas fa-envelope" />
          <input
            type="email"
            placeholder="ejemplo@mail.com"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <i className="fas fa-envelope" />
          <input
            type="email"
            placeholder="confirma tu correo"
            name="email2"
            value={values.email2}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <i className="fas fa-envelope" />

          <select
            value={values.department}
            onChange={handleChange}
            name="department"
            class="form-select form-select-lg mb-3"
            // aria-label="Large select example"
          >
            <option selected>Departamento de residencia</option>
            <option value="1">Valle del cauca</option>
            <option value="3">Antioquia</option>
            <option value="2">Cundinamarca</option>
          </select>
        </div>
        <div className="input-field">
          <i className="fas fa-envelope" />

          <select
            name="city"
            class="form-select form-select-lg mb-3"
            value={values.city} onChange={handleChange}
            // aria-label="Large select example"
          >
            <option selected>Municipio de residencia</option>
            <option value="1">Cali</option>
            <option value="3">Jamundí</option>
            <option value="2">Palmira</option>
          </select>
        </div>
        <div className="input-field">
          <i className="fas fa-envelope" />
          <input
            class="form-datepicker"
            type="date"
            placeholder="Fecha de nacimiento"
            value={values.date} onChange={handleChange}
            name="date"
          />
        </div>

        <div className="input-field">
          <i className="fas fa-lock" />
          <input
            type="password"
            placeholder="Contraseña"
            value={values.password} onChange={handleChange}
            name="password"
          />
        </div>
        
        <div className="input-field">
          <i className="fas fa-lock" />
          <input
            type="password"
            placeholder="Comfirma tu contraseña"
            value={values.password2} onChange={handleChange}
            name="password2"
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
