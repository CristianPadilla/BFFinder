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
        position: "fixed",
        top: 0,
        left: 0,
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(254, 247, 231, 0.5)",
      }}
    >
      <CircularProgress
        style={{ color: color || "#ba8c63" }}
        // style={{ color: color || "#db711590" }}
        size={130}
        variant="indeterminate"
      />
    </div>
  );
};

export default ProgressCircular;
