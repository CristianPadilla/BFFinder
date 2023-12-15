import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

const SectionPerfilPost = () => {
  return (
    <div>
      <div className="left">
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar />
          <span>Fundation Cali</span>
        </Stack>
      </div>

      <div></div>
    </div>
  );
};

export default SectionPerfilPost;
