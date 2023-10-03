import React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormLabel,
} from "@mui/material";
// import FormLabel from '@mui/material/FormLabel';

const PanelFilters = () => {
  const [selectedFilter, setSelectedFilter] = React.useState("");

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  return (
    <div>

<FormLabel component="legend">Departamento</FormLabel>
<FormControl className="filter-container">
        <InputLabel id="filter-label">Selecciona un departamento</InputLabel>
        <Select
          labelId="filter-label"
          id="filter"
          value={selectedFilter}
          onChange={handleFilterChange}
          label="Filtrar por..."
        >
          <MenuItem value="valledelcauca">Valle del Cauca</MenuItem>
          <MenuItem value="vaupes">Vaupés</MenuItem>
          <MenuItem value="vichada">Vichada</MenuItem>
        </Select>
      </FormControl>

      <FormLabel component="legend">Ciudad</FormLabel>
<FormControl className="filter-container">
        <InputLabel id="filter-label">Seleccione una ciudad</InputLabel>
        <Select
          labelId="filter-label"
          id="filter"
          value={selectedFilter}
          onChange={handleFilterChange}
          label="Filtrar por..."
        >
          <MenuItem value="cali">Cali</MenuItem>
          <MenuItem value="buga">Buga</MenuItem>
          <MenuItem value="buenaventura">Buenaventura</MenuItem>
        </Select>
      </FormControl>

      <hr />
      <FormGroup>
        <FormLabel component="legend">Especie</FormLabel>
        <FormControlLabel control={<Checkbox />} label="Perro" />
        <FormControlLabel control={<Checkbox />} label="Gato" />

        <hr />
        <FormLabel component="legend">Tamaño</FormLabel>
        <FormControlLabel control={<Checkbox />} label="Grande" />
        <FormControlLabel control={<Checkbox />} label="Mediano" />
        <FormControlLabel control={<Checkbox />} label="Pequeño" />        

        <hr />
        <FormLabel component="legend">Raza</FormLabel>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />

      </FormGroup>

    </div>
  );
};

export default PanelFilters;
