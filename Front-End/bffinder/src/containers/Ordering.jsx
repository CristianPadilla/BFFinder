import React, { useState, ChangeEvent } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { changePostsRequest } from "../store/post";
import { changePetsRequest } from "../store/pet";
import { act } from "react-dom/test-utils";
// import { useTheme } from '@mui/material/styles';

const Ordering = () => {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.persisted.auth);
  const { activeModule } = useSelector((state) => state.persisted.global);

  const { sort, desc } =
    activeModule === "posts"
      ? useSelector((state) => state.posts.postRequest.sorting)
      : useSelector((state) => state.pets.petsRequest);
  console.log("=========sort ", sort);
  console.log("======desc ", desc);

  const options = [
    <MenuItem key={3} value={"age"}>Edad: Menor a Mayor</MenuItem>,
    <MenuItem key={4} value={"ageDesc"}>Edad: Mayor a Menor</MenuItem>
  ];

  activeModule === "posts" && options.push([
    <MenuItem key={1} value={"dateDesc"}>Mas recientes primero</MenuItem>,
    <MenuItem key={2} value={"date"}>Mas antiguos primero</MenuItem>
  ]);

  role === "s" && options.push([
    <MenuItem key={5} value={"name"}>Nombre: A - Z</MenuItem>,
    <MenuItem key={6} value={"nameDesc"}>Nombre: Z - A</MenuItem>

  ]);

  // const options = [
  //   <MenuItem key={3} value={{ field: 'age', direction: 'asc' }}>Edad: Menor a Mayor</MenuItem>,
  //   <MenuItem key={4} value={{ field: 'age', direction: 'desc' }}>Edad: Mayor a Menor</MenuItem>
  // ];

  // activeModule === "posts" && options.push([
  //   <MenuItem key={1} value={{ field: 'date', direction: 'desc' }}>Mas recientes</MenuItem>,
  //   <MenuItem key={2} value={{ field: 'date', direction: 'asc' }}>Mas antiguos</MenuItem>
  // ]);

  // role === "s" && options.push([
  //   <MenuItem key={5} value={{ field: 'name', direction: 'asc' }}>Nombre: A - Z</MenuItem>,
  //   <MenuItem key={6} value={{ field: 'name', direction: 'desc' }}>Nombre: Z - A</MenuItem>

  // ]);


  const sortingOptionSelectedValue = () => {
    if (sort === "age") {
      if (desc) {
        return "ageDesc";
      } else {
        return "age";
      }
    } else if (sort === "date") {
      if (desc) {
        return "dateDesc";
      } else {
        return "date";
      }
    } else if (sort === "name") {
      if (desc) {
        return "nameDesc";
      } else {
        return "name";
      }
    } else {
      return activeModule === "posts" ? "dateDesc" : "age";
    }
  }
  console.log("====== BBBBBBBBBBB ", sortingOptionSelectedValue());

  // const sortingOptionSelectedValue =
  //   sort != null && sort != ""
  //     ? options.find(({ props }) => {
  //       const { field, direction } = props.value;
  //       console.log("===option ", props.value);
  //       return field === sort && direction === desc;
  //     })
  //     : { label: "", value: 0 };

  // console.log("====== option ", sortingOptionSelectedValue);

  const handleSortChange = ({ target }) => {
    console.log("===handleSortChange ", target.value);

    let sortCriteria = "date";
    let descCriteria = false;
    switch (target.value) {
      case "dateDesc":
        sortCriteria = "date";
        descCriteria = true;
        break;
      case "date":
        sortCriteria = "date";
        break;
      case "age":
        sortCriteria = "age";
        break;
      case "ageDesc":
        sortCriteria = "age";
        descCriteria = true;
        break;
      case "name":
        sortCriteria = "name";
        break;
      case "nameDesc":
        sortCriteria = "name";
        descCriteria = true;
        break;
    };

    const sortFilterObjet = { ["sort"]: sortCriteria };
    const descFilterObjet = { ["desc"]: descCriteria };
    console.log("===sortCriteria ", sortFilterObjet, descFilterObjet);
    activeModule === "posts"
      ? dispatch(changePostsRequest([sortFilterObjet, descFilterObjet, { page: 0 }]))
      : dispatch(changePetsRequest([sortFilterObjet, descFilterObjet, { page: 0 }]));


  };

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
              value={sortingOptionSelectedValue()}
              onChange={handleSortChange}
              sx={{ backgroundColor: 'white', mr: '1.8rem' }}
            >
              {options}
              {/* {
                activeModule === "posts"
                  ? [
                    <MenuItem key={1} value={{ field: 'date', direction: 'desc' }}>Mas recientes</MenuItem>,
                    <MenuItem key={2} value={{ field: 'date', direction: 'asc' }}>Mas antiguos</MenuItem>
                  ]
                  : null


              }
              <MenuItem key={3} value={{ field: 'age', direction: 'asc' }}>Edad: Menor a Mayor</MenuItem>
              <MenuItem key={4} value={{ field: 'age', direction: 'desc' }}>Edad: Mayor a Menor</MenuItem>
              {
                role === "s"
                  ? [
                    <MenuItem key={5} value={{ field: 'age', direction: 'asc' }}>Nombre: A - Z</MenuItem>,
                    <MenuItem key={6} value={{ field: 'age', direction: 'desc' }}>Nombre: Z - A</MenuItem>
                  ]
                  : null
              } */}

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
