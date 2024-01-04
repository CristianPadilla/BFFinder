import { ErrorMessage, useField } from "formik";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import React from "react";

export const TextInputComponent = ({
  label,
  onChange,
  value,
  name,
  errorClassName,
  className,
  placeholder,
  ...props
}) => {
  // const [field, meta] = useField(props);
  console.log("props araaaaaaaaaaaaaaaaaaaaaa", value);
  return (
    <>
      {/* <label htmlFor={props.id || props.name}>{label}</label>
      <div className="input-field">
      <i className="fas fa-user" />
        <input onChange={props.onInputChange} name={props.name} className={props.className} {...field} {...props} placeholder={props.placeholder} />
      </div>
      <ErrorMessage name={props.name} component="span" className={props.errorClassName} /> */}

      <FormControl sx={{ width: "27ch" }} margin="normal">
        <TextField
          label={label}
          value={value}
          onChange={onChange}
          name={name}
          className={className}
          {...props}
          placeholder={placeholder}
          variant="outlined"
        />
      </FormControl>
      <div style={{ textAlign: "center" }}>
        <ErrorMessage
          name={name}
          component="span"
          className={errorClassName}
          style={{ fontSize: ".7rem" }}
        />
      </div>
    </>
  );
};
