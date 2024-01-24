import React, { useEffect } from "react";
import NavProfile from "../Components/NavProfile";
import SectionPost from "../containers/SectionPost";
import "styles/ViewPost.scss";
import { useDispatch, useSelector } from "react-redux";
import { startGetPostById } from "../store/post";
import { useParams } from "react-router";

const ViewPost = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { active: post } = useSelector((state) => state.posts);

  useEffect(async () => {
    // console.log("usefect viweposttt  ", id);
    dispatch(startGetPostById(id));
  }, []);

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
            {post && <SectionPost  post={post}/>}
          </div>
        </main>
      </section>
    </div>
  );
};

export default ViewPost;
