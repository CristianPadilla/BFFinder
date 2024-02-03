import React, { useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Paper,
  Avatar,
  ButtonGroup,
  Button,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { useDispatch, useSelector } from "react-redux";
import ProgressCircular from "../containers/Loaders/ProgressCircular";
import { start } from "@popperjs/core";
import { startDisableShelter, startEnableShelter, startGetPendingShelters } from "../store/questions";
import Swal from "sweetalert2";

function createData(
  id,
  photoProfile,
  name,
  numberMercantil,
  nit,
  mail,
  phone,
  buttons
) {
  return {
    id,
    photoProfile,
    name,
    numberMercantil,
    nit,
    mail,
    phone,
    buttons,
  };
}


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "photoProfile",
    // numeric: false,
    // label: "",
  },
  {
    id: "name",
    numeric: true,
    label: "Nombre de la fundación",
  },
  {
    id: "numberMercantil",
    numeric: true,
    label: "No. de Matrícula Mercantil (Cámara de Comercio)",
  },
  {
    id: "nit",
    numeric: true,
    label: "No. de Identificación Tributaria (NIT)",
  },
  {
    id: "mail",
    numeric: true,
    label: "Correo Electrónico",
  },
  {
    id: "phone",
    numeric: true,
    label: "Número de teléfono",
  },
  {
    id: "buttons",
    numeric: true,
    label: "Acciones de registro",
  },
];

function EnhancedTableHead(props) {
  const {
    order,
    orderBy,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const TableAdmin = () => {
  const { contentLoading } = useSelector((state) => state.persisted.global);
  const { pendingShelters } = useSelector((state) => state.questions)

  const dispatch = useDispatch();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(() => {
    if (!pendingShelters) {
      dispatch(startGetPendingShelters());
    }
  }, []);


  const rows = (pendingShelters && pendingShelters.length > 0) ? pendingShelters.map((shelter) => {
    return createData(
      shelter.userId,
      <Avatar
        src={shelter.photoUrl || ""}
        sx={{ width: 37, height: 37 }}
      ></Avatar>,
      shelter.name,
      shelter.nit,
      shelter.commercialRegistrationNumber,
      shelter.email,
      shelter.phoneNumber,
      <ButtonGroup
        disableElevation
        variant="contained"
        aria-label="Disabled elevation buttons"
        size="small"
      >
        <Button onClick={(e) => handleEnableShelter(e, shelter.userId)} color="success">Habilitar</Button>
        <Button onClick={(e) => handleDisableShelter(e, shelter.userId)} color="error">Rechazar</Button>
      </ButtonGroup>
    )
  }) : [];

  const handleEnableShelter = (e, userId) => {
    console.log("handleEnableShelter== 11 : ", userId);
    Swal.fire({
      title: `Habilitar este refugio?`,
      text: `Esta organizacion podrá realizar publicaciones `,
      icon: 'question',
      confirmButtonText: 'Habilitar',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      didOpen: () => {
        const sweetAlertContainer = document.querySelector('.swal2-container');
        if (sweetAlertContainer) {
          sweetAlertContainer.style.zIndex = '99999';
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startEnableShelter(userId));
      }
    })
  }

  const handleDisableShelter = (e, userId) => {
    console.log("handleDisableShelter== 11 : ", userId);
    Swal.fire({
      title: `Deshabilitar este refugio?`,
      text: `Esta organizacion no podrá realizar publicaciones permanentemente`,
      icon: 'question',
      confirmButtonText: 'Deshabilitar',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      didOpen: () => {
        const sweetAlertContainer = document.querySelector('.swal2-container');
        if (sweetAlertContainer) {
          sweetAlertContainer.style.zIndex = '99999';
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startDisableShelter(userId));
      }
    })
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelected = rows.map((n) => n.id);
  //     setSelected(newSelected);
  //     return;
  //   }
  //   setSelected([]);
  // };

  // const handleClick = (event, id) => {
  //   console.log("handleClick== 11 : ", id);
  //   const selectedIndex = selected.indexOf(id);
  //   let newSelected = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, id);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }
  //   setSelected(newSelected);
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = stableSort(rows, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    contentLoading
      ? <ProgressCircular />
      : (pendingShelters && !pendingShelters.length > 0)
        ? <h2>No hay Solicitudes de registro pendientes</h2>
        :
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  // onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {visibleRows.map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        // onClick={(event) => handleClick(event, row.id)}
                        tabIndex={-1}
                        key={row.id}
                        sx={{ cursor: "pointer" }}
                      >

                        <TableCell
                          component="th"
                          id={labelId}
                        // scope="row"
                        // padding="normal"
                        >
                          {row.photoProfile}
                        </TableCell>
                        <TableCell >{row.name}</TableCell>
                        <TableCell align="center">{row.numberMercantil}</TableCell>
                        <TableCell align="center">{row.nit}</TableCell>
                        <TableCell align="center">{row.mail}</TableCell>
                        <TableCell align="center">{row.phone}</TableCell>
                        <TableCell >{row.buttons}</TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>

  );
};


export default TableAdmin;
