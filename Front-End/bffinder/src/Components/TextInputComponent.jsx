import { ErrorMessage, useField } from "formik";
import TextField from '@mui/material/TextField';
import React from "react";

export const TextInputComponent = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      {/* <label htmlFor={props.id || props.name}>{label}</label>
      <div className="input-field">
      <i className="fas fa-user" />
        <input onChange={props.onInputChange} name={props.name} className={props.className} {...field} {...props} placeholder={props.placeholder} />
      </div>
      <ErrorMessage name={props.name} component="span" className={props.errorClassName} /> */}

      <TextField label={label} onChange={props.onInputChange} name={props.name} className={props.className} {...field} {...props} placeholder={props.placeholder} variant="filled" />
      <ErrorMessage name={props.name} component="p" className={props.errorClassName} />
    </>
  );
};
