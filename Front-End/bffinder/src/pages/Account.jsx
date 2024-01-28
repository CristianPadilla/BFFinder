import React from "react";
import NavProfile from "../Components/NavProfile";
import "../styles/Account.scss";
import ProfilePanel from "../containers/ProfilePanel";
import { Typography } from "@mui/material";
import ContentMainAccount from "../Components/ContentMainAccount";
import { useSelector } from "react-redux";

const Account = () => {
  return (
    <div>
      <section id="content">
        <NavProfile />
        <main>
          {/* <div className="main-content-post-select">
            
            </div> */}
          <div className="main-content-all-account">
            <div className="column-profile">
              <ProfilePanel />
            </div>
            <div className="main-content-account">{<ContentMainAccount />}</div>
          </div>
        </main>
      </section>
    </div>
  );
};

export default Account;
