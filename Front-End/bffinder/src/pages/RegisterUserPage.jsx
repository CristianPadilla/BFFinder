import React from "react";
import "../styles/login.scss";
import { useFormik, Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextInputComponent } from "../Components/TextInputComponent";
import { SelectInputComponent } from "../Components/SelectInputComponent";
import { CheckboxInputComponent } from "../Components/CheckboxInputComponent";

export function RegisterUserPage() {
  // const registerUser = async () => {
  //   const response = await fetch('http://localhost:3001/api/users', {

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

  return (
    <>
      <Formik
        initialValues={{
          firstname: "",
          lastname: "",
          phone: "",
          email: "",
          email2: "",
          department: "",
          city: "",
          password: "",
          password2: "",
          terms: false,
        }}
        onSubmit={(values) => {
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
          address: Yup.string(),
          department: Yup.string()
            // .notOneOf(["mesopotamia"], "esta opcion no está permitida")// en caso de bloquear una opcion
            .required("Debe seleccionar un departamento de residencia"),
          city: Yup.string().required(
            "Debe seleccionar un municipio de residencia"
          ),
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
          <Form
            className="sign-up-form  animate__animated animate__backInLeft"
            id="sign-up-form"
          >
            {/* <div className="input-field"> */}
            {/* <i className="fas fa-user" /> */}
            <TextInputComponent
              type="text"
              label="Nombre"
              name="firstname"
              placeholder="Pedro"
            />
            {/* <Field name="firstname" placeholder="Pedro" type="text"></Field>
              <ErrorMessage name="firstname" component="span"></ErrorMessage>
            </div> */}

            <TextInputComponent
              type="text"
              label="Apellido"
              name="lastname"
              placeholder="Pérez"
            />

            <TextInputComponent
              type="number"
              label="Número de celular"
              name="phone"
              placeholder="Su número de cel"
            />

            <TextInputComponent
              type="email"
              label="Correo electrónico"
              name="email"
              placeholder="ejemplo@mail.com"
            />

            <TextInputComponent
              type="email"
              label="Confirma tu correo"
              name="email2"
              placeholder="repite tu correo electrónico"
            />

            <TextInputComponent
              type="text"
              label="Dirección de residencia"
              name="address"
              placeholder="Calle 12, #13d-14"
            />

            <SelectInputComponent
              name="department"
              label="Departamento de residencia"
              className="form-select form-select-lg mb-3"
            >
              <option defaultValue="">Selecciona un departamento</option>
              <option value="1">Valle del cauca</option>
              <option value="3">Antioquia</option>
              <option value="2">Cundinamarca</option>
            </SelectInputComponent>

            <SelectInputComponent
              name="city"
              className="form-select form-select-lg mb-3"
              label="Municipio de residencia"
            >
              <option defaultValue="0">Selecciona un municipio</option>
              <option value="1">Cali</option>
              <option value="3">Jamundí</option>
              <option value="2">Palmira</option>
            </SelectInputComponent>

            <TextInputComponent
              type="date"
              label="Fecha de nacimiento"
              name="date"
              className="form-datepicker"
            />

            <TextInputComponent
              type="password"
              label="Contraseña"
              name="password"
              placeholder="********"
            />

            <TextInputComponent
              type="password"
              label="Confirma tu contraseña"
              name="password2"
              placeholder="********"
            />

            <CheckboxInputComponent
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
              // onClick={registerUser}
            />

            <p className="social-text">O Registrate con Google</p>
            <div className="social-media">
              <button type="button" className="googlebutton">
                Registrarse con Google
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
