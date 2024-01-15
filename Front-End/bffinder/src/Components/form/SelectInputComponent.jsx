import React, { useState, useEffect } from "react";
import { useField } from "formik";
import { Autocomplete, FormControl, TextField } from "@mui/material";

const SelectInputComponent = (props) => {
  const [field, meta] = useField(props);

  // console.log(`meta del ${props.name}  = `, meta);

  return (
    <>
      <FormControl sx={{ width: "27ch" }} margin="normal">
        <Autocomplete
          options={props.options}
          getOptionLabel={(option) => {
            // console.log("option :", option);
            return option ? option.label : "";
          }}
          onChange={(event, newValue) => {
            return props.onChange({
              target: {
                name: props.name,
                value: newValue ? newValue.value : "",
              },
            });
          }}
          freeSolo

          value={props.value}
          onBlur={props.onBlur}
          clearIcon={props.clearIcon}
          renderInput={(params) => (
            <TextField
              {...params}
              name={props.name}
              label={props.label}
              variant="outlined"
              error={!!(meta.touched && meta.error)}
              helperText={meta.touched && meta.error ? meta.error.value : ""}
            // error={props.touched && props.errors}
            // helperText={props.touched && props.errors}
            />
          )}
        />
      </FormControl>
    </>
  );
};

export default SelectInputComponent;

