import React from "react";
import 'styles/CarouselPreHome.scss';

const CarouselPreHome = () => {
  return (
    <div className="slider">
      <div className="slide-track">
        {/* imagenes */}
        <div className="slide">
          <img src="https://img.artpal.com/040741/5-19-12-30-2-0-26m.jpg" />
        </div>
        <div className="slide">
          <img src="https://as2.ftcdn.net/v2/jpg/03/41/73/57/1000_F_341735787_46xjDjoh5T9dShls1sIudnJ08kHqcMRW.jpg" />
        </div>
        <div className="slide">
          <img src="https://img.artpal.com/040741/5-19-12-30-2-0-26m.jpg" />
        </div>
        <div className="slide">
          <img src="https://img.freepik.com/free-vector/cute-dog-sitting-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-flat_138676-4474.jpg" />
        </div>
        <div className="slide">
          <img src="https://img.artpal.com/040741/5-19-12-30-2-0-26m.jpg" />
        </div>

        {/* repite imagenes */}

        <div className="slide">
          <img src="https://img.freepik.com/free-vector/cute-dog-sitting-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-flat_138676-4474.jpg" />
        </div>
        <div className="slide">
          <img src="https://as2.ftcdn.net/v2/jpg/03/41/73/57/1000_F_341735787_46xjDjoh5T9dShls1sIudnJ08kHqcMRW.jpg" />
        </div>
        <div className="slide">
          <img src="https://img.artpal.com/040741/5-19-12-30-2-0-26m.jpg" />
        </div>
        <div className="slide">
          <img src="https://img.freepik.com/free-vector/cute-dog-sitting-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-flat_138676-4474.jpg" />
        </div>
        <div className="slide">
          <img src="https://img.artpal.com/040741/5-19-12-30-2-0-26m.jpg" />
        </div>
        
      </div>
    </div>
  );
};

export default CarouselPreHome;
