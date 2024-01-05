import React, { useState, useEffect } from "react";
import { useField } from "formik";
import { Autocomplete, FormControl, TextField } from "@mui/material";

const SelectInputComponent = (props) => {
  const [field, meta] = useField(props);

  return (
    <>
      <FormControl sx={{ width: "27ch" }} margin="normal">
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
          freeSolo
          renderInput={(params) => (
            <TextField
              {...params}
              name={props.name}
              label={props.label}
              variant="outlined"
              error={meta.touched && !!meta.error}
              helperText={meta.touched ? meta.error : ""}
            />
          )}
        />
      </FormControl>
    </>
  );
};

export default SelectInputComponent;
