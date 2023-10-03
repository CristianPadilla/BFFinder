import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useField, ErrorMessage } from 'formik';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const TextInputPassword = ({ label, ...props }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [field, meta] = useField(props.name);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
    <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
      <InputLabel
        htmlFor={props.id || props.name}
        shrink={true}>
        {label}
      </InputLabel>
      <FilledInput
        {...field}
        {...props}
        type={showPassword ? 'text' : 'password'}
        placeholder={props.placeholder}
        className={props.className}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      </FormControl>
      <ErrorMessage name={props.name} component="p" className={props.errorClassName} />

    </>
  );
};

export default TextInputPassword;
