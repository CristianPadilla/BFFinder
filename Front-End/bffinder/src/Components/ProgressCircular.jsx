import { CircularProgress } from "@material-ui/core";
import React from "react";

const ProgressCircular = ({ color }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <CircularProgress
        style={{ color: color || "#db711590" }}
        fourColor={false}
        variant="indeterminate"
      />
    </div>
  );
};

export default ProgressCircular;
