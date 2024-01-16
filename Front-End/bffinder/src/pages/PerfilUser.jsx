import React from 'react';
import NavProfile from "../Components/NavProfile";
import 'styles/PageProfile.scss';
import ProfilePanel from '../containers/ProfilePanel';
import { Typography } from '@mui/material';
import ContentMainProfile from '../Components/ContentMainProfile';

const PerfilUser = () => {
    return (
        <div>
        <section id="content">
          <NavProfile/>
          <main>
          {/* <div className="main-content-post-select">
            
            </div> */}
            <div className="main-content">
            <div className="column-profile">
              <ProfilePanel />
            </div>
            <div className="main-content-profile">
             <ContentMainProfile />
            </div>
          </div>
          </main>
        </section>
        </div>
    );
};

export default PerfilUser;