import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

interface ClientsDetailProps {
  id: number
}

const ClientsDetail = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Detail of client = {id}</h1>
    </div>
  )
}

export default ClientsDetail;