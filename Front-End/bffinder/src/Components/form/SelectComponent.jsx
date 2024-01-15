import React, { useState, useEffect } from "react";
// import { useField } from "formik";
import { Autocomplete, FormControl, TextField } from "@mui/material";
import { Button } from "@mui/base";
import { useField } from "formik";

const SelectComponent = (props) => {

  // console.log("=---------------- :", props);
  // const [field, meta] = useField(props.name);

  return (
    <>
      {/* <FormLabel component="legend">Departamento</FormLabel> */}
      <FormControl sx={{ width: "27ch" }} margin="normal" fullWidth={props.fullWidth} className="filter-container">
        <Autocomplete
          value={props.value}
          options={props.options}
          getOptionLabel={(option) => {
            // console.log("option :", option);
            return option.label;
          }}
          onChange={props.onChange}
          isOptionEqualToValue={(option, value) => {
            // console.log("option :", option.value === value.value);
            return option.value === value.value
          }}
          clearIcon={props.clearIcon}
          style={props.style}
          freeSolo={props.freeSolo}
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
