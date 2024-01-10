import React from 'react';
import TextField from '@mui/material/TextField';

const DateInputComponent = ({ label, width }) => {
  const [selectedDate, setSelectedDate] = React.useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <TextField
      id="date"
      label={label || "Fecha"}
      type="date"
      value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''} 
      onChange={(e) => handleDateChange(e.target.value ? new Date(e.target.value) : null)}
      InputLabelProps={{
        shrink: true,
      }}
      sx={{ width: width || "100%" }}
    />
  );
};

export default DateInputComponent;
