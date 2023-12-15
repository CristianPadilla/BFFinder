import React, { useState, ChangeEvent } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
// import { useTheme } from '@mui/material/styles';

const Ordering = ({ onSortChange }) => {
  const [activeChip, setActiveChip] = useState("");

  const handleSortChange = (sortType) => {
    if (activeChip !== sortType) {
      setActiveChip(sortType);
      onSortChange(sortType);
    }
  };

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  // const theme = useTheme();

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        
      {/* <Typography variant="body1" sx={{ marginRight: 1, fontSize: '1.1rem' }} >
        Ordenar por nombre:
      </Typography>

      <Stack direction="row">
        <Chip
          label="A-Z"
          onClick={() => handleSortChange("nameAsc")}
          variant={activeChip === "nameAsc" ? "filled" : "outlined"}
          color={activeChip === "nameAsc" ? "warning" : "default"}
          sx={{ backgroundColor: activeChip === "nameAsc" ? "#BA8C63" : "white",
          color: activeChip === "nameAsc" ? "white" : "black",
          borderRadius: '16px 0 0 16px',
          '&:hover': {
            backgroundColor: activeChip === "nameAsc" ? "#BA8C63" : "white !important",
            color: activeChip === "nameAsc" ? "white" : "#BA8C63",
          }, }}
        />
         <Chip
          label="Z-A"
          onClick={() => handleSortChange("nameDesc")}
          variant={activeChip === "nameDesc" ? "filled" : "outlined"}
          color={activeChip === "nameDesc" ? "warning" : "default"}
          sx={{ backgroundColor: activeChip === "nameDesc" ? "#BA8C63" : "white",
          color: activeChip === "nameDesc" ? "white" : "black",
          borderRadius: '0 16px 16px 0',
          mr: '1.5rem',
          '&:hover': {
            backgroundColor: activeChip === "nameDesc" ? "#BA8C63" : "white !important",
            color: activeChip === "nameDesc" ? "white" : "#BA8C63",
          }, }}
        />
      </Stack> */}

      <Typography variant="body1" sx={{ marginRight: 1, fontSize: '1.1rem' }}>
        Ordenar por:
      </Typography>
      <Stack direction="row">
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <Select
        id="demo-select-small"
        value={10}
        onChange={handleChange}
        sx={{ backgroundColor: 'white', mr: '1.8rem' }}
      >
        <MenuItem value={10}>Mas recientes</MenuItem>
        <MenuItem value={20}>Mas antiguos</MenuItem>
        <MenuItem value={30}>Edad: Menor a Mayor</MenuItem>
        <MenuItem value={40}>Edad: Mayor a Menor</MenuItem>
      </Select>
    </FormControl>
      </Stack>

      {/* <Typography variant="body1" sx={{ marginRight: 1, fontSize: '1.1rem' }} >
        Edad:
      </Typography>

      <Stack direction="row">
        <Chip
          label="Menor a Mayor"
          onClick={() => handleSortChange("nameAsc")}
          variant={activeChip === "nameAsc" ? "filled" : "outlined"}
          color={activeChip === "nameAsc" ? "warning" : "default"}
          sx={{ backgroundColor: activeChip === "nameAsc" ? "#BA8C63" : "white",
          color: activeChip === "nameAsc" ? "white" : "black",
          borderRadius: '16px 0 0 16px',
          '&:hover': {
            backgroundColor: activeChip === "nameAsc" ? "#BA8C63" : "white !important",
            color: activeChip === "nameAsc" ? "white" : "#BA8C63",
          }, }}
        />
         <Chip
          label="Mayor a Menor"
          onClick={() => handleSortChange("nameDesc")}
          variant={activeChip === "nameDesc" ? "filled" : "outlined"}
          color={activeChip === "nameDesc" ? "warning" : "default"}
          sx={{ backgroundColor: activeChip === "nameDesc" ? "#BA8C63" : "white",
          color: activeChip === "nameDesc" ? "white" : "black",
          borderRadius: '0 16px 16px 0',
          mr: '1.5rem',
          '&:hover': {
            backgroundColor: activeChip === "nameDesc" ? "#BA8C63" : "white !important",
            color: activeChip === "nameDesc" ? "white" : "#BA8C63",
          }, }}
        />
      </Stack> */}

    </div>
    </div>
  );
};

export default Ordering;
