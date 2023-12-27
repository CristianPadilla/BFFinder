import React, { useEffect, useRef, useState } from 'react';
import 'styles/dash.scss';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Menu, Search, CloudDownload, Add, FilterList } from '@mui/icons-material/';
import PanelF from "containers/PanelFilters";
import Ordering from "containers/Ordering";
import logobff from "imgs/logo-bffinder-FINAL2.png";
import Slider from '@mui/material/Slider'

import Paper from '@mui/material/Paper';
import SectionFilterPost from '../containers/SectionFilterPost';
import NavHome from "../Components/NavHome";

const Home = () => {

  const [sortType, setSortType] = useState("");

  const handleSortChange = (type) => {
    // Haz lo que necesites con el tipo de ordenamiento (type)
    setSortType(type);
  };

    return (
        <div>
        <section id="content">
          <NavHome/>

          {/* MAIN */}
          <main>
            <div className="head-title">
              <div className="left">
                <h2>Mascotas Registradas</h2>
                {/* ... (otros elementos) */}
              </div>
              {/* <a href="#" className="btn-download">
                <CloudDownload />
                <span className="text">Download PDF</span>
              </a> */}
              <div>
                <Ordering onSortChange={handleSortChange}/>
              </div>
            </div>


            <div className='main-content'>
              <div className="column-filters">
                <h4>Filtros</h4>
                <PanelF/>
              </div>
              <div className="main-content-scroll">
                
              <SectionFilterPost />

                {/* <ul className="box-info">
                  <li>
                    <span className="text">
                      <h3>1020</h3>
                      <p>New Order</p>
                    </span>
                  </li>
                </ul>
                <div className="table-data">
                  <div className="order">
                    <div className="head">
                      <h3>Recent Orders</h3>
                      <Search />
                      <FilterList />
                    </div>

                  </div>
                  <div className="todo">
                    <div className="head">
                      <h3>Todos</h3>
                      <Add />
                      <FilterList />
                    </div>

                  </div>
                </div>
                <div className="table-data">
                  <div className="order">
                    <div className="head">
                      <h3>Recent Orders</h3>
                      <Search />
                      <FilterList />
                    </div>

                  </div>
                  <div className="todo">
                    <div className="head">
                      <h3>Todos</h3>
                      <Add />
                      <FilterList />
                    </div>

                  </div>
                </div> */}

              </div>
                
            </div>
            
            
          </main>
          {/* MAIN */}

        </section>
      </div>
    );
  };
  
  export default Home;
