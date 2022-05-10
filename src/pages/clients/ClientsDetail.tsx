import clientService from 'api/services/clientService';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Client } from 'models/Client';
import ContactInfo from './components/ContactInfo';
import { Button, Grid, Typography } from '@mui/material';
import HealthInfo from './components/HealthInfo';
import SEX from 'constants/sex';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { Box } from '@mui/system';
import { useAppDispatch } from 'hooks';
import { showError, showSuccess } from 'redux/slices/snackbarSlice';
import { useTranslation } from 'react-i18next';
import Events from './components/Events';
import Attachments from './components/Attachments';

const ClientsDetail = () => {
  const navigate = useNavigate();
  const [client, setClient] = useState<Client | null>(null);

  const [t] = useTranslation();

  const dispatch = useAppDispatch();
  const { id } = useParams();
  const sex = SEX.find((item) => item.value === client?.sex)?.id!;
  const sexIcon =
    sex === 'male' ? (
      <MaleIcon fontSize="large" />
    ) : sex === 'female' ? (
      <FemaleIcon fontSize="large" />
    ) : (
      ''
    );

  const deleteClient = () => {
    if (id) {
      clientService.deleteClient(+id).then(() => {
        dispatch(showSuccess(t('clients:isDeleted')));
        navigate('/clients');
      });
    }
  };

  const createUserFromClient = () => {
    if (id) {
      clientService.createUserFromClient(+id).then((fetchedClient) => {
        dispatch(showSuccess(t('clients:isUserCreated')));
        setClient(fetchedClient);
      }).catch((err) => {
        const message = err.response.data.message;
        dispatch(showError(message));
      })
    }
  };

  useEffect(() => {
    if (id === undefined) return;
    clientService
      .getClient(+id)
      .then((fetchedClient) => {
        setClient(fetchedClient);
      })
      .catch((err) => {
        const message = err.response.data.message;
        dispatch(showError(message));
        navigate('/clients');
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
            {client?.firstName} {client?.lastName}{' '}
            {client?.noCzech ? `(${t('clients:noCzech')})` : ''}
          </Typography>
        </Box>
        <Box>
          <Button
            sx={{ fontWeight: 'bold' }}
            onClick={() => navigate('/clients/' + client?.id + '/form')}
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
          <Events client={client!} />
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
          <HealthInfo client={client!} />
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <Attachments client={client!} />
        </Grid>
      </Grid>
      <Box mt={4} px={4} display="flex" justifyContent="space-between">
        {client?.user ? (
          <Typography variant='h6'>
            {t('clients:account') + ': ' + client.user?.email}
          </Typography>
        ) : (
          <Button
            sx={{ fontWeight: 'bold' }}
            color="info"
            variant="contained"
            size={'large'}
            onClick={createUserFromClient}
          >
            {t('clients:createUserFromClient')}
          </Button>
        )}
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
