import React, {useState, useEffect} from "react";
import { ErrorMessage, useField } from "formik";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export const SelectInputComponent = (props) => {
  const { label, name, onChange, className, errorClassName, options, ...otherProps } = props;
  // const [field, meta] = useField(props.name);
  // console.log(field);
  // const [options, setOptions] = useState([]);

  // const [selectedDepartment, setSelectedDepartment] = useState(null);
  // const [departmentOptions, setDepartmentOptions] = useState([]);

  // useEffect(() => {
  //   axios.get('https://api-colombia.com/api/v1/Department')
  //     .then(response => {
  //       const departmentNames = response.data.map(department => ({
  //         title: department.name,
  //       }));
  //       setDepartmentOptions(departmentNames);
  //     })
  //     .catch(error => {
  //       console.error('Error al cargar los departamentos:', error);
  //     });
  // }, []);

  // const handleDepartmentChange = (_event, newValue) => {
  //   setSelectedDepartment(newValue);
  // };
  return (
    <>
      {/* <label htmlFor={props.id || props.name}>{label}</label>
      <div className="input-field">
        <i className="fas fa-user" />
        <select
          name={props.name}
          onChange={props.onInputChange}
          className={props.className}
          {...field}
          {...props}
        />
      </div>
      <ErrorMessage
        name={props.name}
        component="span"
        className={props.errorClassName}
      /> */}

{/* <label htmlFor={props.id || props.name}>{label}</label>
      <div className="input-field"> */}

        {/* <Autocomplete
          id="colombian-departments"
          // options={colombianDepartments} 
          options={departmentOptions}
          sx={{ width: 300 }}
          getOptionLabel={(option) => option.title}
          value={selectedDepartment}
          onChange={handleDepartmentChange}
          renderInput={(params) => (
            <TextField {...params} label={label} {...props} variant="outlined" />
          )}
        />
      {/* </div> */}
      {/* <ErrorMessage name={props.name} component="span" className={props.errorClassName} /> */} 

      <Autocomplete
        id={name}
        options={options}
        getOptionLabel={(option) => option.title}
        onChange={(_, newValue) => {
          if (onChange) {
            onChange(newValue);
          }
        }}
        renderInput={(params) => (
          <TextField {...params} label={label} {...otherProps} variant="outlined" />
        )}
      />
      <div style={{ textAlign: 'center' }}>
         <ErrorMessage name={name} component="span" className={errorClassName} style={{ fontSize: '.7rem' }}/>
      </div>
    </>
  );
};
