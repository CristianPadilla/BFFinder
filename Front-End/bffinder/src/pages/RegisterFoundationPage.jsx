import React from "react";
import { TextInputComponent } from "../Components/TextInputComponent";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import "../styles/Card.scss";
import { SelectInputComponent } from "../Components/SelectInputComponent";
import { CheckboxInputComponent } from "../Components/CheckboxInputComponent";
import TextInputPassword from "../Components/form/TextInputPassword";

const formFields = {
  name: "", 
  email: "", 
  email2: "", 
  password: "", 
  password2: "", 
  nit: "",
  commercial_registration_number: "",
  terms: false, 
};

export function RegisterFoundationPage() {
  return (
    <>
      <Formik
        initialValues={formFields}
        onSubmit={(values) => {
          // logica para registrarse
          console.log(values);
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(3, "El nombre debe tener al menos 3 caracteres")
            .max(15, "El nombre debe tener 15 caracteres o menos")
            .required("El nombre es obligatorio"),
          email: Yup.string()
            .email("Correo no válido")
            .required("El correo es obligatorio"),
          email2: Yup.string()
            .email("El correo no es valido")
            .oneOf([Yup.ref("email"), null], "Los correos no coinciden")
            .required("El correo es obligatorio"),
          password: Yup.string()
            .min(8, "La contraseña debe tener al menos 8 caracteres")
            .max(15, "La contraseña debe tener 15 caracteres o menos")
            .required("La contraseña es obligatorio"),
          password2: Yup.string()
            .oneOf(
              [Yup.ref("password"), null],
              "Las contraseñas deben coincidir"
            )
            .required("Por favor confirma tu contraseña"),
          nit: Yup.string()
            .min(9, "El número debe tener 9 caracteres"),
          commercial_registration_number: Yup.string()
            .min(11, "El número debe tener 11 caracteres"),
          terms: Yup.boolean().oneOf(
            [true],
            "Debes aceptar los terminos y condiciones"
          ),
        })}
      >
        {(formik) => (
          <div className="register-form-container">
          <Form className="sign-up-form register-form" id="sign-up-form">
            <TextInputComponent
              required
              type="text"
              label="Nombre de la organización"
              name="name"
              placeholder="Fundacion animalitos del mundo"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {/* <TextInputComponent
              type="text"
              label="Sitio web"
              name="webPageUrl"
              placeholder="mifundacion.com"
              value={formik.values.webPageUrl}
              onChange={formik.handleChange}
            /> */}
            <TextInputComponent
              required
              type="number"
              label="Numero de Identificación Tributaria (Nit)"
              name="nit"
              placeholder="123456789"
              value={formik.values.nit}
              onChange={formik.handleChange}
            />
            <TextInputComponent
              type="number"
              label="Número de Matrícula Mercantil (Cámara de Comercio)"
              name="commercial_registration_number"
              placeholder="12345678900"
              value={formik.values.commercial_registration_number}
              onChange={formik.handleChange}
            />
            <TextInputComponent
              required
              type="email"
              label="Correo electrónico"
              name="email"
              placeholder="ejemplo@email.com"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <TextInputComponent
              required
              type="email"
              label="Confirma tu correo"
              name="email2"
              placeholder="repite tu correo electrónico"
              value={formik.values.email2}
              onChange={formik.handleChange}
            />
            <TextInputPassword
              required
              label="Contraseña"
              name="password"
              placeholder="Escribe tu contraseña"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <CheckboxInputComponent
              required
              label="Términos y condiciones"
              name="terms"
              className="slider round"
              labelClassName="switch"
              spanClassName="slider round"
            />
            <input
              type="submit"
              id="sign-up-btn"
              value="Registrarse"
              className="btn"
            />
            <p className="social-text">O</p>
            <div className="social-media">
              <button type="button" className="googlebutton">
                Registrarse con Google
              </button>
            </div>
          </Form>
          </div>
        )}
      </Formik>
    </>
  );
}
