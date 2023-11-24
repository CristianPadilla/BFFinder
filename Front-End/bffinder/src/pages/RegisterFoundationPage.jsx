import React, { useState } from "react";
import { TextInputComponent } from "../Components/TextInputComponent";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import "../styles/Card.scss";
import { CheckboxInputComponent } from "../Components/CheckboxInputComponent";
import TextInputPassword from "../Components/form/TextInputPassword";
import { Snackbar, Alert } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";

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
  const [reloadPage, setReloadPage] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);

    if (reloadPage) {
      window.location.reload();
    }
  };

  const handleRegistration = async (values, { setSubmitting, setErrors }) => {
    try {
      console.log("Submitting values:", values);
      const response = await axios.post(
        "http://localhost:9090/auth/register/shelter",
        {
          name: values.name,
          email: values.email,
          nit: values.nit,
          commercial_registration_number:
          values.commercial_registration_number !== ""
          ? values.commercial_registration_number
          : null,
          password: values.password,
        }
      );

      console.log("Response:", response.data);
      setOpen(true);
      setReloadPage(true);

    } catch (error) {
      console.error("Error:", error);
      setErrors({
        general: "Hubo un error en el registro. Inténtalo de nuevo.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%", backgroundColor: "#FFCF9F" }}
          icon={
            <CheckCircleIcon
              fontSize="inherit"
              style={{ color: "white" }}
            />
          }
        >
          Usuario Fundación creado exitosamente.
        </Alert>
      </Snackbar>
      <Formik
        initialValues={formFields}
        onSubmit={handleRegistration}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(3, "El nombre debe tener al menos 3 caracteres")
            .max(20, "El nombre debe tener 20 caracteres o menos")
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
            .required("La contraseña es obligatoria"),
          password2: Yup.string()
            .oneOf(
              [Yup.ref("password"), null],
              "Las contraseñas deben coincidir"
            )
            .required("Por favor confirma tu contraseña"),
          nit: Yup.string()
          .required("El nit es obligatorio")
          .matches(/^\d{9}$/, "El número debe tener exactamente 9 dígitos"),
          commercial_registration_number: Yup.string()
          .matches(/^\d{11}$/, "El número debe tener exactamente 11 dígitos"),
          terms: Yup.boolean().oneOf(
            [true],
            "Debes aceptar los términos y condiciones"
          ),
        })}
      >
        {(formik) => (
          <div className="register-form-container">
            <Form className="sign-up-form register-form" id="sign-up-form">
              {formik.errors.general && (
                <div className="error-message">{formik.errors.general}</div>
              )}
              {console.log(formik.values)}
              <TextInputComponent
                required
                type="text"
                label="Nombre de la organización"
                name="name"
                placeholder="Fundacion animalitos del mundo"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              <TextInputComponent
                required
                type="number"
                label="No. de Identificación Tributaria (Nit)"
                name="nit"
                placeholder="123456789"
                value={formik.values.nit}
                onChange={formik.handleChange}
              />
              <TextInputComponent
                type="number"
                label="No. de Matrícula Mercantil (Cámara de Comercio)"
                name="commercial_registration_number"
                placeholder="12345678900"
                value={formik.values.commercial_registration_number  || ""}
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
              <TextInputPassword
                  required
                  label="Confirma la contraseña"
                  name="password2"
                  placeholder="Escribe tu contraseña"
                  value={formik.values.password2}
                  onChange={formik.handleChange}
                  // helperText="Some important text"
                />
              <CheckboxInputComponent
                required
                label="Términos y condiciones"
                name="terms"
                className="slider round"
                labelClassName="switch"
                spanClassName="slider round"
              />
              <button type="submit" className="btn">
                Registrarse
              </button>
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
