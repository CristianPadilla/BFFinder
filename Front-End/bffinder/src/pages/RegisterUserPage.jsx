import React, { useState, useEffect } from "react";
import "../styles/login.scss";
import "../styles/Card.scss";
import { Formik, Form, FormikContext } from "formik";
import * as Yup from "yup";
import { TextInputComponent } from "../Components/TextInputComponent";
import { SelectInputComponent } from "../Components/SelectInputComponent";
import { CheckboxInputComponent } from "../Components/CheckboxInputComponent";
import TextInputPassword from "../Components/form/TextInputPassword";
import axios from "axios";

const formFields = {
  firstname: "",
  lastname: "",
  phone: "",
  email: "",
  email2: "",
  address: "",
  department: "",
  city: "",
  date: "",
  password: "",
  password2: "",
  terms: false,
};

export function RegisterUserPage() {
  // console.log("======firstname: " + firstname);
  // const registerUser = async () => {
  //   const response = await fetch('http://localhost:3001/api/users', {
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [departmentOptions, setDepartmentOptions] = useState([]);

  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       firstname: values.firstname,
  //       lastname: values.lastname,
  //       phone: values.phone,
  //       email: values.email,
  //       email2: values.email2,
  //       department: values.department,
  //       city: values.city,
  //       date: values.date,
  //       password: values.password,
  //       confirmPassword: values.confirmPassword,
  //     }),
  //   });
  //   const data = await response.json();
  //   console.log(data);
  // };

  // Obtener la lista de departamentos de Colombia desde la API
  useEffect(() => {
    axios
      .get("https://api-colombia.com/api/v1/Department")
      .then((response) => {
        const departmentNames = response.data.map((department) => ({
          id: department.id,
          title: department.name,
        }));
        setDepartmentOptions(departmentNames);
      })
      .catch((error) => {
        console.error("Error al cargar los departamentos:", error);
      });
  }, []);

  // Cargar las ciudades correspondientes al departamento seleccionado
  const handleDepartmentChange = (selectedDepartment) => {
    axios
      .get(
        `https://api-colombia.com/api/v1/Department/${selectedDepartment.id}/cities`
      )
      .then((response) => {
        const cityNames = response.data.map((city) => city.name);
        console.log(cityNames);
        setCityOptions(cityNames);
        setSelectedDepartment(selectedDepartment);
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
      });
  };

  return (
    <>
      <Formik
        initialValues={formFields}
        onSubmit={(values) => {
          // logica para registrarse
          console.log(values);
        }}
        validationSchema={Yup.object({
          firstname: Yup.string()
            .min(3, "El nombre debe tener al menos 3 caracteres")
            .max(15, "El nombre debe tener 15 caracteres o menos")
            .required("El nombre es requerido"),
          lastname: Yup.string()
            .min(3, "El apellido debe tener al menos 3 caracteres")
            .max(15, "El apellido debe tener 15 caracteres o menos")
            .required("El apellido es requerido"),
          phone: Yup.string()
            .test(
              "len",
              "El número telefono debe tener 10 caracteres",
              (val) => val.length === 10
            )
            .required("El telefono es requerido"),
          email: Yup.string()
            .email("Correo no válido")
            .required("El correo es requerido"),
          email2: Yup.string()
            .email("El email no es valido")
            .oneOf([Yup.ref("email"), null], "Los correos no coinciden")
            .required("El email es requerido"),
          address: Yup.string()
            .min(4, "El domicilio debe tener al menos 4 caracteres")
            .max(30, "El domicilio debe tener 30 caracteres o menos"),
          department: Yup.string()
            // .notOneOf(["mesopotamia"], "esta opcion no está permitida")// en caso de bloquear una opcion
            .required("Debe seleccionar un departamento de residencia"),
          city: Yup.string().required(
            "Debe seleccionar un municipio de residencia"
          ),
          date: Yup.date()
            .max(new Date(), "La fecha no puede ser mayor a la fecha actual")
            .required("La fecha de nacimiento es requerida")
            .transform(function (value, originalValue) {
              if (this.isType(value)) {
                return value;
              }
              const result = parse(originalValue, "dd.MM.yyyy", new Date());
              return result;
            })
            .typeError("please enter a valid date")
            .min("1910-01-01", "Seleccione una fecha valida"),

          password: Yup.string()
            .min(8, "La contraseña debe tener al menos 8 caracteres")
            .max(15, "La contraseña debe tener 15 caracteres o menos")
            .required("La contraseña es requerido"),
          password2: Yup.string()
            .oneOf(
              [Yup.ref("password"), null],
              "Las contraseñas deben coincidir"
            )
            .required("La confirmacion de contraseña es requerida"),
          terms: Yup.boolean().oneOf(
            [true],
            "Debes aceptar los terminos y condiciones"
          ),
        })}
      >
        {(formik) => (
          <div className="register-form-container">
          <Form
            className="sign-up-form register-form"
            id="sign-up-form"
          >
            <div className="form-container">
            <TextInputComponent
              type="text"
              label="Nombres"
              name="firstname"
              placeholder="Pedro"
              value={formik.values.firstname}
              onChange={formik.handleChange}
            />
            <TextInputComponent
              type="text"
              label="Apellido"
              name="lastname"
              placeholder="Pérez"
              value={formik.values.lastname}
              onChange={formik.handleChange}
            />
            <TextInputComponent
              type="date"
              label="Fecha de Nacimiento"
              name="date"
              className="form-datepicker"
              value={formik.values.date}
              onChange={formik.handleChange}
            />
            <TextInputComponent
              type="email"
              label="Correo electrónico"
              name="email"
              placeholder="ejemplo@mail.com"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <TextInputComponent
              type="email"
              label="Confirma tu correo"
              name="email2"
              placeholder="repite tu correo electrónico"
              value={formik.values.email2}
              onChange={formik.handleChange}
            />
            {/* <TextInputComponent
              type="password"
              label="Contraseña"
              name="password"
              placeholder="********"
              value={formik.values.password}
              onChange={formik.handleChange}
            /> */}
            <TextInputPassword
              label="Contraseña"
              name="password"
              placeholder="Escribe tu contraseña"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <TextInputComponent
              type="number"
              label="Número de telefono"
              name="numbercel"
              placeholder="322000550"
              value={formik.values.numbercel}
              onChange={formik.handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <CheckboxInputComponent
              label="Términos y condiciones"
              name="terms"
              className="slider round"
              labelClassName="switch"
              spanClassName="slider round"
              // value={terms}
              // onChange={(e)=> onInputChange(e,'checkbox')}
              // value={formik.values.terms}
              // onChange={formik.handleChange}
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
            </div>
          </Form>
          </div>
        )}
      </Formik>
    </>
  );
}
