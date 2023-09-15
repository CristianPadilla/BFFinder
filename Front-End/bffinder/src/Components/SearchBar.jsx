import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import TextField from "@mui/material/TextField";
import "styles/SearchBar.scss";

const SearchBar = () => {
    return (
        <TextField
        id="search"
        label="Buscar..."
        variant="outlined"
        size="small"
        fullWidth
        className="search-bar custom-search-bar"
        InputProps={{
          endAdornment: <SearchIcon style={{ cursor: "pointer" }} />,
        }}
      />
    );
};

export default SearchBar;