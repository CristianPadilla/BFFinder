import React from "react";
import {
  FormGroup,
  FormLabel,
  RadioGroup as MuiRadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from "@mui/material";

const RadioComponent = (props) => {
  const {
    label,
    name,
    row,
    value,
    onChange,
    options,
    onClick,
    className,
    style,
    helperText,
    ...otherProps
  } = props;

  // console.log("Opciones del grupo de radio:", options);

  return (
    <FormGroup style={style} sx={{ width: "27ch", margin: ".5rem", padding: ".6rem 0 0 0" }}>
      <FormLabel id={`${name}-label`}>{label}</FormLabel>
      {/* <MuiRadioGroup
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
      </MuiRadioGroup> */}
      <MuiRadioGroup
        row={row}
        aria-labelledby={`${name}-label`}
        name={name}
        value={value} // Asegúrate de que value no sea undefined ni null
        // onChange={onChange}
        onClick={onChange}
        
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value ? option.value.toString() : ""} // Asegúrate de que option.value no sea undefined ni null
            control={<Radio />}
            label={option.label}
            // checked={option.value === value}
          />
        ))}
      </MuiRadioGroup>
      <FormHelperText>{helperText}</FormHelperText>
    </FormGroup>
  );
};

export default RadioComponent;
