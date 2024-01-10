import React from 'react';
import { InputAdornment,
IconButton,
OutlinedInput,
InputLabel,
FormControl,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useField, ErrorMessage } from 'formik';
import { FormHelperText } from '@mui/material';

const TextInputPassword = (props) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [field, meta] = useField(props);
  const error = meta.touched && !!meta.error;
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <FormControl sx={{ m: 1, width: '27ch' }} variant="filled" margin="normal" error={error}>
        <InputLabel
          htmlFor={props.id || props.name}
          shrink={true}>
          {props.label}
        </InputLabel>
        <OutlinedInput
          {...field}
          {...props}
          type={showPassword ? 'text' : 'password'}
          placeholder={props.placeholder}
          className={props.className}
          error={meta.touched && !!meta.error}

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
        {error && <FormHelperText id="my-input-error-text">{meta.touched ? meta.error : ''}</FormHelperText>}
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
