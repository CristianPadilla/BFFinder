import React from "react";
import Header from "../Components/Header";
import PrePost from "../containers/SectionPrePosts";
import Fundations from "../containers/SectionFundation";
import Footer from "../Components/FooterPreHome";
import 'styles/Prehome.scss';

const PreHome = () => {
  return (
    <>
      <Header />
      <section id="mascotas" className="container-sections">
        <div className="section-content">
            <PrePost />
        </div>
      </section>
      <section id="fundaciones" className="container-sections">
        <div className="section-content">
           <Fundations /> 
        </div>
      </section>
      <section>
        <Footer />
      </section>
    </>
  );
};

export default PreHome;
