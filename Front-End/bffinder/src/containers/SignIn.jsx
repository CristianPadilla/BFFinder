import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextInputComponent } from "../Components/TextInputComponent";
import TextInputPassword from "../Components/form/TextInputPassword";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { checkingAuthentication, startGoogleSignIn, startLogin } from "../store/auth";
import { start } from "@popperjs/core";
import { Alert, Grid } from "@mui/material";

const formFields = {
  email: "",
  password: "",
};

export default function SignIn() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, errorMessage } = useSelector(state => state.auth);
  const isCheckingAuth = useMemo(() => status === 'checking', [status]);


  const [token, setToken] = useState("");
  const [error, setError] = useState(null);


  useEffect(() => {
    if (status === 'authenticated') {
      setOpenConfirmationAlert(true);
      setTimeout(() => {
        setOpenConfirmationAlert(false);
        navigate("/home");
      }, 2000);
    }
  }, [status]);

  const onGoogleSignIn = () => {
    console.log("Google Sign In");

    dispatch(startGoogleSignIn())
  };

  const handleLogin = async ({ email, password }) => {
    dispatch(startLogin({ email, password }));

    // if (!values.email || !values.password) {
    //   setError("Ambos campos son obligatorios.");
    //   return; // Sale de la función para evitar la solicitud si hay campos vacíos
    // }
    // // try {
    // const response = await axios.post(
    //   "http://localhost:9090/auth/authenticate",
    //   {
    //     username: values.email,
    //     password: values.password,
    //   }
    // );

    // setToken(response.data.token);
    // navigate("/selecciona-especie");
    // } catch (error) {
    //   if (error.response) {
    //     setError("Error en el inicio de sesión. Verifica tus credenciales.");
    //   } else {
    //     setError(
    //       "Se produjo un error al intentar iniciar sesión. Inténtalo de nuevo más tarde."
    //     );
    //   }
    // }
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
            .min(4, "La contraseña debe tener al menos 4 caracteres")
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
            <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
            <Grid container spacing={2} sx={{ mb: 2, mt: 1 }} justifyContent={"center"}>
              <Grid item xs={12} sm={6}>
                <button id="sign-in-btn" type="submit" className="btn">
                  Iniciar Sesión
                </button>
              </Grid>
            </Grid>
            <p className="social-text">O</p>
            <div className="social-media">
              <button type="button" className="googlebutton" onClick={onGoogleSignIn}>
                Iniciar sesión con Google
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
