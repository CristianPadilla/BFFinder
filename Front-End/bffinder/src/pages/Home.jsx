import React, { useEffect, useRef, useState } from "react";
import "styles/dash.scss";
import PanelF from "containers/PanelFilters";
import Ordering from "containers/Ordering";
import SearchBar from "../Components/SearchBar";
import NavHome from "../Components/NavHome";
import MainContent from "../containers/MainContent";

const Home = () => {
  const handleSortChange = (type) => {};

  return (
    <div>
      <section id="content">
        <NavHome />
        <main>
          <div className="head-title">
            <div className="left">
              <h2>Mascotas Registradas</h2>
            </div>
            <SearchBar />
            <div>
              <Ordering onSortChange={handleSortChange} />
            </div>
          </div>

          <div className="main-content">
            <div className="column-filters">
              <h4>Filtros</h4>
              <PanelF />
            </div>
            <div className="main-content-scroll animate__animated animate__fadeIn animate__faster">
              <MainContent />
            </div>
          </div>
        </main>
      </section>
    </div>
  );
};

export default Home;
