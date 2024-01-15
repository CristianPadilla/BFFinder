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
import { use } from "i18next";
import { LoadingFilters } from "../Components/LoadingFilters";
import NoResults from "../Components/NoResults";

const Home = () => {
  const dispatch = useDispatch();
  const { activeModule, contentLoading } = useSelector(
    (state) => state.persisted.global
  );
  const { page: petsPage } = useSelector((state) => state.pets);
  const { page: postsPage } = useSelector((state) => state.posts);

  useEffect(() => {
    if (activeModule === "posts") {
      !postsPage && dispatch(fetchPosts());
    } else {
      !petsPage && dispatch(startFetchPets());
    }
  });

  let noContent = false;

  const content =
    !contentLoading && (activeModule === "posts" ? postsPage : petsPage);

  const currentPage = activeModule === "posts" ? postsPage : petsPage;
  if (currentPage !== null) {
    const currentPageElements =
      activeModule === "posts" ? currentPage.posts : currentPage.pets;
    if (currentPageElements !== null) {
      if (currentPageElements.length === 0) {
        noContent = true;
      }
    }
  }

  // const content = !contentLoading &&
  // (activeModule === "posts" ? postsPage : petsPage);

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
              <Ordering />
            </div>
          </div>

          <div className="main-content">
            <div className="column-filters">
              <h4>Filtros</h4>
              <PanelF />
            </div>
            <div className="main-content-scroll animate__animated animate__fadeIn animate__faster">
              {noContent && contentLoading ?
                (<LoadingFilters />)
                : noContent ? (
                  <NoResults />
                ) : !content ? (
                  <LoadingFilters />     
                ) : (
                  <MainContent />
                )}

              {/* {noContent ? (
                <h2>No hay contenido</h2>
              ) : !content ? (
                <h2>loading...</h2>
              ) : (
                <MainContent />
              )} */}

              {/* {!content ? <h2>loading...</h2> : <MainContent />} */}
            </div>
          </div>
        </main>
      </section>
    </div>
  );
};

export default Home;
