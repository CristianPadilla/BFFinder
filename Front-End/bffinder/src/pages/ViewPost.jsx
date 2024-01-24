import React, { useEffect } from "react";
import NavProfile from "../Components/NavProfile";
import SectionPost from "../containers/SectionPost";
import "styles/ViewPost.scss";
import { useDispatch, useSelector } from "react-redux";
import { setActivePost, startGetPostById } from "../store/post";
import { useParams } from "react-router";

const ViewPost = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { contentLoading } = useSelector(state => state.persisted.global);
  const { active: post } = useSelector((state) => state.posts);

  useEffect(async () => {
    dispatch(setActivePost(null));
    console.log("usefect viweposttt  ", post);
    dispatch(startGetPostById(id));
  }, [id]);


  return (
    <div>
      <section id="content">
        {/* {post? post.id : null} */}
        <NavProfile />
        <main className="content-container">
          {/* <div className="head-title-perfil">
                <SectionPerfilPost/>
            </div> */}
          {/* <div className="head-navigation">
                <Breadcrumbs/>
            </div> */}
          <div className="main-content-post">
            {contentLoading
              ? <h1>Cargando...</h1>
              : post && <SectionPost post={post} />}
          </div>
        </main>
      </section>
    </div>
  );
};

export default ViewPost;
