import React from "react";
import "styles/CarouselPreHome.scss";

const CarouselPreHome = ({ shelters }) => {
  const imagesFundation = shelters.map((item) => item.profileImageUrl);
  // console.log("shelters ========", shelters);
  // console.log("imagesFundation ========", imagesFundation);

  return (
    <div className="sliderr">
      <div className="slide-track">
        {imagesFundation.map((image, index) => (
          <div className="slidee" key={index}>
            <img src={image} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselPreHome;
