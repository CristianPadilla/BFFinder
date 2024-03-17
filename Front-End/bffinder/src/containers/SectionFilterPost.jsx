import React, { useEffect, useState, useRef } from "react";
import CardPost from "../Components/post/CardPost";
import { Fab, Tooltip, Grid, CircularProgress, useMediaQuery } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ModalAddPet from "../Components/user-foundation/ModalAddPet";
import "styles/SectionAllPosts.scss";
import "styles/Home.scss";
import { useDispatch, useSelector } from "react-redux";
import CardPostShelter from "../Components/user-foundation/CardPostShelter";
import ProgressCircular from "./Loaders/ProgressCircular";
import { setActivePost } from "../store/post";
import DialogViewPost from "../Components/user-foundation/DialogViewPost";

const SectionFilterPost = () => {
  const dispatch = useDispatch();
  const { page, isSaving } = useSelector((state) => state.posts);
  const { active } = useSelector((state) => state.posts);
  const { posts } = page;

  const { role } = useSelector((state) => state.persisted.auth);
  const sectionRef = useRef(null);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    sectionRef.current.scrollIntoView({ top: 0, behavior: "smooth" });
  };

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialogPostView = () => {
    dispatch(setActivePost(null));
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddPet = () => {
    handleCloseDialog();
  };

  const [tooltipOpen, setTooltipOpen] = useState(true);

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  const handleTooltipOpen = () => {
    setTooltipOpen(true);
  };

  // console.log("HHHHHHHHHHHHHHHHHHHHH ", isSaving);
  const isLargeScreen = useMediaQuery('(min-width:2000px)');
  const isExtraLargeScreen = useMediaQuery('(min-width:2925px)');
  const isExtraLargeScreenv2 = useMediaQuery('(min-width:2680px)');

  return isSaving ? (
    <ProgressCircular />
  ) : (
    <>
      {posts &&
        posts.map((post) =>
          role === "s" ? (
            <React.Fragment key={post.id}>
              <Grid
                item
                key={post.id}
                xs={12} sm={12} md={6} lg={4} 
                // xl={3}
                xl={isExtraLargeScreenv2 ? 2 : (isLargeScreen ? 3 : 4)}

                // xs={12}
                // sm={6}
                // md={4}
                // style={{ margin: "2rem" }}
              >
                <CardPostShelter post={post} />
              </Grid>
            </React.Fragment>
          ) : (
            <Grid item xs={12} sm={12} md={12} lg={12} 
            xl={isExtraLargeScreen ? 4 : (isLargeScreen ? 6 : 12)}
            key={post.id} 
            // style={{ margin: "1rem" }}
            >
              <CardPost post={post} />
            </Grid>
          )
        )}

      {active != null && role === "s" && (
        <DialogViewPost
          open={active != null}
          onClose={handleCloseDialogPostView}
        />
      )}
    </>
  );
};

export default SectionFilterPost;
