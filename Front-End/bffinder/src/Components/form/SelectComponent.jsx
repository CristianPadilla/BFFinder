import React, { useState, useEffect } from "react";
// import { useField } from "formik";
import { Autocomplete, FormControl, TextField } from "@mui/material";
import { Button } from "@mui/base";
import { useField } from "formik";

const SelectComponent = (props) => {

  // console.log("=---------------- :", props.value);
  // const [field, meta] = useField(props.name);

  return (
    <>
      <FormControl sx={props.sx} margin="normal" fullWidth={props.fullWidth} className="filter-container">
        <Autocomplete
          value={props.value}
          options={props.options}
          getOptionLabel={(option) => {
            // console.log("option :", option);
            return option.label;
          }}
          // clearOnBlur={false}
          onChange={props.onChange}
          // isOptionEqualToValue={(option, value) => {
          //   // console.log("option :", option.value === value.value);
          //   return option.value === value.value
          // }}
          // clearIcon={true}
          style={props.style}
          fullWidth={props.fullWidth}
          freeSolo={false}// para que el el campo de texto solo pueda tener una de las opciones del select
          renderInput={(params) => (
            <TextField
              {...params}
              name={props.name}
              label={props.label}
              variant="outlined"
              disabled={props.inputDisabled}
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
