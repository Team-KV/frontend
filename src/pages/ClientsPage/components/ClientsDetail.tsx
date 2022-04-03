import clientService from 'api/services/clientService';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Client } from 'models/Client';
import PersonalInfo from './PersonalInfo';
import NotFound from 'components/NotFound';
import { Card, Grid } from '@mui/material';

const ClientsDetail = () => {
  const [client, setClient] = useState<Client | null>(null);
  let { id } = useParams();

  useEffect(() => {
    if (id === undefined) return;
    clientService.getClient(+id).then((res) => {
      setClient(new Client({ ...res.data.Client }));
      if (!client) return <NotFound />;
    });
  }, []);

  return (
    <Grid height='100%' container spacing={4}>
      <Grid item xs={5}>
        <PersonalInfo client={client!} />
      </Grid>
      <Grid item xs={7}>
        <Card elevation={5} sx={{ height: '100%' }}></Card>
      </Grid>
      <Grid item xs={12}>
        <Card elevation={5} sx={{ height: '100%' }}></Card>
      </Grid>
    </Grid>
  );
};

export default ClientsDetail;
