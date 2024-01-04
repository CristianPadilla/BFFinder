import React, {useState, useEffect} from "react";
import { ErrorMessage, useField } from "formik";
import { Autocomplete, FormControl, TextField } from '@mui/material';

const SelectInputComponent = (props) => {
  const { value, label, name, onChange, className, errorClassName, options, ...otherProps } = props;
  console.log('Prueba', props);

  // const [value, setValue] = useState(props.value || "");

  // useEffect(() => {
  //   setValue(props.value || "");
  // }, [props.value]);

  // const handleInternalChange = (_, newValue) => {
  //   setValue(newValue);
  //   if (onChange) {
  //     onChange(newValue);
  //   }
  // };

  // const handleInternalChange = (_, newValue) => {
  //   setValue(newValue ? newValue.label : ""); // Asigna la etiqueta de la opción seleccionada o una cadena vacía
  //   if (onChange) {
  //     onChange(newValue);
  //   }
  // };

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
      <FormControl sx={{ width: '27ch' }} margin="normal">
      <Autocomplete
        id={name}
        options={options}
        // getOptionLabel={(option) => option.label}
        // onChange={(_, newValue) => {
        //   if (onChange) {
        //     onChange(newValue);
        //   }
        // }}
        onChange={onChange}
        value={value}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label={label} {...otherProps} variant="outlined" value={props.value || ''} />
        )}
      />
      </FormControl>
      <div style={{ textAlign: 'center' }}>
         <ErrorMessage name={name} component="span" className={errorClassName} style={{ fontSize: '.7rem' }}/>
      </div>
    </>
  );
};

export default SelectInputComponent;