import React, { useEffect, useState } from "react";
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
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import SelectComponent from "../Components/form/SelectComponent";
import RadioComponent from "../Components/form/RadioComponent";
// import styled from "styled-components";
import { styled } from "@mui/material/styles";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { act } from "react-dom/test-utils";
import {
  changePostsRequest,
  setCities,
  startGetCitiesByDepartmentId,
  startGetDepartments,
} from "../store/post";
import {
  changePetsRequest,
  startGetBreedsBySpecieId,
  startGetSpecies,
} from "../store/pet";
import { t, use } from "i18next";
import DateInputComponent from "../Components/form/DateInputComponent";

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
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.persisted.auth);
  const { activeModule } = useSelector((state) => state.persisted.global);
  const activeModuleIsPosts = activeModule === "posts" ? true : false;

  const filters =
    activeModule === "posts"
      ? useSelector((state) => state.posts.postRequest.filters)
      : useSelector((state) => state.pets.petsRequest);

  const { species, breeds } = activeModuleIsPosts
    ? useSelector((state) => state.posts)
    : useSelector((state) => state.pets);

  const { departments, cities } = useSelector((state) => state.posts);

  useEffect(() => {
    console.log("consultando especies == ", species);
    if (!species || species.length === 0) dispatch(startGetSpecies());
    if (!departments || departments.length === 0)
      dispatch(startGetDepartments());
  }, [activeModule]);

  // ESTADOS
  const statusSelectOptions = [
    { label: "Activas", value: "A" },
    { label: "Inactivas", value: "I" },
  ];
  const postedSelectOptions = [
    { label: "Publicados", value: true },
    { label: "Sin publicar", value: false },
  ];
  const statusFilter = activeModuleIsPosts ? filters.status : filters.posted;

  const statusFilterSelectedValue = statusFilter
    ? statusSelectOptions.find((option) => option.value === statusFilter)
    : { label: "Todos", value: null };
  const postedFilterSelectedValue =
    statusFilter != null
      ? postedSelectOptions.find((option) => option.value === statusFilter)
      : { label: "Todos", value: null };

  // ESPECIES y RAZAS
  const speciesOptions = species.map((specie) => {
    return { label: t(`pluralSpecies.${specie.name}`), value: specie.id };
  });
  const specieOptionSelectedValue =
    filters.specie_id != null && filters.specie_id != 0
      ? speciesOptions.find((option) => option.value === filters.specie_id)
      : { label: "", value: null };

  const breedsOptions = breeds.map((breed) => {
    return { label: t(`breeds.${breed.name}`), value: breed.id };
  });

  const breedOptionSelectedValue =
    filters.breed_id != null && filters.breed_id != 0
      ? breedsOptions.find((option) => option.value === filters.breed_id)
      : { label: "", value: null };

  // DEPARTAMENTOS y CIUDADES
  const departmentsOptions = departments.map((department) => {
    return { label: department.name, value: department.id };
  });

  const departmentOptionSelectedValue =
    filters.department_id != null && filters.department_id != 0
      ? departmentsOptions.find(
          (option) => option.value === filters.department_id
        )
      : { label: "", value: 0 };

  const citiesOptions = cities.map((city) => {
    return { label: city.name, value: city.id };
  });

  const cityOptionSelectedValue =
    filters.city_id != null && filters.city_id != 0
      ? citiesOptions.find((option) => option.value === filters.city_id)
      : { label: "", value: 0 };

  console.log("FILTROS ACTUALES== ", filters);
  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleStatusFilterChange = (event, newValue) => {
    // console.log('handleStatusFilterChange==  : ', newValue);
    const filterObjet = { ["status"]: newValue ? newValue.value : null };
    dispatch(changePostsRequest([filterObjet, { page: 0 }]));
  };
  const handlePostedFilterChange = (event, newValue) => {
    // console.log('handlePostedFilterChange==  : ', newValue);
    const filterObjet = {
      ["posted"]: newValue != null ? newValue.value : null,
    };
    dispatch(changePetsRequest([filterObjet, { page: 0 }]));
  };
  const handleSpecieSelectChange = (event, newValue) => {
    // console.log('handleSpecieSelectChange==  : ', newValue);
    const filterObjet = { ["specie_id"]: newValue ? newValue.value : 0 };
    activeModuleIsPosts
      ? dispatch(changePostsRequest([filterObjet, { page: 0 }]))
      : dispatch(changePetsRequest([filterObjet, { page: 0 }]));

    // activeModuleIsPosts?
    dispatch(startGetBreedsBySpecieId(newValue ? newValue.value : 0));
    handleBreedSelectChange(null, 0);
  };
  const handleBreedSelectChange = (event, newValue) => {
    // console.log('handleBreedSelectChange==  : ', newValue);
    const filterObjet = { ["breed_id"]: newValue ? newValue.value : 0 };
    activeModuleIsPosts
      ? dispatch(changePostsRequest([filterObjet, { page: 0 }]))
      : dispatch(changePetsRequest([filterObjet, { page: 0 }]));
  };
  const handleDepartmentSelectChange = (event, newValue) => {
    console.log("handleDepartmentSelectChange==  : ", newValue);
    const filterObjet = { ["department_id"]: newValue ? newValue.value : 0 };
    activeModuleIsPosts
      ? dispatch(changePostsRequest([filterObjet, { page: 0 }]))
      : dispatch(changePetsRequest([filterObjet, { page: 0 }]));

    if (!newValue || newValue.value === 0) {
      dispatch(setCities([]));
      return;
    }
    dispatch(startGetCitiesByDepartmentId(newValue.value));
  };
  const handleCitySelectChange = (event, newValue) => {
    console.log("handleCitySelectChange==  : ", newValue);
    const filterObjet = { ["city_id"]: newValue ? newValue.value : 0 };
    activeModuleIsPosts
      ? dispatch(changePostsRequest([filterObjet, { page: 0 }]))
      : dispatch(changePetsRequest([filterObjet, { page: 0 }]));
  };
  const handleAgeSliceChange = (event) => {
    console.log("handleAgeSliceChange==  : ", event.target.value);
  };

  console.log("ciudades  == ", cities);
  // ChipsFiltros
  const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));
  const [chipData, setChipData] = React.useState([
    { key: 0, label: "Angular" },
    { key: 1, label: "jQuery" },
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
      {role === "s" && activeModule == "posts" && (
        <SelectComponent
          fullWidth
          label={"Estado"}
          name={"status"}
          onChange={handleStatusFilterChange}
          value={statusFilterSelectedValue}
          options={statusSelectOptions}
          style={{ marginTop: "10px" }}
        />
      )}
      {role === "s" && activeModule == "pets" && (
        <SelectComponent
          fullWidth
          label={"Publicación"}
          name={"posted"}
          onChange={handlePostedFilterChange}
          value={postedFilterSelectedValue}
          options={postedSelectOptions}
          style={{ marginTop: "10px" }}
        />
      )}
      <SelectComponent
        fullWidth
        label="Fecha de subida"
        name="date"
        // onChange={handleFilterChange}
        // value={selectedFilter}
        options={[
          { label: "Hoy", value: 1 },
          { label: "Semana actual", value: 2 },
          { label: "Mes actual", value: 3 },
          { label: "Año actual", value: 4 },
        ]}
        style={{ marginTop: "5px", marginBottom: "18px" }}
      />

      <DateInputComponent label="Fecha" />

      {role === "u" && activeModule == "posts" && (
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
      )}
      {role === "u" && activeModule == "posts" && (
        <SelectComponent
          fullWidth
          label="Departamento"
          name="department"
          onChange={handleDepartmentSelectChange}
          value={departmentOptionSelectedValue}
          options={departmentsOptions}
          // style={{ marginTop: "25px" }}
        />
      )}
      {role === "u" && activeModule == "posts" && (
        <SelectComponent
          label="Municipio"
          name="city"
          onChange={handleCitySelectChange}
          value={cityOptionSelectedValue}
          options={citiesOptions}
        />
      )}

      {role === "u" && activeModule == "posts" && (
        <Divider sx={{ marginTop: 1, marginBottom: 2 }}></Divider>
      )}

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
            onChange={handleAgeSliceChange}
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
        label="Especie"
        name="specie"
        onChange={handleSpecieSelectChange}
        value={specieOptionSelectedValue}
        options={speciesOptions}
      />

      <SelectComponent
        label="Raza"
        name="breed"
        onChange={handleBreedSelectChange}
        value={breedOptionSelectedValue}
        options={breedsOptions}
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

      {/* <SelectComponent
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
      /> */}
      <Divider sx={{ marginTop: 1, marginBottom: 2 }}></Divider>
    </>
  );
};

export default PanelFilters;
