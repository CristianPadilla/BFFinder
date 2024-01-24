import React from "react";
import Header from "../Components/Header";
import SectionPrePost from "../containers/SectionPrePosts";
import SectionFundation from "../containers/SectionFundation";
import FooterPreHome from "../Components/FooterPreHome";
import 'styles/Prehome.scss';

const PreHome = () => {
  return (
    <>
      <Header />
      <section id="mascotas" className="container-sections">
        <div className="section-content">
            <SectionPrePost />
        </div>
      </section>
      <section id="fundaciones" className="container-sections">
        <div className="section-content">
           <SectionFundation /> 
        </div>
      </section>
      <section>
        <FooterPreHome />
      </section>
    </>
  );
};

export default PreHome;
