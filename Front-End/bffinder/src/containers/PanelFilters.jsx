import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormLabel,
  Divider,
  Radio,
  RadioGroup,
  Box,
  Slider,
  Typography,
  Tooltip,
} from "@mui/material";
import { useSelector } from "react-redux";

function ValueLabel(props) {
  const { children, open, value } = props;

  const labelText =
    value === 0
      ? 'Todas\nlas edades'
      : value === 1
      ? 'Hasta\n1 año'
      : value === 11
      ? '10 años+'
      : `Hasta\n${value} años`;

  return (
    <Tooltip
      open={open}
      disableTouchListener
      enterTouchDelay={0}
      placement="bottom"
      title={<Typography sx={{ fontSize: '.8rem', whiteSpace: 'pre-line' }}>{labelText}</Typography>}
      sx={{ borderRadius: '5px' }}
    >
      {children}
    </Tooltip>
  );
}

const marks = [
  { value: 0 },
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
  { value: 5 },
  { value: 6 },
  { value: 7 },
  { value: 8 },
  { value: 9 },
  { value: 10 },
  { value: 11 },
];

const PanelFilters = ({ module }) => {
  const [selectedFilter, setSelectedFilter] = React.useState("");

  const { role } = useSelector(state => state.auth.auth);

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  console.log("active module", module);

  return (
    <div>

<FormControl sx={{ marginTop: "25px" }} className="filter-container" fullWidth id="margin-normal" margin="normal" >
        <InputLabel id="filter-label">Estado</InputLabel>
        <Select
          label="Estado"
          id="filter"
          value={selectedFilter}
          onChange={handleFilterChange}
        >
          <MenuItem value="todos">Todos</MenuItem>
          <MenuItem value="publicado">Publicado</MenuItem>
          <MenuItem value="sin publicar">Sin publicar</MenuItem>
        </Select>
      </FormControl>

<Divider sx={{ marginTop: 3, marginBottom: 1, color: "#A77A23", fontWeight: "600" }} >Ubicación</Divider>

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
      <Divider sx={{ marginTop: 1, marginBottom: 2 }} ></Divider>

      <Divider sx={{ marginTop: 3, marginBottom: 1, color: "#A77A23", fontWeight: "600" }}>Caracteristicas</Divider>

      <FormGroup sx={{ marginTop: "12px" }}>
      <FormLabel sx={{ marginTop: 1}}>Edad:</FormLabel>
      <Box sx={{ width: 260, margin: 'auto' }}>
      <Slider
        aria-label="Edad"
        defaultValue={0}
        valueLabelDisplay="on"
        color="warning"
        step={null}
        max={11}
        marks={marks}
        components={{ ValueLabel }}
      />
    </Box>
    </FormGroup>

      <FormGroup sx={{ marginTop: 8, marginBottom: 1}}>
      <FormLabel id="demo-row-radio-buttons-group-label">Tamaño:</FormLabel>
      <RadioGroup
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="pequeño" control={<Radio />} label="Pequeño" />
        <FormControlLabel value="mediano" control={<Radio />} label="Mediano" />
        <FormControlLabel value="grande" control={<Radio />} label="Grande" />
      </RadioGroup>      
      </FormGroup>

      {/* <FormLabel component="legend">Especie</FormLabel> */}
      <FormControl className="filter-container" fullWidth id="margin-normal" margin="normal" >
        <InputLabel id="filter-label">Seleccione una especie</InputLabel>
        <Select
          labelId="filter-label"
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
        <InputLabel id="filter-label" sx={{ fontSize: "1.3rem"}}>Seleccione una raza</InputLabel>
        <Select
          labelId="filter-label"
          id="filter"         
          label="Seleccione una raza"
          value={selectedFilter}
          onChange={handleFilterChange}
          sx={{ "& label": { fontSize: "1.3rem !important"} }}
        >
          <MenuItem value="gatos">Gatos</MenuItem>
          <MenuItem value="perros">Perros</MenuItem>
          <MenuItem value="otros">Otros</MenuItem>
        </Select>
      </FormControl>

      <FormGroup sx={{ marginTop: "12px" }}>
      <FormLabel id="demo-row-radio-buttons-group-label">Genero:</FormLabel>
      <RadioGroup
      row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="macho" control={<Radio />} label="Macho" />
        <FormControlLabel value="hembra" control={<Radio />} label="Hembra" />
        {/* <FormControlLabel value="Todos" control={<Radio />} label="Todos" /> */}
      </RadioGroup>      
      </FormGroup>

      <Divider sx={{ marginTop: 1, marginBottom: 2 }}></Divider>

      <Divider sx={{ marginTop: 3, marginBottom: 1, color: "#A77A23", fontWeight: "600" }}>Salud</Divider> 
        {/* <FormLabel component="legend">Especie</FormLabel> */}
        <FormControl className="filter-container" fullWidth id="margin-normal" margin="normal" >
        <InputLabel id="filter-label">Vacunación</InputLabel>
        <Select
          labelId="filter-label"
          label="Vacunacion"
          id="filter"
          value={selectedFilter}
          onChange={handleFilterChange}
        >
          <MenuItem value="vacunados y sin vacunar">Vacunados y sin vacunar</MenuItem>
          <MenuItem value="vacunado">Vacunado</MenuItem>
          <MenuItem value="sin vacunar">Sin vacunar (no se sabe)</MenuItem>
        </Select>
      </FormControl>

      <FormControl className="filter-container" fullWidth id="margin-normal" margin="normal" >
      {/* <FormLabel id="demo-row-radio-buttons-group-label">Esterilizado:</FormLabel> */}
      <InputLabel id="filter-label" >Esterilización</InputLabel>
        <Select
          labelId="filter-label"
          id="filter"         
          label="Esterilizacion"
          value={selectedFilter}
          onChange={handleFilterChange}
        >
          <MenuItem value="con y sin esterilizacion">Con y sin esterilización</MenuItem>
          <MenuItem value="esterilizado">Esterilizado</MenuItem>
          <MenuItem value="sin esterilizar">Sin esterilizar (no se sabe)</MenuItem>
        </Select>    
      </FormControl>

      <FormControl className="filter-container" fullWidth id="margin-normal" margin="normal" >
      {/* <FormLabel id="demo-row-radio-buttons-group-label">Desparasitado:</FormLabel> */}
      <InputLabel id="filter-label" >Desparasitación</InputLabel>
        <Select
          labelId="filter-label"
          id="filter"         
          label="Desparasitacion"
          value={selectedFilter}
          onChange={handleFilterChange}
        >
          <MenuItem value="con y sin desparasitación">Con y sin desparasitación</MenuItem>
          <MenuItem value="desparasitado">Desparasitado</MenuItem>
          <MenuItem value="sin desparasitar">Sin desparasitar (no se sabe)</MenuItem>
        </Select>    
      </FormControl>

      <Divider sx={{ marginTop: 1, marginBottom: 2 }} ></Divider>
    </div>
  );
};

export default PanelFilters;
