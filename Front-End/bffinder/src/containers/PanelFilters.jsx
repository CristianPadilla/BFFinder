import React, { useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import {
  FormLabel,
  Divider,
  Box,
  Slider,
  Typography,
  Tooltip,
  ListItem,
  Chip,
} from "@mui/material";
import { useSelector } from "react-redux";
import SelectComponent from "../Components/form/SelectComponent";
import RadioComponent from "../Components/form/RadioComponent";
// import styled from "styled-components";
import { styled } from "@mui/material/styles";
import TagFacesIcon from "@mui/icons-material/TagFaces";

function ValueLabel(props) {
  const { children, open, value } = props;

  const labelText =
    value === 0
      ? "Todas\nlas edades"
      : value === 1
      ? "Hasta\n1 año"
      : value === 11
      ? "10 años+"
      : `Hasta\n${value} años`;

  return (
    <Tooltip
      open={open}
      disableTouchListener
      enterTouchDelay={0}
      placement="bottom"
      title={
        <Typography sx={{ fontSize: ".8rem", whiteSpace: "pre-line" }}>
          {labelText}
        </Typography>
      }
      sx={{ borderRadius: "5px" }}
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
  const [selectedSize, setSelectedSize] = useState("");
  const { role } = useSelector((state) => state.persisted.auth);

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  // ChipsFiltros
  const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));
  const [chipData, setChipData] = React.useState([
    { key: 0, label: "Angular" },
    { key: 1, label: "jQuery" },
    { key: 2, label: "Polymer" },
    { key: 3, label: "Vue.js" },
    { key: 4, label: "JavaScript" },
  ]);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          margin: "1.7rem 1rem .1rem 1rem",
        }}
      >
        {chipData.map((data) => {
          let icon;

          // if (data.label === "React") {
          //   icon = <TagFacesIcon />;
          // }

          return (
            <ListItem key={data.key}>
              <Chip
                icon={icon}
                label={data.label}
                onDelete={
                  data.label === "React" ? undefined : handleDelete(data)
                }
              />
            </ListItem>
          );
        })}
      </div>

      <SelectComponent
        fullWidth
        label="Estado"
        name="state"
        onChange={handleFilterChange}
        value={selectedFilter}
        options={[
          { label: "Todos", value: 1 },
          { label: "Publicado", value: 2 },
          { label: "Sin publicar", value: 3 },
        ]}
        style={{ marginTop: "10px" }}
      />

      <Divider
        sx={{
          marginTop: 3,
          marginBottom: 1,
          color: "#A77A23",
          fontWeight: "600",
        }}
      >
        Ubicación
      </Divider>

      <SelectComponent
        fullWidth
        label="Selecciona un departamento"
        name="department"
        onChange={handleFilterChange}
        value={selectedFilter}
        options={[
          { label: "Valle del Cauca", value: 1 },
          { label: "Vaupés", value: 2 },
          { label: "Vichada", value: 3 },
        ]}
        // style={{ marginTop: "25px" }}
      />

      <SelectComponent
        label="Seleccione una ciudad"
        name="city"
        onChange={handleFilterChange}
        value={selectedFilter}
        options={[
          { label: "Cali", value: 1 },
          { label: "Buga", value: 2 },
          { label: "Buenaventura", value: 3 },
        ]}
      />
      <Divider sx={{ marginTop: 1, marginBottom: 2 }}></Divider>

      <Divider
        sx={{
          marginTop: 3,
          marginBottom: 1,
          color: "#A77A23",
          fontWeight: "600",
        }}
      >
        Caracteristicas
      </Divider>

      <FormGroup sx={{ marginTop: "12px" }}>
        <FormLabel sx={{ marginTop: 1 }}>Edad:</FormLabel>
        <Box sx={{ width: 260, margin: "auto" }}>
          <Slider
            aria-label="Edad"
            defaultValue={0}
            valueLabelDisplay="auto"
            color="warning"
            step={null}
            max={11}
            marks={marks}
            components={{ ValueLabel }}
          />
        </Box>
      </FormGroup>

      <RadioComponent
        label="Tamaño:"
        name="size"
        value={selectedSize}
        onChange={handleSizeChange}
        options={[
          { label: "Pequeño", value: "pequeño" },
          { label: "Mediano", value: "mediano" },
          { label: "Grande", value: "grande" },
        ]}
        style={{ marginTop: "2.8rem", marginBottom: "10px" }}
      />

      <SelectComponent
        label="Seleccione una especie"
        name="specie"
        onChange={handleFilterChange}
        value={selectedFilter}
        options={[
          { label: "Gatos", value: 1 },
          { label: "Perros", value: 2 },
          { label: "Otros", value: 3 },
        ]}
      />

      <SelectComponent
        label="Seleccione una raza"
        name="breed"
        onChange={handleFilterChange}
        value={selectedFilter}
        options={[
          { label: "Pitbull", value: 1 },
          { label: "Siamese", value: 2 },
          { label: "Otros", value: 3 },
        ]}
      />
      {/* <FormLabel component="legend">Raza</FormLabel>
      <FormControl
        className="filter-container"
        fullWidth
        id="margin-normal"
        margin="normal"
      >
        <InputLabel id="filter-label" sx={{ fontSize: "1.3rem" }}>
          Seleccione una raza
        </InputLabel>
        <Select
          labelId="filter-label"
          id="filter"
          label="Seleccione una raza"
          value={selectedFilter}
          onChange={handleFilterChange}
          sx={{ "& label": { fontSize: "1.3rem !important" } }}
        >
          <MenuItem value="gatos">Gatos</MenuItem>
          <MenuItem value="perros">Perros</MenuItem>
          <MenuItem value="otros">Otros</MenuItem>
        </Select>
      </FormControl> */}

      <RadioComponent
        row
        label="Genero:"
        name="gender"
        value={selectedSize}
        onChange={handleSizeChange}
        options={[
          { label: "Macho", value: "m" },
          { label: "Hembra", value: "f" },
        ]}
        style={{ marginBottom: "10px" }}
      />
      <Divider sx={{ marginTop: 1, marginBottom: 2 }}></Divider>

      <Divider
        sx={{
          marginTop: 3,
          marginBottom: 1,
          color: "#A77A23",
          fontWeight: "600",
        }}
      >
        Salud
      </Divider>

      <SelectComponent
        label="Vacunación"
        name="vaccinated"
        onChange={handleFilterChange}
        value={selectedFilter}
        options={[
          { label: "Vacunados y sin vacunar", value: 1 },
          { label: "Vacunado", value: 2 },
          { label: "Sin vacunar (no se sabe)", value: 3 },
        ]}
      />

      <SelectComponent
        label="Esterilización"
        name="sterilized"
        onChange={handleFilterChange}
        value={selectedFilter}
        options={[
          { label: "Con y sin esterilización", value: 1 },
          { label: "Esterilizado", value: 2 },
          { label: "Sin esterilizar (no se sabe)", value: 3 },
        ]}
      />

      <SelectComponent
        label="Desparasitación"
        name="dewormed"
        onChange={handleFilterChange}
        value={selectedFilter}
        options={[
          { label: "Con y sin desparasitación", value: 1 },
          { label: "Desparasitado", value: 2 },
          { label: "Sin desparasitar (no se sabe)", value: 3 },
        ]}
      />
      <Divider sx={{ marginTop: 1, marginBottom: 2 }}></Divider>
    </>
  );
};

export default PanelFilters;
