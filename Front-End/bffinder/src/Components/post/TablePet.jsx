import React from 'react';
import { Table, TableBody, TableRow, Paper } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import { styled } from '@mui/system';

const StyledTableCell = styled(TableCell)({
  padding: '10px',
  fontSize: '0.8rem',
});

const PetInfoTable = ({ petInfo }) => {
  return (
    <Paper elevation={0} variant="outlined">
      <Table>
        <TableBody>
          {Object.entries(petInfo).map(([key, value]) => (
            <TableRow key={key}>
              <StyledTableCell>{key}</StyledTableCell>
              <StyledTableCell>{value.toString()}</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

const TablePet = () => {
  const petInfo = {
    Peso: '5 kg',
    Año: 2020,
    Tamaño: 'Mediano',
    Peligroso: false,
    Vacunado: true,
    Esterilizado: true,
    Desparasitado: false,
  };

  return (
    <div>
      <PetInfoTable petInfo={petInfo} />
    </div>
  );
};

export default TablePet;
