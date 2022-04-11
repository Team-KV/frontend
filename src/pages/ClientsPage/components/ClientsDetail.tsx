import clientService from 'api/services/clientService';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Client } from 'models/Client';
import ContactInfo from './ContactInfo';
import NotFound from 'components/NotFound';
import { Button, Card, Grid, Typography } from '@mui/material';
import HealthInfo from './HealthInfo';
import SEX from 'constants/sex';
import { t } from 'i18next';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import Events from './Events';
import { Box } from '@mui/system';

const ClientsDetail = () => {
  let navigate = useNavigate();
  const [client, setClient] = useState<Client | null>(null);
  let { id } = useParams();
  const sex = SEX.find((item) => item.value === client?.sex)?.id!;
  const sexIcon =
    sex === 'male' ? (
      <MaleIcon fontSize="large" />
    ) : sex === 'female' ? (
      <FemaleIcon fontSize="large" />
    ) : (
      ''
    );

  const navigateToForm = (client: any) => {
    navigate('/clients/' + client.id + '/form');
  };

  const deleteClient = () => {
    if (id) {
      clientService.deleteClient(+id).then((res) => {
        navigate('/clients');
      });
    }
  };

  useEffect(() => {
    if (id === undefined) return;
    clientService.getClient(+id).then((data) => {
      setClient(new Client({ ...data.Client }));
      if (!client) return <NotFound />;
    });
  }, []);

  return (
    <>
      <Box
        mt={2}
        mb={4}
        px={4}
        display={'flex'}
        justifyContent={'space-between'}
        alignItems="center"
      >
        <Box
          display={'flex'}
          justifyContent="start"
          alignItems="center"
          gap={1}
        >
          {sexIcon}
          <Typography variant="h4" fontWeight={500} letterSpacing={2}>
            {client?.firstName} {client?.lastName}
          </Typography>
        </Box>
        <Box>
          <Button
            sx={{ fontWeight: 'bold' }}
            onClick={() => navigateToForm(client)}
            variant="contained"
            size={'large'}
            color="warning"
          >
            {t('edit')}
          </Button>
        </Box>
      </Box>
      <Grid container spacing={4} py={1}>
        <Grid item xs={12} md={5} lg={4}>
          <ContactInfo client={client!} />
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
          <Events />
        </Grid>
        <Grid item xs={12}>
          <HealthInfo client={client!} />
        </Grid>
      </Grid>
      <Box mt={4} px={4} display="flex" justifyContent="space-between">
        <Button
          sx={{ fontWeight: 'bold' }}
          color="info"
          variant="contained"
          size={'large'}
        >
          Empty slot
        </Button>
        <Button
          sx={{ fontWeight: 'bold' }}
          color="error"
          onClick={deleteClient}
          variant="contained"
          size={'large'}
        >
          {t('delete')}
        </Button>
      </Box>
    </>
  );
};

export default ClientsDetail;
