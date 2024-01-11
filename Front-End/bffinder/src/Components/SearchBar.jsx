import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import TextField from "@mui/material/TextField";
import "styles/SearchBar.scss";
// import SearchIcon from '@mui/icons-material/Search';
import { Menu, Search, CloudDownload, Add, FilterList } from '@mui/icons-material/';
import { useDispatch, useSelector } from 'react-redux';
import { changePetsRequest } from '../store/pet';
import { changePostsRequest } from '../store/post';

const SearchBar = () => {

  const dispatch = useDispatch();
  const { activeModule } = useSelector((state) => state.persisted.global);

  const filters =
    activeModule === "posts"
      ? useSelector((state) => state.posts.postRequest.filters)
      : useSelector((state) => state.pets.petsRequest);


  const handleSearch = ({ target }) => {
    const { value } = target;
    console.log("searchhhhh ", target);
    const filterObjet = { ["search"]: value };
    activeModule === "posts"
      ? dispatch(changePostsRequest([filterObjet, { page: 0 }]))
      : dispatch(changePetsRequest([filterObjet, { page: 0 }]));
  }

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
          <input type="search" onChange={handleSearch} value={filters.search} placeholder="Buscar..." style={{ width: '300px' }} />
          <button type="submit" className="search-btn">
            <Search />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;