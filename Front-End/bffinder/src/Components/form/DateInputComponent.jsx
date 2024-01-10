import React from 'react';
import TextField from '@mui/material/TextField';

const DateInputComponent = ({ label, width, onChange, value }) => {
  const [selectedDate, setSelectedDate] = React.useState(null);


  return (
    <TextField
      id="date"
      label={label || "Fecha"}
      type="date"
      value={value}
      onChange={onChange}
      InputLabelProps={{
        shrink: true,
      }}
      sx={{ width: width || "100%" }}
    />
  );
};

export default DateInputComponent;
