import React from "react";
import "../styles/login.scss";
import "../styles/Card.scss";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextInputComponent } from "../Components/TextInputComponent";
import { SelectInputComponent } from "../Components/SelectInputComponent";
import { CheckboxInputComponent } from "../Components/CheckboxInputComponent";
import TextInputPassword from "../Components/form/TextInputPassword";
import axios from "axios";

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
  const handleRegistration = async (values, { setSubmitting, setErrors }) => {
    try {
      //     console.log("Form values:", values);

      // // Simular un retraso de la red
      // console.log("Simulating network delay...");
      // await new Promise((resolve) => setTimeout(resolve, 1000));

      // console.log("Making API request...");

      const response = await axios.post("http://localhost:9090/auth/register", {
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        phone: values.phone.trim() !== "" ? values.phone : null,
        password: values.password,
      });
      // console.log("Respuesta exitosa:", response.data);

      // Puedes mostrar un mensaje de éxito o redirigir a otra página
    } catch (error) {
      // Si hay un error en la solicitud, puedes mostrar un mensaje de error o hacer algo más
      console.error("Error en la solicitud de registro:", error);

      // Puedes ajustar esto según la estructura exacta de la respuesta de error de tu API
      setErrors({
        general: "Hubo un error en el registro. Inténtalo de nuevo.",
      });
    } finally {
      console.log("Finalizando...");
      setSubmitting(false);
    }
  };

  return (
    <>
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
          // date: Yup.date()
          //   .max(new Date(), "La fecha no puede ser mayor a la fecha actual")
          //   .required("La fecha de nacimiento es obligatorio")
          //   .transform(function (value, originalValue) {
          //     if (this.isType(value)) {
          //       return value;
          //     }
          //     const result = parse(originalValue, "dd.MM.yyyy", new Date());
          //     return result;
          //   })
          //   .typeError("please enter a valid date")
          //   .min("1910-01-01", "Seleccione una fecha valida"),

          password: Yup.string()
            .min(8, "La contraseña debe tener al menos 8 caracteres")
            .max(15, "La contraseña debe tener 15 caracteres o menos")
            .required("La contraseña es obligatoria"),
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
            <Form className="sign-up-form register-form" id="sign-up-form">
            {console.log(formik.values)}
              <div className="form-container">
                <TextInputComponent
                  required
                  type="text"
                  label="Nombres"
                  name="firstname"
                  placeholder="Pedro"
                  value={formik.values.firstname}
                  onChange={formik.handleChange}
                />
                <TextInputComponent
                  required
                  type="text"
                  label="Apellido"
                  name="lastname"
                  placeholder="Pérez"
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                />
                {/* <TextInputComponent
              type="date"
              label="Fecha de Nacimiento"
              name="date"
              className="form-datepicker"
              value={formik.values.date}
              onChange={formik.handleChange}
            /> */}
                <TextInputComponent
                  required
                  type="email"
                  label="Correo electrónico"
                  name="email"
                  placeholder="ejemplo@mail.com"
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
                  // helperText="Some important text"
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
                />
                <CheckboxInputComponent
                  required
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
                <button id="sign-up-btn" type="submit" className="btn">
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
                {/* PARECE QUE NO SALE */}
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
}
