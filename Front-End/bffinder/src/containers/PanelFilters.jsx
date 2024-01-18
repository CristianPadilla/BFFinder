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
  startCleanCities,
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
import { date } from "yup";
import { specieApi } from "../api/specieApi";

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
  const dispatch = useDispatch();
  const { role, token } = useSelector((state) => state.persisted.auth);
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
  const vaccinesSelectOptions = [
    { label: "Vacunados", value: true },
    { label: "Sin vacunar / No sabe", value: false },
  ]
  const sterilizedSelectOptions = [
    { label: "Esterilizados", value: true },
    { label: "Sin esterilizar / No sabe", value: false },
  ]
  const dewormedSelectOptions = [
    { label: "Desparasitado", value: true },
    { label: "Sin desparasitar / No sabe", value: false },
  ]

  // STATUS
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
      : null;

  const breedsOptions = breeds.map((breed) => {
    return { label: t(`breeds.${breed.name}`), value: breed.id };
  });

  const breedOptionSelectedValue =
    filters.breed_id != null && filters.breed_id != 0
      ? breedsOptions.find((option) => option.value === filters.breed_id)
      : null;

  // DEPARTAMENTOS y CIUDADES
  const departmentsOptions = departments.map((department) => {
    return { label: department.name, value: department.id };
  });

  const departmentOptionSelectedValue =
    filters.department_id != null && filters.department_id != 0
      ? departmentsOptions.find(
        (option) => option.value === filters.department_id
      ) : { label: "", value: 0 };

  const citiesOptions = cities.map((city) => {
    return { label: city.name, value: city.id };
  });

  const cityOptionSelectedValue =
    filters.city_id != null && filters.city_id != 0
      ? citiesOptions.find((option) => option.value === filters.city_id)
      : { label: "", value: 0 };

  // FECHA
  const getDateSelectOptionValues = () => {
    const today = new Date();
    const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    const lastYear = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());

    return {
      today: today.toISOString().split('T')[0], // Formato: YYYY-MM-DD
      lastWeek: lastWeek.toISOString().split('T')[0],
      lastMonth: lastMonth.toISOString().split('T')[0],
      lastYear: lastYear.toISOString().split('T')[0],
    };
  };

  const dateSelectValues = (role === "u" && activeModule == "posts") ? getDateSelectOptionValues() : null;
  const dateSelectOptions = (role === "u" && activeModule == "posts")
    ? [
      { label: "Hoy", value: dateSelectValues.today },
      { label: "Semana actual", value: dateSelectValues.lastWeek },
      { label: "Mes actual", value: dateSelectValues.lastMonth },
      { label: "Año actual", value: dateSelectValues.lastYear },]
    : null;

  const dateSelectOptionSelectedValue =
    ((role === "u" && activeModule == "posts") && filters.from_date != null && filters.from_date != "")
      ? dateSelectOptions.find((option) => option.value === filters.from_date)
      : { label: "", value: "" };


  //GENDER
  const genderCurrentValue = filters.gender
  const sizeCurrentValue = filters.size

  // VACUNACION, ESTERILIZACION, DESPARASITACION
  const vaccinatedFilter = filters.vaccinated;
  const sterilizedFilter = filters.sterilized;
  const dewormedFilter = filters.dewormed;

  const vaccinedSelectSelectedValue = vaccinatedFilter != null
    ? vaccinesSelectOptions.find((option) => option.value === vaccinatedFilter)
    : { label: "", value: null };
  const sterilizedSelectSelectedValue = sterilizedFilter != null
    ? sterilizedSelectOptions.find((option) => option.value === sterilizedFilter)
    : { label: "", value: null };
  const dewormedSelectSelectedValue = dewormedFilter != null
    ? dewormedSelectOptions.find((option) => option.value === dewormedFilter)
    : { label: "", value: null };




  console.log("FILTROS ACTUALES== ", filters);


  const handleStatusFilterChange = (event, newValue) => {
    // console.log('handleStatusFilterChange==  : ', newValue);
    if (newValue === null && (filters.status === "" || filters.status === null)) return;
    const filterObjet = { ["status"]: newValue ? newValue.value : null };
    dispatch(changePostsRequest([filterObjet, { page: 0 }]));
  };
  const handlePostedFilterChange = (event, newValue) => {
    // console.log('handlePostedFilterChange==  : ', newValue);
    if (newValue === null && filters.posted === null) return;
    const filterObjet = {
      ["posted"]: newValue != null ? newValue.value : null,
    };
    dispatch(changePetsRequest([filterObjet, { page: 0 }]));
  };
  const handleSpecieSelectChange = (event, newValue) => {
    console.log('handleSpecieSelectChange==  : ', newValue);
    if (newValue === null && filters.specie_id === 0) return;
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
    if (newValue === null && filters.breed_id === 0) return;
    const filterObjet = { ["breed_id"]: newValue ? newValue.value : 0 };
    activeModuleIsPosts
      ? dispatch(changePostsRequest([filterObjet, { page: 0 }]))
      : dispatch(changePetsRequest([filterObjet, { page: 0 }]));
  };
  const handleDepartmentSelectChange = (event, newValue) => {
    // console.log("handleDepartmentSelectChange==  : ", newValue);
    if (newValue === null && filters.department_id === 0) return;
    const filterObjet = { ["department_id"]: newValue ? newValue.value : 0 };
    dispatch(startCleanCities());
    activeModuleIsPosts
      ? dispatch(changePostsRequest([filterObjet, { page: 0 }]))
      : dispatch(changePetsRequest([filterObjet, { page: 0 }]));

    console.log("falla aquii  : ", newValue);
    newValue != null && dispatch(startGetCitiesByDepartmentId(newValue.value));
  };
  const handleCitySelectChange = (event, newValue) => {
    console.log("handleCitySelectChange==  : ", newValue);
    if (!newValue && filters.city_id === 0) return;
    const filterObjet = { ["city_id"]: newValue ? newValue.value : 0 };
    activeModuleIsPosts
      ? dispatch(changePostsRequest([filterObjet, { page: 0 }]))
      : dispatch(changePetsRequest([filterObjet, { page: 0 }]));
  };
  const handleDateSelectFilterChange = (event, newValue) => {
    // console.log("handledateSelectFilterChange==  : ", newValue);
    if (!newValue && (filters.from_date === "")) return;
    const filterObjet = { ["from_date"]: newValue ? newValue.value : "" };
    activeModuleIsPosts
      ? dispatch(changePostsRequest([filterObjet, { page: 0 }]))
      : dispatch(changePetsRequest([filterObjet, { page: 0 }]));
  };
  const handleDatePickerChange = ({ target }) => {
    // console.log("handleDatePickerChange==  : ", target.value);

    const filterObjet = { ["from_date"]: target.value };
    activeModuleIsPosts
      ? dispatch(changePostsRequest([filterObjet, { page: 0 }]))
      : dispatch(changePetsRequest([filterObjet, { page: 0 }]));
  };
  const handleAgeSliceChange = ({ target }) => {
    const { value } = target;
    console.log("handleAgeSliceChange==  : ", value);

    // value > 10 && 
    const filterObjet = { ["age"]: value > 10 ? 50 : value };// 50 años como edad maxima
    activeModuleIsPosts
      ? dispatch(changePostsRequest([filterObjet, { page: 0 }]))
      : dispatch(changePetsRequest([filterObjet, { page: 0 }]));


  };
  const handleGenderChange = ({ target }) => {
    const { value } = target;
    if (value === undefined) return;
    // console.log("===handleGenderChange ", value)

    const filterObjet = { ["gender"]: value === genderCurrentValue ? "" : value };
    activeModuleIsPosts
      ? dispatch(changePostsRequest([filterObjet, { page: 0 }]))
      : dispatch(changePetsRequest([filterObjet, { page: 0 }]));

  }
  const handleSizeChange = ({ target }) => {
    const { value } = target;
    if (value === undefined) return;
    // console.log("===handleSizeChange ", value)

    const filterObjet = { ["size"]: value === sizeCurrentValue ? '' : value };
    activeModuleIsPosts
      ? dispatch(changePostsRequest([filterObjet, { page: 0 }]))
      : dispatch(changePetsRequest([filterObjet, { page: 0 }]));
  };
  const handleVaccinatedSelectChange = (event, newValue) => {
    // console.log("===handleVaccinatedSelectChange ", newValue)
    if (newValue === null && filters.vaccinated === null) return;
    const filterObjet = {
      ["vaccinated"]: newValue != null ? newValue.value : null,
    };
    dispatch(changePetsRequest([filterObjet, { page: 0 }]));
  }
  const handleSterilizedSelectChange = (event, newValue) => {
    // console.log("===handleSterilizedSelectChange ", newValue)
    if (newValue === null && filters.sterilized === null) return;
    const filterObjet = {
      ["sterilized"]: newValue != null ? newValue.value : null,
    };
    dispatch(changePetsRequest([filterObjet, { page: 0 }]));
  }
  const handleDewormedSelectChange = (event, newValue) => {
    // console.log("===handleDewormedSelectChange ", newValue)
    if (newValue === null && filters.dewormed === null) return;
    const filterObjet = {
      ["dewormed"]: newValue != null ? newValue.value : null,
    };
    dispatch(changePetsRequest([filterObjet, { page: 0 }]));
  }


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

      {
        role === "u" && activeModule == "posts" && (
          <SelectComponent
            fullWidth
            label="Fecha de publicación"
            name="date"
            onChange={handleDateSelectFilterChange}
            value={dateSelectOptionSelectedValue}
            options={dateSelectOptions}
            style={{ marginTop: "5px", marginBottom: "18px" }}
          />
        )
      }

      {role === "s" && activeModule == "posts" &&
        <DateInputComponent
          onChange={handleDatePickerChange}
          label="Fecha de publicación"
          value={filters.from_date ? filters.from_date : ""}
        />
      }

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

      {((role === "u" && activeModule === "posts") || (role === "s" && activeModule === "pets")) && (
        <>
          <FormGroup sx={{ marginTop: "12px" }}>
            <FormLabel sx={{ marginTop: 1 }}>Edad:</FormLabel>
            <Box sx={{ width: 260, margin: "auto" }}>
              <Slider
                aria-label="Edad"
                defaultValue={0}
                value={filters.age}
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
            label="Talla"
            name="size"
            value={sizeCurrentValue}
            onChange={handleSizeChange}
            options={[
              { label: "Pequeño", value: "s" },
              { label: "Mediano", value: "m" },
              { label: "Grande", value: "l" },
            ]}
            style={{ marginTop: "2.8rem", marginBottom: "10px" }}
          />

        </>
      )}




      <SelectComponent
        label="Especie"
        name="specie"
        // clearIcon={true}
        onChange={handleSpecieSelectChange}
        value={specieOptionSelectedValue}
        options={speciesOptions}
      />

      <SelectComponent
        label="Raza"
        name="breed"
        // clearIcon={true}
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

      {
        ((role === "u" && activeModule == "posts") || (role === "s" && activeModule === "pets")) &&

        <RadioComponent
          row
          label="Sexo"
          value={genderCurrentValue}
          onChange={handleGenderChange}
          // onClick={handleGenderChange}
          options={[
            { label: "Macho", value: "m" },
            { label: "Hembra", value: "f" },
          ]}
          style={{ marginBottom: "10px" }}
        />
      }
      {/* <Divider sx={{ marginTop: 1, marginBottom: 2 }}></Divider> */}

      {
        role === "s" && activeModule === "pets" && (
          <>
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
              onChange={handleVaccinatedSelectChange}
              value={vaccinedSelectSelectedValue}
              options={vaccinesSelectOptions}
            />

            <SelectComponent
              label="Esterilización"
              name="sterilized"
              onChange={handleSterilizedSelectChange}
              value={sterilizedSelectSelectedValue}
              options={sterilizedSelectOptions}
            />

            <SelectComponent
              label="Desparasitación"
              name="dewormed"
              onChange={handleDewormedSelectChange}
              value={dewormedSelectSelectedValue}
              options={dewormedSelectOptions}
            />
            <Divider sx={{ marginTop: 1, marginBottom: 2 }}></Divider></>
        )
      }

    </>
  );
};

export default PanelFilters;
