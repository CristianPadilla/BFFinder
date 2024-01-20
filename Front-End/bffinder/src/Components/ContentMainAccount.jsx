import React, { useState } from "react";
import Questions from "../containers/ContentQuestions";
import Profile from "../containers/Profile";
import { useSelector } from "react-redux";
import UserConfigurations from "../containers/UserConfigurations";
import ContentQuestions from "../containers/ContentQuestions";

const ContentMainAccount = () => {
  const { activeModule } = useSelector((state) => state.persisted.global);

  return (
    <>
      {activeModule === "profile" ? (
        <Profile />
      ) : activeModule === "questions" ? (
        // <Questions />
        <ContentQuestions />
      ) : (
        activeModule === "config" && <UserConfigurations />
      )}
    </>
  );
};

export default ContentMainAccount;
