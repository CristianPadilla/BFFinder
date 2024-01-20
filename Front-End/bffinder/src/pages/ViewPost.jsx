import React from "react";
import NavProfile from "../Components/NavProfile";
import SectionPerfilPost from "../containers/SectionPerfilPost"
import SectionPost from "../containers/SectionPost"
import Breadcrumbs from "../Components/MyBreadcrumbs"
import 'styles/ViewPost.scss';

const ViewPost = () => {
  return (
    <div>
      <section id="content">
        <NavProfile />
        <main className="content-container">
            {/* <div className="head-title-perfil">
                <SectionPerfilPost/>
            </div> */}
            {/* <div className="head-navigation">
                <Breadcrumbs/>
            </div> */}

          <div className="main-content-post">
                <SectionPost  />
{/* Definir que el otro elemento este dejabo de SectionPost */}
              
          </div>
          
          

        </main>
      </section>
    </div>
  );
};

export default ViewPost;
