import { Box, Grid, InputAdornment } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Client } from 'models/Client';

import { Controls } from 'components/Controls';

import { useTranslation } from 'react-i18next';
import Section from 'components/Section';
import { Form, useForm } from 'components/Form';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import SEX from 'constants/sex';
import { ClientDTO } from 'models/dto/ClientDTO';
import clientService from 'api/services/clientService';

const ClientsForm = () => {
  let { id } = useParams();

  const [t] = useTranslation();
  const { values, setValues, handleInput } = useForm({});

  const gridXs = 12;
  const gridMd = 6;
  const gridLg = 4;

  const onSubmit = (e: any) => {
    e.preventDefault();
    const dto = new ClientDTO(values);
    clientService.addClient(dto).then((res) => {
      console.log(res);
    }).catch(({request}) => {
      console.log(request);
    });
  };

  return (
    <Form onSubmit={onSubmit}>
      <Box
        maxWidth={600}
        m="auto"
        display="flex"
        flexDirection={'column'}
        gap={2}
      >
        {/* General info */}
        <Section first label={t('generalInfo')} />
        <Controls.Input
          required
          name="firstName"
          onChange={handleInput}
          value={values.firstName || ''}
        />
        <Controls.Input
          required
          name="lastName"
          onChange={handleInput}
          value={values.lastName || ''}
        />
        <Controls.Select
          required
          name="sex"
          onChange={handleInput}
          options={SEX}
          value={values.sex || ''}
        />
        <Controls.Input
          required
          name="dateOfBirth"
          onChange={handleInput}
          value={values.dateOfBirth || ''}
        />
        <Controls.Input
          required
          name="phone"
          onChange={handleInput}
          value={values.phone || ''}
        />

        {/* <Controls.DatePicker
              name="dateOfBirth"
              onChange={handleInput}
              value={new Date()}
            /> */}
        <TextField
          fullWidth
          label={t('insuranceCompany')}
          id="insuranceCompany"
        />
        <TextField
          fullWidth
          label={t('personalInformation')}
          id="personalInformation"
        />

        {/* Contact info */}
        <Section label={t('contactInfo')} />

        <TextField fullWidth label={t('email')} id="email" />

        <TextField fullWidth label={t('street')} id="street" />
        <TextField fullWidth label={t('city')} id="city" />

        <TextField fullWidth label={t('postalCode')} id="postalCode" />

        {/* Health info */}
        <Section label={t('healthInfo')} />
        <TextField
          fullWidth
          label={t('weight')}
          id="weight"
          InputProps={{
            endAdornment: <InputAdornment position="start">kg</InputAdornment>,
          }}
        />

        <TextField
          fullWidth
          label={t('height')}
          id="height"
          InputProps={{
            endAdornment: <InputAdornment position="start">cm</InputAdornment>,
          }}
        />
        <TextField multiline fullWidth rows={4} label={t('sport')} id="sport" />
        <TextField
          multiline
          fullWidth
          rows={4}
          label={t('pastIllneses')}
          id="pastIllneses"
        />
        <TextField
          multiline
          fullWidth
          rows={4}
          label={t('injuriesSuffered')}
          id="injuriesSuffered"
        />

        <TextField
          multiline
          fullWidth
          rows={6}
          label={t('anamnesis')}
          id="anamnesis"
        />

        <TextField multiline fullWidth rows={6} label={t('note')} id="note" />

        <Box display={'flex'} justifyContent="space-between">
          <Controls.Button
            color="primary"
            size="large"
            text="cancel"
            type="submit"
            variant="outlined"
          />
          <Controls.Button
            color="primary"
            size="large"
            sx={{ width: 200 }}
            text="save"
            type="submit"
            variant="contained"
          />
        </Box>
      </Box>
    </Form>
  );
};

export default ClientsForm;
