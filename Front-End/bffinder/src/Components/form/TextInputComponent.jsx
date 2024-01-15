import React from "react";
import { ErrorMessage, useField } from "formik";
import { TextField, FormControl, InputAdornment } from "@mui/material";

export const TextInputComponent = ({
  sx,
  label,
  onChange,
  value,
  name,
  errorClassName,
  className,
  multiline,
  maxRows,
  placeholder,
  endAdornment,
  inputStyle,
  ...props
}) => {
  const [field, meta] = useField(name);
  // console.log(`TEXT meta del ${name}  = `, meta);
  return (
    <>
      {/* <label htmlFor={props.id || props.name}>{label}</label>
      <div className="input-field">
      <i className="fas fa-user" />
        <input onChange={props.onInputChange} name={props.name} className={props.className} {...field} {...props} placeholder={props.placeholder} />
      </div>
      <ErrorMessage name={props.name} component="span" className={props.errorClassName} /> */}

      <FormControl sx={sx} margin="normal">
        <TextField
          label={label}
          value={value}
          onChange={onChange}
          name={name}
          className={className}
          multiline={multiline}
          maxRows={maxRows}
          placeholder={placeholder}
          variant="outlined"
          error={meta.touched && !!meta.error}
          helperText={meta.touched ? meta.error : ''}
          InputProps={{
            endAdornment: endAdornment && (
              <InputAdornment position="end">{endAdornment}</InputAdornment>
            ),
            style: inputStyle,
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
