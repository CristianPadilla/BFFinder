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
import Divider from '@mui/material/Divider';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
// import FormLabel from '@mui/material/FormLabel';

const PanelFilters = () => {
  const [selectedFilter, setSelectedFilter] = React.useState("");

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  return (
    <div>

{/* <FormLabel component="legend">Departamento</FormLabel> */}
<FormControl className="filter-container" fullWidth id="margin-normal" margin="normal" >
        <InputLabel id="filter-label">Selecciona un departamento</InputLabel>
        <Select
          label="Selecciona un departamento"
          id="filter"
          value={selectedFilter}
          onChange={handleFilterChange}
        >
          <MenuItem value="valledelcauca">Valle del Cauca</MenuItem>
          <MenuItem value="vaupes">Vaupés</MenuItem>
          <MenuItem value="vichada">Vichada</MenuItem>
        </Select>
      </FormControl>

      {/* <FormLabel component="legend">Ciudad</FormLabel> */}
      <FormControl className="filter-container" fullWidth id="margin-normal" margin="normal">
        <InputLabel id="filter-label">Seleccione una ciudad</InputLabel>
        <Select
          label="Seleccione una ciudad"
          id="filter"
          value={selectedFilter}
          onChange={handleFilterChange}
        >
          <MenuItem value="cali">Cali</MenuItem>
          <MenuItem value="buga">Buga</MenuItem>
          <MenuItem value="buenaventura">Buenaventura</MenuItem>
        </Select>
      </FormControl>
      <Divider>Caracteristicas</Divider>

      <FormGroup>
      <FormLabel id="demo-row-radio-buttons-group-label">Tamaño:</FormLabel>
      <RadioGroup
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="Pequeño" control={<Radio />} label="Pequeño" />
        <FormControlLabel value="Mediano" control={<Radio />} label="Mediano" />
        <FormControlLabel value="Grande" control={<Radio />} label="Grande" />
      </RadioGroup>      
      </FormGroup>

      {/* <FormLabel component="legend">Especie</FormLabel> */}
      <FormControl className="filter-container" fullWidth id="margin-normal" margin="normal" >
        <InputLabel id="filter-label">Seleccione una especie</InputLabel>
        <Select
          label="Seleccione una especie"
          id="filter"
          value={selectedFilter}
          onChange={handleFilterChange}
        >
          <MenuItem value="gatos">Gatos</MenuItem>
          <MenuItem value="perros">Perros</MenuItem>
          <MenuItem value="otros">Otros</MenuItem>
        </Select>
      </FormControl>
      
      {/* <FormLabel component="legend">Raza</FormLabel> */}
      <FormControl className="filter-container" fullWidth id="margin-normal" margin="normal">
        <InputLabel id="filter-label">Seleccione una raza </InputLabel>
        <Select
          label="Seleccione una raza"
          id="filter"
          value={selectedFilter}
          onChange={handleFilterChange}
        >
          <MenuItem value="gatos">Gatos</MenuItem>
          <MenuItem value="perros">Perros</MenuItem>
          <MenuItem value="otros">Otros</MenuItem>
        </Select>
      </FormControl>
      <Divider></Divider>
    </div>
  );
};

export default PanelFilters;
