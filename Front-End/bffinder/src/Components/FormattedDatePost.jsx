import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const FormattedDatePost = ({ date }) => {
  const formattedDate = new Date(date);
  const formattedPublicationDate = format(formattedDate, "d 'de' MMMM 'de' yyyy", { locale: es });

  return (
    <>
      <span>{`Publicado el ${formattedPublicationDate}`}</span>
    </>
  );
};

export default FormattedDatePost;
