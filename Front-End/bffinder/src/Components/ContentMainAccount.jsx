import React, { useState } from "react";
import Questions from "../containers/ContentQuestions";
import Profile from "../containers/Profile";
import { useSelector } from "react-redux";
import UserConfigurations from "../containers/UserConfigurations";
import ContentQuestions from "../containers/ContentQuestions";
import { Typography } from "@mui/material";

const ContentMainAccount = () => {
  console.log("RENDER ContentMainAccount");
  const { activeModule, contentLoading } = useSelector((state) => state.persisted.global);


  if (contentLoading) return (<Typography variant="h4" component="div" gutterBottom>
    Cargando...
  </Typography>)


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
