import { Box, InputAdornment } from '@mui/material';

import { Controls } from 'components/Controls';

import { useTranslation } from 'react-i18next';
import Section from 'components/Section';
import { Form, useForm } from 'components/Form';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import SEX from 'constants/sex';
import clientService from 'api/services/clientService';
import { useAppDispatch } from 'hooks';
import { showSuccess, showError } from 'redux/slices/snackbarSlice';

const ClientsForm = () => {
  let { id } = useParams();
  let navigate = useNavigate();

  const [t] = useTranslation();
  const { values, setValues, handleInput } = useForm({});

  const dispatch = useAppDispatch();

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (id) {
      clientService
        .updateClient(+id, values)
        .then((values) => {
          debugger;
          dispatch(showSuccess(t('clients:isUpdated')));
          navigate('/clients/' + id);
        })
        .catch((err) => {
          const message = err.response.data.message;
          dispatch(showError(message));
        });
    } else {
      clientService
        .addClient(values)
        .then((fetchedClient) => {
          dispatch(showSuccess(t('clients:isAdded')));
          navigate('/clients/' + fetchedClient.id);
        })
        .catch((err) => {
          const message = err.response.data.message;
          dispatch(showError(message));
        });
    }
  };

  const handleCheck = (event: any) => {
    const checked = event.target.checked;
    setValues({ ...values, noCzech: checked });
  };

  const handleCancel = () => {
    navigate('/clients');
  };

  useEffect(() => {
    if (id) {
      clientService.getClient(+id).then((fetchedClient) => {
        setValues({
          ...fetchedClient,
        });
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
        <Section first label={t('clients:generalInfo')} />
        <Controls.Input
          validators={['required']}
          errorMessages={['this field is required']}
          name="firstName"
          label={t('clients:firstName')}
          onChange={handleInput}
          value={values.firstName || ''}
        />
        <Controls.Input
          validators={['required']}
          errorMessages={['this field is required']}
          name="lastName"
          label={t('clients:lastName')}
          onChange={handleInput}
          value={values.lastName || ''}
        />
        <Controls.Select
          name="sex"
          label={t('clients:sex')}
          onChange={handleInput}
          options={SEX}
          value={values.sex || ''}
        />
        <Controls.DatePicker
          required
          name="dateOfBirth"
          label={t('clients:dateOfBirth')}
          onChange={handleInput}
          value={values.dateOfBirth ?? ''}
        />
        <Controls.Input
          validators={['required']}
          errorMessages={['this field is required']}
          name="phone"
          label={t('clients:phone')}
          onChange={handleInput}
          value={values.phone || ''}
        />

        <Controls.Input
          name="insuranceCompany"
          label={t('clients:insuranceCompany')}
          onChange={handleInput}
          value={values.insuranceCompany || ''}
        />

        <Controls.Checkbox
          name="noCzech"
          checked={values.noCzech ?? false}
          label={t('clients:noCzech')}
          onChange={handleCheck}
          value={values.noCzech}
        />

        {!values.noCzech ? (
          <Controls.Input
            name="pin"
            label={t('clients:pin')}
            onChange={handleInput}
            value={values.pin || ''}
          />
        ) : (
          ''
        )}

        {/* Contact info */}
        <Section label={t('clients:contactInfo')} />

        <Controls.Input
          errorMessages={['not an email']}
          validators={['isEmail']}
          name="email"
          label={t('clients:email')}
          onChange={handleInput}
          value={values.email || ''}
        />

        <Controls.Input
          name="street"
          label={t('clients:street')}
          onChange={handleInput}
          value={values.street || ''}
        />

        <Controls.Input
          name="city"
          label={t('clients:city')}
          onChange={handleInput}
          value={values.city || ''}
        />

        <Controls.Input
          name="postalCode"
          label={t('clients:postalCode')}
          onChange={handleInput}
          value={values.postalCode || ''}
        />

        {/* Health info */}
        <Section label={t('clients:healthInfo')} />
        <Controls.Input
          name="weight"
          label={t('clients:weight')}
          onChange={handleInput}
          value={values.weight || ''}
          InputProps={{
            endAdornment: <InputAdornment position="start">kg</InputAdornment>,
          }}
        />

        <Controls.Input
          name="height"
          label={t('clients:height')}
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
          label={t('clients:sport')}
          onChange={handleInput}
          value={values.sport || ''}
        />

        <Controls.Input
          multiline
          rows={2}
          name="pastIllneses"
          label={t('clients:pastIllneses')}
          onChange={handleInput}
          value={values.pastIllneses || ''}
        />

        <Controls.Input
          multiline
          rows={2}
          name="injuriesSuffered"
          label={t('clients:injuriesSuffered')}
          onChange={handleInput}
          value={values.injuriesSuffered || ''}
        />

        <Controls.Input
          multiline
          rows={4}
          name="anamnesis"
          label={t('clients:anamnesis')}
          onChange={handleInput}
          value={values.anamnesis || ''}
        />

        <Controls.Input
          multiline
          rows={6}
          name="note"
          label={t('clients:note')}
          onChange={handleInput}
          value={values.note || ''}
        />

        <Box display={'flex'} justifyContent="space-between">
          <Controls.Button
            onClick={handleCancel}
            color="primary"
            size="large"
            label={t('cancel')}
            variant="outlined"
          />
          <Controls.Button
            color="primary"
            size="large"
            sx={{ width: 200 }}
            label={t('save')}
            type="submit"
            variant="contained"
          />
        </Box>
      </Box>
    </Form>
  );
};

export default ClientsForm;
