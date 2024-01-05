import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useField, ErrorMessage } from 'formik';
import OutlinedInput from '@mui/material/OutlinedInput';
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
    <FormControl sx={{ m: 1, width: '27ch' }} variant="filled" margin="normal">
      <InputLabel
        htmlFor={props.id || props.name}
        shrink={true}>
        {label}
      </InputLabel>
      <OutlinedInput
        {...field}
        {...props}
        type={showPassword ? 'text' : 'password'}
        placeholder={props.placeholder}
        className={props.className}
        error={meta.touched && !!meta.error}
        helperText={meta.touched ? meta.error : ''}
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

      {/* <div style={{ textAlign: "center", marginTop: "-7px" }}>
        <ErrorMessage
          name={props.name}
          component="span"
          className={props.errorClassName}
          style={{ fontSize: ".8rem"  }}
        />
      </div> */}

    </>
  );
};

export default TextInputPassword;
