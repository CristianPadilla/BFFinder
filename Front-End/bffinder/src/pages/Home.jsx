import React, { useEffect, useRef, useState } from "react";
import "styles/dash.scss";
import PanelF from "containers/PanelFilters";
import Ordering from "containers/Ordering";
import SearchBar from "../Components/SearchBar";
import NavHome from "../Components/NavHome";
import MainContent from "../containers/MainContent";
import { useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../store/post";
import { startFetchPets } from "../store/pet";
import { use } from "i18next";
import { LoadingFilters } from "../containers/Loaders/LoadingFilters";
import NoResults from "../containers/Loaders/NoResults";
import { setActiveModule } from "../store/global";
import { act } from "react-dom/test-utils";
import MessageInfoUserFoundation from "../containers/Loaders/MessageInfoUserFoundation";
import MessageDeniedUserFoundation from "../containers/Loaders/MessageDeniedUserFoundation";

const Home = () => {
  const dispatch = useDispatch();
  const { activeModule, contentLoading } = useSelector(
    (state) => state.persisted.global
  );
  const { role, shelterEnabled } = useSelector((state) => state.persisted.auth);
  const { page: petsPage } = useSelector((state) => state.pets);
  const { page: postsPage } = useSelector((state) => state.posts);
  const screen = useMediaQuery('(max-width:1199px)');
  const screen1 = useMediaQuery('(min-width:1200px) and (max-width:1300px)');
  const screen2 = useMediaQuery('(min-width:1301px) and (max-width:1400px)');
  const screen3 = useMediaQuery('(min-width:1401px) and (max-width:1500px)');
  const screen4 = useMediaQuery('(min-width:1501px) and (max-width:1600px)');
  const screen5 = useMediaQuery('(min-width:1601px) and (max-width:1700px)');
  const screen6 = useMediaQuery('(min-width:1701px) and (max-width:1800px)');
  const screen7 = useMediaQuery('(min-width:1801px) and (max-width:1900px)');
  const screen8 = useMediaQuery('(min-width:1901px) and (max-width:2000px)');
  const screen9 = useMediaQuery('(min-width:2001px) and (max-width:2100px)');
  const screen10 = useMediaQuery('(min-width:2101px) and (max-width:2200px)');
  const screen11 = useMediaQuery('(min-width:2201px) and (max-width:2300px)');
  const screen12 = useMediaQuery('(min-width:2301px) and (max-width:2400px)');
  const screen13 = useMediaQuery('(min-width:2401px) and (max-width:2500px)');
  const screen14 = useMediaQuery('(min-width:2501px) and (max-width:2600px)');
  const screen15 = useMediaQuery('(min-width:2601px) and (max-width:2700px)');
  const screen16 = useMediaQuery('(min-width:2701px) and (max-width:2800px)');
  const screen17 = useMediaQuery('(min-width:2801px) and (max-width:2900px)');
  const screen18 = useMediaQuery('(min-width:2901px) and (max-width:3000px)');
  const screen19 = useMediaQuery('(min-width:3001px) and (max-width:3100px)');
  
  const margin = screen ? '3rem' : (screen1 ? '4rem' : (screen2 ? '6rem' : (screen3 ? '7rem' : (screen4 ? '11rem' : screen5 ? '15rem' : screen6 ? '20rem' : screen7 ? '23rem' : screen8 ? '26rem' : screen9 ? '29rem' : screen10 ? '32rem' : screen11 ? '35rem' : screen12 ? '38rem' : screen13 ? '41rem' : screen14 ? '44rem' : screen15 ? '47rem' : screen16 ? '50rem' : screen17 ? '53rem' : screen18 ? '56rem' : screen19 ? '59rem' : '62rem'))));
  const margin2 = screen ? '3rem' : (screen1 ? '4rem' : (screen2 ? '6rem' : (screen3 ? '9rem' : (screen4 ? '10rem' : screen5 ? '11rem' : screen6 ? '12rem' : screen7 ? '13rem' : screen8 ? '14rem' : screen9 ? '11rem' : screen10 ? '11rem' : screen11 ? '12rem' : screen12 ? '13rem' : screen13 ? '14rem' : screen14 ? '15rem' : screen15 ? '16rem' : screen16 ? '50rem' : screen17 ? '53rem' : screen18 ? '56rem' : screen19 ? '59rem' : '62rem'))));
  const margin3 = screen ? '3rem' : (screen1 ? '4rem' : (screen2 ? '6rem' : (screen3 ? '9.5rem' : (screen4 ? '9.8rem' : screen5 ? '10rem' : screen6 ? '12rem' : screen7 ? '13rem' : screen8 ? '14rem' : screen9 ? '11rem' : screen10 ? '11rem' : screen11 ? '12rem' : screen12 ? '13rem' : screen13 ? '14rem' : screen14 ? '15rem' : screen15 ? '16rem' : screen16 ? '50rem' : screen17 ? '53rem' : screen18 ? '56rem' : screen19 ? '59rem' : '62rem'))));
  // const margin3 = screen ? '3rem' : (screen1 ? '4rem' : (screen2 ? '6rem' : (screen3 ? '7rem' : (screen4 ? '11rem' : screen5 ? '15rem' : screen6 ? '20rem' : screen7 ? '23rem' : screen8 ? '26rem' : screen9 ? '29rem' : screen10 ? '32rem' : screen11 ? '35rem' : screen12 ? '38rem' : screen13 ? '41rem' : screen14 ? '44rem' : screen15 ? '47rem' : screen16 ? '50rem' : screen17 ? '53rem' : screen18 ? '56rem' : screen19 ? '59rem' : '62rem'))));

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
  // console.log("content  ", shelterEnabled);
  const notAvailableForPosting = shelterEnabled === "d"
    ? <MessageDeniedUserFoundation />
    : <MessageInfoUserFoundation />;

  // console.log("role", role);
  // console.log("activeModule", activeModule);
  // console.log("shelterEnabled", shelterEnabled);
  return (
    <>
      <section id="content">
        <NavHome />
        <main>
          <div className="head-title">
            <div className="left">
              {role === "u" ? (
                <h2 style={{ marginRight: margin}}>Encuentra tu mejor amigo</h2>
              ) : activeModule === "posts" ?
              <h2 style={{ marginRight: margin2}} >Tus publicaciones</h2>
              // <h2 style={{ marginRight: "11rem"}} >Tus publicaciones</h2>
                : <h2 style={{ marginRight: margin3}} >Tus mascotas</h2>
                // : <h2 style={{ marginRight: "13rem"}} >Tus mascotas</h2>
              }
            </div>
            <div className="search-bar">
               <SearchBar />
            </div>
            <div className="ordering">
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
    </>
  );
};

export default Home;
