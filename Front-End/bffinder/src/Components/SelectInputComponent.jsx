import React from "react";
import { ErrorMessage, useField } from "formik";

export const SelectInputComponent = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  // console.log(field);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <div className="input-field">
        <i className="fas fa-user" />
        <select
          className={props.className}
          {...field}
          {...props}
        />
      </div>
      <ErrorMessage name={props.name} component="span" className={props.errorClassName} />
    </>
  );
};
