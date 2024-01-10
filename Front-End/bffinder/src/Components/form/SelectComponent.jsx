import React, { useState, useEffect } from "react";
// import { useField } from "formik";
import { Autocomplete, FormControl, TextField } from "@mui/material";

const SelectComponent = (props) => {
  // const [field, meta] = useField(props);
//   console.log("SelectComponent props:", props);

  return (
    <>
    {/* <FormLabel component="legend">Departamento</FormLabel> */}
      <FormControl sx={{ width: "27ch" }} margin="normal" fullWidth={props.fullWidth} className="filter-container">
        <Autocomplete
          options={props.options}
          getOptionLabel={(option) => {
            return option.label;
          }}
          onChange={(event, newValue) => {
            return props.onChange({
              target: {
                name: props.name,
                value: newValue ? newValue.value : "",
              },
            });
          }}
          // freeSolo
          style={props.style}
          renderInput={(params) => (
            <TextField
              {...params}
              name={props.name}
              label={props.label}
              variant="outlined"
              // error={meta.touched && !!meta.error}
              // helperText={meta.touched ? meta.error : ""}
            />
          )}
        />
      </FormControl>
    </>
  );
};

export default SelectComponent;
