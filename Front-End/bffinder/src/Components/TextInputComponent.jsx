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
      <div style={{ margin: '.7rem' }}>
        <TextField label={label} onChange={props.onInputChange} name={props.name} className={props.className} {...field} {...props} placeholder={props.placeholder} variant="outlined" />
        <div style={{ textAlign: 'center' }}>
          <ErrorMessage name={props.name} component="span" className={props.errorClassName} style={{ fontSize: '.7rem' }}/>
        </div>
        
      </div>
    </>
  );
};
