import React from "react";
import ImagesGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const SlidersImages = ({images}) => {
  return (
    <div>
      <ImagesGallery
        items={images}
        showBullets={true}
        showPlayButton={false}
      />
    </div>
  );
};

export default SlidersImages;
