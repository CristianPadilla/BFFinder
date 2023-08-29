import { useField } from "formik";
import React from "react";

export const TextInputComponent = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <div className="input-field">
      <i className="fas fa-user" />
        <input className="" {...field} {...props} placeholder={props.placeholder} />
      </div>
      {meta.touched && meta.error && <span>{meta.error}</span>}
    </>
  );
};
