import React from "react";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import FormHelperText from "@mui/material/FormHelperText";
import { ErrorMessage, useField } from "formik";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const SwitchInputComponent = ({ label, value, onChange, name, onBlur, ...props }) => {
  const [field, meta, helpers] = useField({ name, type: "checkbox" });
  // const theme = useTheme();
  // const handleChange = (e) => {
  //   helpers.setValue(e.target.checked);
  //   helpers.setTouched(true);
  // };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#db711590",
      },
    },
  });

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
      <ThemeProvider theme={theme}>
        <Switch
          // {...field}
          onChange={onChange}
          // checked={field.value}
          name={name}
          onBlur={onBlur}
          value={value}
          // sx={{
          //   "& .MuiSwitch-thumb": {
          //     backgroundColor: field.value
          //       ? "#db711590" // Color cuando está checked
          //       : theme.palette.primary.main, // Color cuando no está checked
          //   },
          //   "&.Mui-checked": {
          //     backgroundColor: "#db711590", // Color de fondo cuando está checked
          //   },
          // }}
        />
        </ThemeProvider>
        <Typography>{label}</Typography>
      </div>
      <div style={{ textAlign: 'center' }}>
        <ErrorMessage
        name={name}
        component="span"
        // className={props.errorClassName}
        style={{ fontSize: '.7rem', color: 'red' }}
      />
      </div>
      {/* <FormHelperText error={meta.touched && !!meta.error}>
        {meta.error}
      </FormHelperText> */}
    </>
  );
};

export default SwitchInputComponent;
