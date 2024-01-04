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

  console.log("Opciones del grupo de radio:", options);

  return (
    <FormGroup sx={{ width: '27ch', margin: '.5rem' }} required>
      <FormLabel id={`${name}-label`}>
        {label}:<span style={{ color: 'red' }}>*</span>
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
      <div style={{ textAlign: 'center' }}>
        <ErrorMessage
          name={name}
          component="span"
          className={errorClassName}
          style={{ fontSize: '.7rem' }}
        />
      </div>
    </FormGroup>
  );
};

export default RadioGroupComponent;
