import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextInputComponent } from "../Components/TextInputComponent";
import TextInputPassword from "../Components/form/TextInputPassword";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const formFields = {
    email: "",
    password: "",
  };

export default function SignIn() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [error, setError] = useState(null);

  //login
  const handleLogin = async (values) => {
    if (!values.email || !values.password) {
      console.log("Correo ", values.email);
      console.log("pass ", values.password);
      setError("Ambos campos son obligatorios.");
      return; // Sale de la función para evitar la solicitud si hay campos vacíos
    }

    console.log("Email:", values.email);
    console.log("Password:", values.password);

    console.log("Enviando solicitud de inicio de sesión...");

    try {
      const response = await axios.post(
        "http://localhost:9090/auth/authenticate",
        {
          username: values.email,
          password: values.password,
        }
      );

      setToken(response.data.token);
      navigate("/home");
    } catch (error) {
      if (error.response) {
        setError("Error en el inicio de sesión. Verifica tus credenciales.");
        console.error(error.response.data); 
      } else {
        setError(
          "Se produjo un error al intentar iniciar sesión. Inténtalo de nuevo más tarde."
        );
        console.error(error);
      }
    }
  };

  return (
    <>
      <Formik
        initialValues={formFields}
        onSubmit={handleLogin}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Correo no válido")
            .required("El correo es obligatorio"),
          password: Yup.string()
            .min(4, "La contraseña debe tener al menos 4 caracteres") //COONSULTAAAAAA
            .max(15, "La contraseña debe tener 15 caracteres o menos")
            .required("La contraseña es obligatoria"),
        })}
      >
        {(formik) => (
          <Form className="sign-in-form">
            <h2 className="titulo">Iniciar Sesión</h2>
            {error && <div className="error-message">{error}</div>}
            <TextInputComponent
              required
              type="text"
              label="Correo Electronico"
              name="email"
              placeholder="ejemplo@mail.com"
              value={formik.values.email}
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

            <button id="sign-in-btn" type="submit" className="btn">
              Iniciar Sesión
            </button>

            <p className="social-text">O Ingresa con Google</p>

            <div className="social-media">
              <button type="button" className="googlebutton">
                Iniciar sesión con Google
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
