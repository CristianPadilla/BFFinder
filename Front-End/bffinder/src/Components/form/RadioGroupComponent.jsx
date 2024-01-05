import React from "react";
import {
  FormGroup,
  FormLabel,
  RadioGroup as MuiRadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { ErrorMessage, useField } from "formik";

const RadioGroupComponent = (props) => {
  const { label, name, row, value, onChange, options, className, errorClassName, ...otherProps } = props;

  // console.log("Opciones del grupo de radio:", options);

  return (
    <FormGroup sx={{ width: '27ch', margin: '.5rem', padding: '.6rem 0 0 0' }}>
      <FormLabel id={`${name}-label`}>
        {label}
      </FormLabel>
      <MuiRadioGroup
        row={row}
        aria-labelledby={`${name}-label`}
        name={name}
        // value={value}
        value={value.toString()}
        onChange={onChange}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value.toString()}
            control={<Radio />}
            label={option.label}
            // checked={option.value === value}
          />
        ))}
      </MuiRadioGroup>
      <div style={{ textAlign: "center", marginTop: "-6px" }}>
        <ErrorMessage
          name={name}
          component="span"
          className={errorClassName}
          style={{ fontSize: ".8rem", color: "red"  }}
        />
      </div>
    </FormGroup>
  );
};

export default RadioGroupComponent;
