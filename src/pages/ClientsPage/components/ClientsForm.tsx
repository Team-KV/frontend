import {
  Box,
  FormControlLabel,
  FormGroup,
  Grid,
  InputAdornment,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { Client } from 'models/Client';

import { Controls } from 'components/Controls';

import { useTranslation } from 'react-i18next';
import Section from 'components/Section';
import { Form, useForm } from 'components/Form';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import SEX from 'constants/sex';
import { ClientDTO } from 'models/dto/ClientDTO';
import clientService from 'api/services/clientService';

const ClientsForm = () => {
  let { id } = useParams();
  let navigate = useNavigate();

  const [t] = useTranslation();
  const { values, setValues, handleInput } = useForm({});

  const gridXs = 12;
  const gridMd = 6;
  const gridLg = 4;

  const onSubmit = (e: any) => {
    e.preventDefault();
    const dto = new ClientDTO(values);
    if (id) {
      clientService
        .updateClient(+id, dto)
        .then(() => {
          debugger;
          navigate('/clients/' + id);
        })
        .catch((res) => {
          debugger;
        });
    } else {
      clientService.addClient(dto).then((data) => {
        navigate('/clients/' + data.Client.id);
      });
    }
  };
  useEffect(() => {
    if (id) {
      clientService.getClient(+id).then((data) => {
        setValues(new Client({ ...data.Client }));
      });
    }
  }, []);

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
          validators={['required']}
          errorMessages={['this field is required']}
          name="firstName"
          onChange={handleInput}
          value={values.firstName || ''}
        />
        <Controls.Input
          validators={['required']}
          errorMessages={['this field is required']}
          name="lastName"
          onChange={handleInput}
          value={values.lastName || ''}
        />
        <Controls.Select
          name="sex"
          onChange={handleInput}
          options={SEX}
          value={values.sex || ''}
        />
        <Controls.DatePicker
          name="dateOfBirth"
          onChange={handleInput}
          value={values.dateOfBirth || null}
        />
        <Controls.Input
          validators={['required']}
          errorMessages={['this field is required']}
          name="phone"
          onChange={handleInput}
          value={values.phone || ''}
        />

        <Controls.Input
          name="insuranceCompany"
          onChange={handleInput}
          value={values.insuranceCompany || ''}
        />

        {/* <Controls.Checkbox
          name="noCzech"
          onChange={handleInput}
          value={values.noCzech || false}
        /> */}

        <Controls.Input
          name="pin"
          onChange={handleInput}
          value={values.pin || ''}
        />

        {/* Contact info */}
        <Section label={t('contactInfo')} />

        <Controls.Input
          errorMessages={['not an email']}
          validators={['isEmail']}
          name="email"
          onChange={handleInput}
          value={values.email || ''}
        />

        <Controls.Input
          name="street"
          onChange={handleInput}
          value={values.street || ''}
        />

        <Controls.Input
          name="city"
          onChange={handleInput}
          value={values.city || ''}
        />

        <Controls.Input
          name="postalCode"
          onChange={handleInput}
          value={values.postalCode || ''}
        />

        {/* Health info */}
        <Section label={t('healthInfo')} />
        <Controls.Input
          name="weight"
          onChange={handleInput}
          value={values.weight || ''}
          InputProps={{
            endAdornment: <InputAdornment position="start">kg</InputAdornment>,
          }}
        />

        <Controls.Input
          name="height"
          onChange={handleInput}
          value={values.height || ''}
          InputProps={{
            endAdornment: <InputAdornment position="start">cm</InputAdornment>,
          }}
        />

        <Controls.Input
          multiline
          rows={2}
          name="sport"
          onChange={handleInput}
          value={values.sport || ''}
        />

        <Controls.Input
          multiline
          rows={2}
          name="pastIllneses"
          onChange={handleInput}
          value={values.pastIllneses || ''}
        />

        <Controls.Input
          multiline
          rows={2}
          name="injuriesSuffered"
          onChange={handleInput}
          value={values.injuriesSuffered || ''}
        />

        <Controls.Input
          multiline
          rows={4}
          name="anamnesis"
          onChange={handleInput}
          value={values.anamnesis || ''}
        />

        <Controls.Input
          multiline
          rows={6}
          name="note"
          onChange={handleInput}
          value={values.note || ''}
        />

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
