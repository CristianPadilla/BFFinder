import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import TextField from "@mui/material/TextField";
import "styles/SearchBar.scss";
// import SearchIcon from '@mui/icons-material/Search';
import { Menu, Search, CloudDownload, Add, FilterList } from '@mui/icons-material/';

const SearchBar = () => {
    return (
      //   <TextField
      //   id="search"
      //   label="Buscar..."
      //   variant="outlined"
      //   size="small"
      //   fullWidth
      //   className="search-bar custom-search-bar"
      //   InputProps={{
      //     endAdornment: <SearchIcon style={{ cursor: "pointer" }} />,
      //   }}
      // />
      <div>
        <form action="#">
              <div className="form-input">
                <input type="search" placeholder="Buscar..." style={{ width: '300px' }}/>
                <button type="submit" className="search-btn">
                  <Search />
                </button>
              </div>
            </form>
      </div>
    );
};

export default SearchBar;