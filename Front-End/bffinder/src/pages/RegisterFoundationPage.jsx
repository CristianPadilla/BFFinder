import React from "react";
import { TextInputComponent } from "../Components/TextInputComponent";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { SelectInputComponent } from "../Components/SelectInputComponent";
import { CheckboxInputComponent } from "../Components/CheckboxInputComponent";

const formFields = {
  name: "", //1
  description: "", //2
  webPageUrl: "", //3
  date: "", //4
  city: "", //5
  address: "", //6
  neighborhood: "", //7
  moreInfo: "", //8
  phone: "", //9
  email: "", //10
  email2: "", //11
  password: "", //12
  password2: "", //13
  department: "", //4
  terms: false, //14
};

export function RegisterFoundationPage() {
  return (
    <>
      <Formik
        initialValues={formFields}
        onSubmit={(values) => {
          // logica para registrarse
          console.log(values);
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(3, "El nombre debe tener al menos 3 caracteres")
            .max(15, "El nombre debe tener 15 caracteres o menos")
            .required("El nombre es requerido"),
          description: Yup.string()
            .min(3, "La descripción debe tener al menos 50 caracteres")
            .max(15, "La descripción debe tener 500 caracteres o menos")
            .required("Añada una descripción corta de su fundación"),
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
          webPageUrl: Yup.string().matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            "Dirección url no válida"
          ),
          address: Yup.string()
            .min(4, "La descripción debe tener al menos 4 caracteres")
            .max(30, "La descripción debe tener 30 caracteres o menos")
            .required("La dirección de domicilio es obligatoria"),
          department: Yup.string().required(
            "Debe seleccionar un departamento de residencia"
          ),
          city: Yup.string().required(
            "Debe seleccionar un municipio de residencia"
          ),
          moreInfo: Yup.string(),
          neighborhood: Yup.string()
            .min(3, "Ingrese al menos 3 caracteres")
            .max(40, "El barrio tener menos de 40 caracteres"),
          date: Yup.date()
            .max(
              new Date(),
              "La fecha de fundación no puede ser mayor a la fecha actual"
            )
            .required("Fecha de nacimiento requerida")
            .transform(function (value, originalValue) {
              if (this.isType(value)) {
                return value;
              }
              const result = parse(originalValue, "dd.MM.yyyy", new Date());
              return result;
            })
            .typeError("please enter a valid date")
            .min("1900-01-01", "Seleccione una fecha valida"),
          password: Yup.string()
            .min(8, "La contraseña debe tener al menos 8 caracteres")
            .max(15, "La contraseña debe tener 15 caracteres o menos")
            .required("La contraseña es requerido"),
          password2: Yup.string()
            .oneOf(
              [Yup.ref("password"), null],
              "Las contraseñas deben coincidir"
            )
            .required("Por favor confirma tu contraseña"),
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
            <TextInputComponent
              type="text"
              label="Nombre de la organización"
              name="name"
              placeholder="Fundacion animalitos del mundo"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <TextInputComponent
              type="text"
              label="Descripción"
              name="description"
              placeholder="Ingrese una breve descripción de la organizacion"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            <TextInputComponent
              type="text"
              label="Sitio web"
              name="webPageUrl"
              placeholder="mifundacion.com"
              value={formik.values.webPageUrl}
              onChange={formik.handleChange}
            />
            <TextInputComponent
              type="date"
              label="Fecha de fundacion"
              name="date"
              className="form-datepicker"
              value={formik.values.date}
              onChange={formik.handleChange}
            />
            <SelectInputComponent
              name="department"
              label="Departamento"
              className="form-select form-select-lg mb-3"
              value={formik.values.department}
              onChange={formik.handleChange}
            >
              <option defaultValue="">Selecciona un departamento</option>
              <option value="1">Valle del cauca</option>
              <option value="3">Antioquia</option>
              <option value="2">Cundinamarca</option>
            </SelectInputComponent>
            <SelectInputComponent
              name="city"
              className="form-select form-select-lg mb-3"
              label="Municipio"
              value={formik.values.city}
              onChange={formik.handleChange}
            >
              <option defaultValue="0">Selecciona un municipio</option>
              <option value="1">Cali</option>
              <option value="3">Jamundí</option>
              <option value="2">Palmira</option>
            </SelectInputComponent>
            <TextInputComponent
              type="text"
              label="Dirección de domicilio"
              name="address"
              placeholder="Calle 12, #13d-14"
              value={formik.values.address}
              onChange={formik.handleChange}
            />
            <TextInputComponent
              type="text"
              label="Barrio, localidad o zona"
              name="neighborhood"
              placeholder="San Cristobal"
              value={formik.values.neighborhood}
              onChange={formik.handleChange}
            />
            <TextInputComponent
              type="text"
              label="Información de domicilio adicional"
              name="moreInfo"
              placeholder="Edificio 1, piso 2"
              value={formik.values.moreInfo}
              onChange={formik.handleChange}
            />
            <TextInputComponent
              type="number"
              label="Número Telefónico"
              name="phone"
              placeholder="1122334"
              value={formik.values.phone}
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

            <TextInputComponent
              type="password"
              label="Contraseña"
              name="password"
              placeholder="********"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <TextInputComponent
              type="password"
              label="Confirma tu contraseña"
              name="password2"
              placeholder="********"
              value={formik.values.password2}
              onChange={formik.handleChange}
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
