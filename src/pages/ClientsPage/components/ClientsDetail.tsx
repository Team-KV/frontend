import clientService from 'api/services/clientService';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import requestErrorHandler from 'helpers/requestErrorHandler';
import { Client } from 'models/Client';

const ClientsDetail = () => {
  const [client, setClient] = useState<Client | null>(null);
  let { id } = useParams();

  useEffect(() => {
    if (id === undefined) return;
    clientService
      .getClient(+id)
      .then((res) => {
        let cl = new Client({...res.data.Client});
        setClient(cl);
      })
      .catch((error) => {
        requestErrorHandler(error);
      });
  }, []);

  return (
    <div>
      <h1>Detail of client = {client?.firstName}</h1>
    </div>
  );
};

export default ClientsDetail;
