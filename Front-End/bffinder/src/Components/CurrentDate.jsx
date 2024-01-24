import React from "react";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

const CurrentDate = ({ date }) => {
  const formattedDate = new Date(date);
  const difference = formatDistanceToNow(formattedDate, { locale: es });
  return (
    <>
      <span>{`Hace ${difference}`}</span>
    </>
  );
};

export default CurrentDate;
