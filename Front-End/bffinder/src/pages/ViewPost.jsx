import React, { useEffect } from "react";
import NavProfile from "../Components/NavProfile";
import SectionPerfilPost from "../containers/SectionPerfilPost";
import SectionPost from "../containers/SectionPost";
import Breadcrumbs from "../Components/MyBreadcrumbs";
import "styles/ViewPost.scss";
import { useDispatch, useSelector } from "react-redux";
import { use } from "i18next";
import { startGetPostById } from "../store/post";
import { useParams } from "react-router";

const ViewPost = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Aquí obtienes el id de la ruta
  const { active: post } = useSelector((state) => state.posts);

  useEffect(async () => {
    console.log("usefect viweposttt  ", id);
    dispatch(startGetPostById(id));
  }, []);

  return (
    <div>
      <section id="content">
        {post? post.id : null}
        <NavProfile />
        <main className="content-container">
          {/* <div className="head-title-perfil">
                <SectionPerfilPost/>
            </div> */}
          {/* <div className="head-navigation">
                <Breadcrumbs/>
            </div> */}

          <div className="main-content-post">
            <SectionPost  post={post}/>
            {/* Definir que el otro elemento este dejabo de SectionPost */}
          </div>
        </main>
      </section>
    </div>
  );
};

export default ViewPost;
