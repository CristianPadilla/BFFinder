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
import { setActiveModule } from "../store/global";
import { act } from "react-dom/test-utils";

const Home = () => {
  const dispatch = useDispatch();
  const { activeModule, contentLoading } = useSelector(
    (state) => state.persisted.global
  );
  const { role, shelterEnabled } = useSelector((state) => state.persisted.auth);
  const { page: petsPage } = useSelector((state) => state.pets);
  const { page: postsPage } = useSelector((state) => state.posts);

  useEffect(() => {
    if (activeModule !== "posts" && activeModule !== "pets") {
      // console.log("PONIENDOOO ROLLL", activeModule);
      dispatch(setActiveModule({ module: role === "u" ? "posts" : "pets" }));
    }
  }, []);

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
  const notAvailableForPosting = shelterEnabled === "d"
    ? <div>Su solicitud de autenticación como refugio ha sido rechazada, si quiere hacer una reclamacion comuniquese con *sporte* </div>
    : <div>Para publicar a tus animalitos debes enviar un correo electronico bffinder.suppurt@mail.com </div>;

  console.log("role", role);
  console.log("activeModule", activeModule);
  console.log("shelterEnabled", shelterEnabled);
  return (
    <div>
      <section id="content">
        <NavHome />
        <main>
          <div className="head-title">
            <div className="left">
              {role === "u" ? (
                <h2>Encuentra tu mejor amigo</h2>
              ) : activeModule === "posts" ?
                <h2>Publicaciones de tus mascotas</h2>
                : <h2>Tus mascotas</h2>
              }
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
              {(role === "s" && activeModule === "posts" && shelterEnabled !== 'e')
                ? notAvailableForPosting
                :
                noContent && contentLoading ? (
                  <LoadingFilters />
                ) : noContent ? (
                  <MainContent noResult={<NoResults />} />
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
