import { ErrorMessage, useField } from "formik";
import React from "react";

export const TextInputComponent = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  // console.log(field);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <div className="input-field">
      <i className="fas fa-user" />
        <input className={props.className} {...field} {...props} placeholder={props.placeholder} />
      </div>
      <ErrorMessage name={props.name} component="span" className={props.errorClassName} />
    </>
  );
};
