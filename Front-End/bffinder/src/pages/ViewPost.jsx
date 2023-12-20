import React from "react";
import NavHome from "../Components/NavHome";
import SectionPerfilPost from "../containers/SectionPerfilPost"
import SectionPost from "../containers/SectionPost"
import Breadcrumbs from "../Components/MyBreadcrumbs"
import 'styles/PostDetails.scss';

const ViewPost = () => {
  return (
    <div>
      <section id="content">
        <NavHome />
        <main>
            {/* <div className="head-title-perfil">
                <SectionPerfilPost/>
            </div> */}
            <div className="head-navigation">
                <Breadcrumbs/>
            </div>

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
