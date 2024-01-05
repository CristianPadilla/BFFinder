import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

function ValueSliderLabel(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      <span>
        <Typography>
          {value === 0
            ? 'Todas\nlas edades'
            : value === 1
            ? 'Hasta\n1 año'
            : value === 11
            ? '10 años+'
            : `Hasta\n${value} años`}
        </Typography>
        {children}
      </span>
    </Tooltip>
  );
}
