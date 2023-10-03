import React from "react";
import Grid from "@mui/material/Grid";
import Cards from "../Components/CardHorizontal";
import Cardv from "../Components/CardVertical";
import BarSearch from "../Components/SearchBar";
import PanelF from "../containers/PanelFilters";
import "styles/SectionAllPosts.scss";
import "styles/Home.scss";

const SectionAllPosts = () => {
  return (
    <div className="layout-container">
      <section className="inicio-user-comun">
        <Grid container className="grid-container">
          {/* Primer componente */}

          <Grid item xs={12} className="first-component">
            {/* Contenido del primer componente */}
            <BarSearch />
          </Grid>

          {/* Segundo componente */}
          <Grid item xs={3} className="second-component">
            {/* Contenido del segundo componente */}
            <PanelF />
          </Grid>

          {/* Tercer componente */}
          <Grid item xs={9} className="third-component">
            {/* Contenido del tercer componente */}
            <div className="scrollable-content">
              {/* <Cards /> */}
              <Cardv />
              <Cardv />
              <Cardv />
              <Cardv />
              <Cardv />
              
            </div>
          </Grid>
        </Grid>
      </section>
    </div>
  );
};

export default SectionAllPosts;
