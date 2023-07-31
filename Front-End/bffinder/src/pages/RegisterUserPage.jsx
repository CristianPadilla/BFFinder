import React from "react";
import "../styles/login.scss";
import { useFormik, Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

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
            .email("El correo no es valido")
            .required("El email es requerido"),
          email2: Yup.string()
            .email("El email no es valido")
            .oneOf([Yup.ref("email"), null], "Los correos no coinciden")
            .required("El email es requerido"),
          department: Yup.string()
            .min(2, "El departamento debe tener al menos 2 caracteres")
            .max(15, "El departamento debe tener 15 caracteres o menos")
            .required("El departamento es requerido"),
          city: Yup.string()
            .min(2, "La ciudad debe tener al menos 2 caracteres")
            .max(15, "La ciudad debe tener 15 caracteres o menos")
            .required("La ciudad es requerido"),
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
            {/* <h2 className='titulo'>Registrarse</h2> */}

            <div className="input-field">
              <i className="fas fa-user" />
              <Field name="firstname" placeholder="Nombre" type="text"></Field>
              <ErrorMessage name="firstname" component="span"></ErrorMessage>
            </div>
            <div className="input-field">
              <i className="fas fa-user" />
              <Field name="lastname" placeholder="Apellido" type="text"></Field>
              <ErrorMessage name="lastname" component="span"></ErrorMessage>
            </div>
            <div className="input-field">
              <i className="fas fa-user" />
              <Field name="phone" placeholder="Telefono" type="number"></Field>
              <ErrorMessage name="phone" component="span"></ErrorMessage>
            </div>
            <div className="input-field">
              <i className="fas fa-envelope" />
              <Field
                name="email"
                placeholder="ejemplo@mail.com"
                type="email"
              ></Field>
              <ErrorMessage name="email" component="span"></ErrorMessage>
            </div>
            <div className="input-field">
              <i className="fas fa-envelope" />
              <Field
                name="email2"
                placeholder="Confirma tu correo"
                type="email"
              ></Field>
              <ErrorMessage name="email2" component="span"></ErrorMessage>
            </div>
            <div className="input-field">
              <i className="fas fa-envelope" />
              <Field
                name="department"
                as="select"
                className="form-select form-select-lg mb-3"
              >
                <option defaultValue="0">Departamento de residencia</option>
                <option value="1">Valle del cauca</option>
                <option value="3">Antioquia</option>
                <option value="2">Cundinamarca</option>
              </Field>
              <ErrorMessage name="department" component="span"></ErrorMessage>
              {/* <select
                value={values.department}
                onChange={handleChange}
                name='department'
                className='form-select form-select-lg mb-3'
                // aria-label='Large select example'
              >
                <option defaultValue='0'>Departamento de residencia</option>
                <option value='1'>Valle del cauca</option>
                <option value='3'>Antioquia</option>
                <option value='2'>Cundinamarca</option>
              </select>
              {touched.department && errors.department && (
                <span>{errors.department}</span>
              )} */}
            </div>
            {/* <div className='input-field'>
              <i className='fas fa-envelope' />

              <select
                name='city'
                className='form-select form-select-lg mb-3'
                value={values.city}
                onChange={handleChange}
                // aria-label='Large select example'
              >
                <option defaultValue='0'>Municipio de residencia</option>
                <option value='1'>Cali</option>
                <option value='3'>Jamundí</option>
                <option value='2'>Palmira</option>
              </select>
              {touched.city && errors.city && <span>{errors.city}</span>}
            </div> */}
            <div className="input-field">
              <i className="fas fa-envelope" />

              <Field
                name="date"
                className="form-datepicker"
                type="date"
                placeholder="Fecha de nacimiento"
              ></Field>
              <ErrorMessage name="date" component="span"></ErrorMessage>
            </div>

            <div className="input-field">
              <i className="fas fa-lock" />
              <Field
                name="password"
                placeholder="Contraseña"
                type="password"
              ></Field>
              <ErrorMessage name="password" component="span"></ErrorMessage>
            </div>

            <div className="input-field">
              <i className="fas fa-lock" />
              <Field
                name="password2"
                placeholder="Confirma tu contraseña"
                type="password"
              ></Field>
              <ErrorMessage name="password2" component="span"></ErrorMessage>
            </div>
            <div>
              <label className="switch">
                Términos y condiciones
                <Field
                  name="terms"
                  type="checkbox"
                  className="slider round"
                ></Field>
                <span className="slider round"></span>
                <ErrorMessage name="terms" component="span"></ErrorMessage>
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
          </Form>
        )}
      </Formik>
    </>
  );
}
