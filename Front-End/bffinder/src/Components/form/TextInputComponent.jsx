import { ErrorMessage, useField } from "formik";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import React from "react";

export const TextInputComponent = ({
  label,
  onChange,
  value,
  name,
  errorClassName,
  className,
  placeholder,
  endAdornment,
  ...props
}) => {
  const [field, meta] = useField(name);
  // console.log("props araaaaaaaaaaaaaaaaaaaaaa", value);
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
          placeholder={placeholder}
          variant="outlined"
          error={meta.touched && !!meta.error}
          helperText={meta.touched ? meta.error : ''}
          InputProps={{
            endAdornment: endAdornment && (
              <InputAdornment position="end">{endAdornment}</InputAdornment>
            ),
          }}
          {...props}
        />
      </FormControl>
      {/* <div style={{ textAlign: "center", marginTop: "-6px" }}>
        <ErrorMessage
          name={name}
          component="span"
          className={errorClassName}
          style={{ fontSize: ".8rem"  }}
        />
      </div> */}
    </>
  );
};
