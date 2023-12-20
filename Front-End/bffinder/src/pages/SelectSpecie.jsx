import React from 'react';
import NavHome from "../Components/NavHome";
import SectionSelectSpecie from "../containers/SectionSelectSpecie";
import 'styles/PostDetails.scss';

const SelectSpecie = () => {
    return (
        <div>
            
        <section id="content">
          <NavHome/>
          <main>
          <div className="main-content-post-select">
            <SectionSelectSpecie />
            </div>
          </main>
        </section>

        </div>
    );
};

export default SelectSpecie;