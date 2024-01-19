import React, { useEffect } from "react";
import NavHome from "../Components/NavHome";
import SectionPerfilPost from "../containers/SectionPerfilPost"
import SectionPost from "../containers/SectionPost"
import Breadcrumbs from "../Components/MyBreadcrumbs"
import 'styles/PostDetails.scss';
import { useSelector } from "react-redux";
import { use } from "i18next";

const ViewPost = () => {

  const { active } = useSelector(state => state.posts);

  useEffect(async () => {
    console.log("usefect viweposttt  ", active);
    const pet = await dispatch(getPetsByUserId());


  }, []);

  return (
    <div>
      <section id="content">
        {<NavHome />}
        {/* {active.id } */}
        <main>
          {/* <div className="head-title-perfil">
                <SectionPerfilPost/>
            </div> */}
          <div className="head-navigation">
            <Breadcrumbs />
          </div>

          <div className="main-content-post">
            <SectionPost />
            {/* Definir que el otro elemento este dejabo de SectionPost */}

          </div>



        </main>
      </section>
    </div>
  );
};

export default ViewPost;
