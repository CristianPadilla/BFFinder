import React, { useEffect, useRef, useState } from "react";
import "styles/dash.scss";
import PanelF from "containers/PanelFilters";
import Ordering from "containers/Ordering";
import SearchBar from "../Components/SearchBar";
import NavHome from "../Components/NavHome";
import MainContent from "../containers/MainContent";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../store/post";
import { startFetchPets } from "../store/pet";

const Home = () => {

  const dispatch = useDispatch();
  const { activeModule, contentLoading } = useSelector((state) => state.persisted.global);
  const { page: pets } = useSelector((state) => state.pets);
  const { page: posts } = useSelector((state) => state.posts);

  console.log('Active module:', activeModule, contentLoading);

  useEffect(() => {
    if (activeModule === "posts") {
      !posts && dispatch(fetchPosts())
    }
    else {
      !pets && dispatch(startFetchPets())
    }

  })

  const content = !contentLoading &&
    (activeModule === "posts" ? posts : pets);

  return (
    <div>
      <section id="content">
        <NavHome />

        {/* MAIN */}
        <main>
          <div className="head-title">
            <div className="left">
              <h2>Mascotas Registradas</h2>
            </div>
            <SearchBar />
            {/* <a href="#" className="btn-download">
                <CloudDownload />
                <span className="text">Download PDF</span>
              </a> */}
            <div>
              <Ordering />
            </div>
          </div>

          <div className="main-content">
            <div className="column-filters">
              <h4>Filtros</h4>
              <PanelF />
            </div>
            <div className="main-content-scroll animate__animated animate__fadeIn animate__faster">
              {!content ? <h2>loading...</h2> : <MainContent />}


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
