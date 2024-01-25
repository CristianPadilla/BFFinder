import React, { useEffect, useState } from "react";
import Carousel from "../Components/CarouselPreHome";
import axios from "axios";

const SectionFundation = () => {
  const [sheltersList, setSheltersList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9090/user/all/shelters")
      .then((response) => {
        console.log("Respuesta de la petición:", response.data);
        setSheltersList(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error.response.data);
      });
  }, []);

  return (
    <>
      <div className="title-container">
        <h1 className="title-pre">Fundaciones Registradas </h1>
      </div>
      {sheltersList.length > 0 && <Carousel shelters={sheltersList} />}
    </>
  );
};

export default SectionFundation;
