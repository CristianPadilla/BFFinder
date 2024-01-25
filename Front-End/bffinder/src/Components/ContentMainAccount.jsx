import React from "react";
import Profile from "../containers/Profile";
import { useSelector } from "react-redux";
import UserConfigurations from "../containers/UserConfigurations";
import ContentQuestions from "../containers/ContentQuestions";
import ProgressCircular from "./ProgressCircular";

const ContentMainAccount = () => {
  const { activeModule, contentLoading } = useSelector(
    (state) => state.persisted.global
  );

  if (contentLoading) return <ProgressCircular />;

  return (
    <>
      {activeModule === "profile" ? (
        <Profile />
      ) : activeModule === "questions" ? (
        <ContentQuestions />
      ) : (
        activeModule === "config" && <UserConfigurations />
      )}
    </>
  );
};

export default ContentMainAccount;
