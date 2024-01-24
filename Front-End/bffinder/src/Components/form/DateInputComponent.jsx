import React from "react";
import TextField from "@mui/material/TextField";

const DateInputComponent = ({ label, onChange, value, sx, helperText, placeholder }) => {
  return (
    <TextField
      id="date"
      label={label || "Fecha"}
      type="date"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      sx={sx}
      InputLabelProps={{
        shrink: true,
      }}
      helperText={helperText}
    />
  );
};

export default DateInputComponent;
