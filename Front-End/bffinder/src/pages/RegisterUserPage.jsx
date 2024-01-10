import React, { useEffect, useMemo, useState } from "react";
import "../styles/login.scss";
import "../styles/Card.scss";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextInputComponent } from "../Components/form/TextInputComponent";
import { SelectInputComponent } from "../Components/form/SelectInputComponent";
import { CheckboxInputComponent } from "../Components/form/CheckboxInputComponent";
import TextInputPassword from "../Components/form/TextInputPassword";
import { Snackbar, Alert, Grid } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";
import { authApi } from "../api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { startRegisterUser } from "../store/auth";
import { Redirect, useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";

const formFields = {
  firstname: "",
  lastname: "",
  date: "",
  email: "",
  email2: "",
  password: "",
  password2: "",
  phone: "",
  terms: false,
};

export function RegisterUserPage() {

  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector(state => state.persisted.auth);
  const isCheckingAuth = useMemo(() => status === 'checking', [status]);
  const [openConfirmationAlert, setOpenConfirmationAlert] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    if (status === 'authenticated') {
      setOpenConfirmationAlert(true);
      setTimeout(() => {
        setOpenConfirmationAlert(false);
        navigate("/home");
      }, 2000);
    }
  }, [status]);

  const handleRegistration = (values) => {
    console.log("from componenttt ", values);

    const user = {
      firstname: values.firstname,
      lastname: values.lastname,
      phone: values.phone.trim() !== "" ? values.phone : null,
      email: values.email,
      password: values.password,
      type: 'u',
    }
    console.log("user from componenttt ", user);
    dispatch(startRegisterUser(user))
  };

  return (
    <>
      <Snackbar open={openConfirmationAlert} autoHideDuration={2000}
      >
        <Alert
          severity="success"
          sx={{ width: "100%", backgroundColor: "#4CAF50", color: "#fff" }}
          icon={
            <CheckCircleIcon
              fontSize="inherit"
              style={{ color: "white" }}
            />
          }
        >
          Usuario creado exitosamente.
        </Alert>
      </Snackbar>
      <Formik
        initialValues={formFields}
        onSubmit={handleRegistration}
        validationSchema={Yup.object({
          firstname: Yup.string()
            .min(3, "El nombre debe tener al menos 3 caracteres")
            .max(15, "El nombre debe tener 15 caracteres o menos")
            .required("El nombre es obligatorio"),
          lastname: Yup.string()
            .min(3, "El apellido debe tener al menos 3 caracteres")
            .max(15, "El apellido debe tener 15 caracteres o menos")
            .required("El apellido es obligatorio"),
          phone: Yup.string()
            .nullable()
            .required("El número de telefono es obligatorio")
            .test(
              "len",
              "El número telefono debe tener 10 caracteres",
              (val) => !val || val.length === 10
            ),
          email: Yup.string()
            .email("Correo no válido")
            .required("El correo es obligatorio"),
          email2: Yup.string()
            .email("El email no es valido")
            .oneOf([Yup.ref("email"), null], "Los correos no coinciden")
            .required("El email es obligatorio"),

          password: Yup.string()
            .min(8, "La contraseña debe tener al menos 8 caracteres")
            .max(15, "La contraseña debe tener 15 caracteres o menos")
            .required("La contraseña es obligatoria"),
          password2: Yup.string()
            .oneOf(
              [Yup.ref("password"), null],
              "Las contraseñas deben coincidir"
            )
            .required("La confirmacion de contraseña es obligatoria"),
          terms: Yup.boolean().oneOf(
            [true],
            "Debes aceptar los terminos y condiciones"
          ),
        })}
      >
        {(formik) => (
          <div className="register-form-container">
            <Form className="sign-up-form register-form animate__animated animate__fadeIn" id="sign-up-form">
              <div className="form-container">
                <TextInputComponent
                  type="text"
                  label="Nombres"
                  name="firstname"
                  placeholder="Pedro"
                  value={formik.values.firstname}
                  onChange={formik.handleChange}
                  sx={{ width: "27ch" }}
                />
                <TextInputComponent
                  type="text"
                  label="Apellido"
                  name="lastname"
                  placeholder="Pérez"
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                  sx={{ width: "27ch" }}
                />
                <TextInputComponent
                  type="email"
                  label="Correo electrónico"
                  name="email"
                  placeholder="ejemplo@mail.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  sx={{ width: "27ch" }}
                />
                <TextInputComponent
                  type="email"
                  label="Confirma tu correo"
                  name="email2"
                  placeholder="repite tu correo electrónico"
                  value={formik.values.email2}
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
                <TextInputPassword
                  label="Confirma la contraseña"
                  name="password2"
                  placeholder="Escribe tu contraseña"
                  value={formik.values.password2}
                  onChange={formik.handleChange}
                />
                <TextInputComponent
                  type="number"
                  label="Número de telefono"
                  name="phone"
                  placeholder="322000550"
                  value={formik.values.phone || ""}
                  onChange={formik.handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ width: "27ch" }}
                />
                <CheckboxInputComponent
                  label="Términos y condiciones"
                  name="terms"
                  className="slider round"
                  labelClassName="switch"
                  onChange={formik.handleChange}
                  spanClassName="slider round"
                />
                <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
                  <Alert severity="error">{errorMessage}</Alert>
                </Grid>
                <button disabled={isCheckingAuth} id="sign-up-btn" type="submit" className="btn">
                  Registrarse
                </button>
                <p className="social-text">O</p>
                <div className="social-media">
                  <button type="button" className="googlebutton">
                    Registrarse con Google
                  </button>
                </div>
                {formik.errors.general && (
                  <div className="error-message">{formik.errors.general}</div>
                )}{" "}
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
}
