import React, { useEffect, useMemo, useState } from "react";
import { TextInputComponent } from "../Components/form/TextInputComponent";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import "../styles/Card.scss";
// import SwitchInputComponent from "../Components/form/SwitchInputComponent";
import TextInputPassword from "../Components/form/TextInputPassword";
import { Snackbar, Alert, Grid } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { startRegisterUser } from "../store/auth";
import SwitchInputComponent from "../Components/form/SwitchInputComponent";
import SelectComponent from "../Components/form/SelectComponent";
import SelectInputComponent from "../Components/form/SelectInputComponent";
import { startCleanCities, startGetCitiesByDepartmentId, startGetDepartments } from "../store/post";

const formFields = {
  name: "",
  email: "",
  email2: "",
  password: "",
  password2: "",
  department: { label: "", value: null },
  city: { label: "", value: null },
  address: "",
  nit: "",
  commercial_registration_number: "",
  terms: false,
};

export function RegisterFoundationPage() {
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector(state => state.persisted.auth);
  const isCheckingAuth = useMemo(() => status === 'checking', [status]);
  const [openConfirmationAlert, setOpenConfirmationAlert] = useState(false);
  const { departments, cities } = useSelector((state) => state.posts);
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

  useEffect(() => {
    if (!departments || departments.length === 0) dispatch(startGetDepartments());
  }, []);


  // DEPARTAMENTOS y CIUDADES
  const departmentsOptions = departments.map((department) => {
    return { label: department.name, value: department.id };
  });
  departmentsOptions.sort((a, b) => a.label.localeCompare(b.label));

  const citiesOptions = cities.map((city) => {
    return { label: city.name, value: city.id };
  });
  citiesOptions.sort((a, b) => a.label.localeCompare(b.label));

  const handleDepartmentSelectChange = (departmentId) => {
    // console.log("handleDepartmentSelectChange==  : ", departmentId);
    if (!departmentId) {
      dispatch(startCleanCities());
      return;
    }
    dispatch(startGetCitiesByDepartmentId(departmentId));
  };





  const handleRegistration = async (values) => {
    console.log("valuesssssssssss ", values);
    const user = {
      name: values.name,
      email: values.email,
      password: values.password,
      nit: values.nit,
      address: values.address,
      city: values.city.value,
      department: values.department.value,
      commercial_registration_number:
        values.commercial_registration_number !== ""
          ? values.commercial_registration_number
          : null,
      type: 's'
    }
    console.log("userrrr ", user);
    // dispatch(startRegisterUser(user))
  };


  return (
    <>
      <Snackbar open={openConfirmationAlert} autoHideDuration={2000} >
        <Alert
          // onClose={handleClose}
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
            // .min(3, "El nombre debe tener al menos 3 caracteres")
            // .max(20, "El nombre debe tener 20 caracteres o menos")
            .required("El nombre es obligatorio"),
          email: Yup.string()
            .email("Correo no válido")
            .required("El correo es obligatorio"),
          email2: Yup.string()
            .email("El correo no es valido")
            .oneOf([Yup.ref("email"), null], "Los correos no coinciden")
            .required("El correo es obligatorio"),
          department: Yup.object().shape({
            value: Yup.number().required("Selecciona un departamento"),
          }),
          city: Yup.object().shape({
            value: Yup.number().required("Selecciona una ciudad"),
          }),
          address: Yup.string()
            .min(5, "La direccion debe tener almenos 5 caracteres")
            .max(40, "La direccion debe tener 40 caracteres o menos")
            .required("El nombre es obligatorio"),
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
          // <div className="register-form-container">
          <Form className="animate__animated animate__fadeIn" id="sign-up-form">
            {formik.errors.general && (
              <div className="error-message">{formik.errors.general}</div>
            )}
            {console.log("formik.values ====== ", formik.values)}
            <TextInputComponent
              type="text"
              label="Nombre de la organización"
              name="name"
              placeholder="Fundacion animalitos del mundo"
              value={formik.values.name}
              onChange={formik.handleChange}
              sx={{ width: "27ch" }}
            />
            <TextInputComponent
              type="number"
              label="No. de Identificación Tributaria (Nit)"
              name="nit"
              placeholder="123456789"
              value={formik.values.nit}
              onChange={formik.handleChange}
              sx={{ width: "27ch" }}
            />
            <TextInputComponent
              type="number"
              label="No. de Matrícula Mercantil (Cámara de Comercio)"
              name="commercial_registration_number"
              placeholder="12345678900"
              value={formik.values.commercial_registration_number || ""}
              onChange={formik.handleChange}
              sx={{ width: "27ch" }}
            />
            <TextInputComponent
              type="email"
              label="Correo electrónico"
              name="email"
              placeholder="ejemplo@email.com"
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
            <SelectInputComponent
              label="Departamento"
              name="department"
              options={departmentsOptions}
              onBlur={formik.handleBlur}
              placeholder="Departamento"
              value={formik.values.department}
              onChange={({ target }) => {

                if (target.value === null || target.value === "") {
                  console.log("target.value === null ", target);
                  // formik.setFieldValue("department", 0);
                  formik.setFieldValue("city", {
                    label: "",
                    value: null,
                  });
                  formik.setFieldValue("department", {
                    label: "",
                    value: null,
                  });
                  return;
                }

                const departmentOption = departmentsOptions.find(
                  (option) => option.value === target.value
                );
                handleDepartmentSelectChange(target.value);
                formik.setFieldValue("department", departmentOption);
              }}
              // onChange={formik.handleChange}
              sx={{ width: "27ch" }}

            />
            <SelectInputComponent
              label="Ciudad"
              name="city"
              options={citiesOptions}
              placeholder="Ciudad"
              value={formik.values.city}
              onChange={({ target }) => {
                if (target.value === null) {
                  formik.setFieldValue("city", {
                    label: "",
                    value: null,
                  });
                  return;
                }
                const cityOption = citiesOptions.find(
                  (option) => option.value === target.value
                );
                // handleDepartmentSelectChange(target.value);
                formik.setFieldValue("city", cityOption);
              }}
              // onChange={formik.handleChange}
              sx={{ width: "27ch" }}
            />
            <TextInputComponent
              type="address"
              label="Dirección"
              name="address"
              placeholder="Dirección de domicilio"
              value={formik.values.address}
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
            <SwitchInputComponent
              label="Términos y condiciones"
              name="terms"
            />
            <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
            <button disabled={isCheckingAuth} type="submit" className="btn" style={{ marginTop: "1.2rem" }}>
              Registrarse
            </button>
            <p className="social-text">O</p>
            <div className="social-media">
              <button type="button" className="googlebutton">
                Registrarse con Google
              </button>
            </div>
          </Form>
          // </div>
        )}
      </Formik>
    </>
  );
}
