import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextInputComponent } from "../Components/form/TextInputComponent";
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
  const { status, errorMessage } = useSelector(state => state.persisted.auth);
  const isCheckingAuth = useMemo(() => status === 'checking', [status]);

  const [error, setError] = useState(null);


  // useEffect(() => {
  //   console.log("usefect  from sign in", status);
  //   if (status === 'authenticated') {
  //     // setOpenConfirmationAlert(true);
  //     setTimeout(() => {
  //       // setOpenConfirmationAlert(false);
  //       navigate("/home");
  //     }, 2000);
  //   }
  // }, [status]);

  const onGoogleSignIn = () => {
    console.log("Google Sign In");
    // dispatch(startGoogleSignIn())
  };

  const handleLogin = async ({ email, password }) => {
    console.log("handleLogin=== CCCCCCCCCCCCCCCs", email);
    dispatch(startLogin({ email, password }));
  };

  return (
    <>
      <Formik
        initialValues={formFields}
        onSubmit={handleLogin}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Correo electrónico no válido")
            .required("El correo electrónico es obligatorio"),
          password: Yup.string()
            .min(4, "La contraseña debe tener al menos 4 caracteres")
            .max(15, "La contraseña debe tener 15 caracteres o menos")
            .required("Ingrese su contraseña"),
        })}
      >
        {(formik) => (
          <Form className="sign-in-form animate__animated animate__fadeIn ">
            <h2 className="titulo">Iniciar Sesión</h2>
            {error && <div className="error-message">{error}</div>}
            <TextInputComponent
              type="text"
              label="Correo Electrónico"
              name="email"
              placeholder="ejemplo@mail.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              sx={{ width: "27ch" }} 
            />
            <TextInputPassword
              label="Contraseña"
              name="password"
              placeholder="Escribe tu contraseña"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
            <Grid sx={{ mt: 4 }} >
              <Grid item xs={12} sm={6}>
                <button disabled={isCheckingAuth} id="sign-in-btn" type="submit" className="btn">
                  Iniciar Sesión
                </button>
              </Grid>
            </Grid>
            <p className="social-text">O</p>
            <div className="social-media">
              <button disabled={isCheckingAuth} type="button" className="googlebutton" onClick={onGoogleSignIn}>
                Iniciar sesión con Google
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
