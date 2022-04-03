import {
  Box,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import SEX from 'constants/sex';
import { Client } from 'models/Client';

import NumberFormat from 'react-number-format';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import Section from 'components/Section';

const ClientsForm = ({ client }: { client: Client }) => {
  const [sex, setSex] = useState(client?.sex ?? '');
  const [weight, setWeight] = useState(client?.weight);
  const [t] = useTranslation();

  const gridXs = 12;
  const gridMd = 6;
  const gridLg = 4;

  return (
    <Box maxWidth={1366} m={'auto'}>
      {/* General info */}
      <Section first label={t('generalInfo')} />
      <Grid container spacing={3}>
        <Grid item xs={gridXs} md={gridMd} lg={gridLg}>
          <TextField fullWidth label={t('firstName')} id="firstName" />
        </Grid>
        <Grid item xs={gridXs} md={gridMd} lg={gridLg}>
          <TextField fullWidth label={t('lastName')} id="lastName" />
        </Grid>
        <Grid item xs={gridXs} md={gridMd} lg={gridLg}>
          <TextField
            fullWidth
            select
            size="small"
            id="sex"
            value={sex}
            label={t('sex')}
            onChange={(event) => {
              setSex(+event.target.value);
            }}
          >
            {SEX.map((sex) => (
              <MenuItem key={sex.id} value={sex.value}>
                {t(sex.id)}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={gridXs} md={gridMd} lg={gridLg}>
          <TextField fullWidth label={t('dateOfBirth')} id="dateOfBirth" />
        </Grid>
        <Grid item xs={gridXs} md={gridMd} lg={gridLg}>
          <TextField
            fullWidth
            label={t('insuranceCompany')}
            id="insuranceCompany"
          />
        </Grid>
        <Grid item xs={gridXs} md={gridMd} lg={gridLg}>
          <TextField
            fullWidth
            label={t('personalInformation')}
            id="personalInformation"
          />
        </Grid>
      </Grid>

      {/* Contact info */}
      <Section label={t('contactInfo')} />
      <Grid container spacing={3}>
        <Grid item xs={gridXs} md={gridMd} lg={gridLg}>
          <TextField fullWidth label={t('phone')} id="phone" />
        </Grid>

        <Grid item xs={gridXs} md={gridMd} lg={gridLg}>
          <TextField fullWidth label={t('email')} id="email" />
        </Grid>

        <Grid item xs={gridXs} md={gridMd} lg={gridLg}>
          <TextField fullWidth label={t('street')} id="street" />
        </Grid>

        <Grid item xs={gridXs} md={gridMd} lg={gridLg}>
          <TextField fullWidth label={t('city')} id="city" />
        </Grid>

        <Grid item xs={gridXs} md={gridMd} lg={gridLg}>
          <TextField fullWidth label={t('postalCode')} id="postalCode" />
        </Grid>
      </Grid>

      {/* Health info */}
      <Section label={t('healthInfo')} />
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label={t('weight')}
            id="weight"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">kg</InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label={t('height')}
            id="height"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">cm</InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={gridXs} md={gridMd} lg={gridLg}>
          <TextField
            multiline
            fullWidth
            rows={4}
            label={t('sport')}
            id="sport"
          />
        </Grid>

        <Grid item xs={gridXs} md={gridMd} lg={gridLg}>
          <TextField
            multiline
            fullWidth
            rows={4}
            label={t('pastIllneses')}
            id="pastIllneses"
          />
        </Grid>
        <Grid item xs={gridXs} md={gridMd} lg={gridLg}>
          <TextField
            multiline
            fullWidth
            rows={4}
            label={t('injuriesSuffered')}
            id="injuriesSuffered"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            multiline
            fullWidth
            rows={6}
            label={t('anamnesis')}
            id="anamnesis"
          />
        </Grid>

        <Grid item xs={12} md={6} >
          <TextField multiline fullWidth rows={6} label={t('note')} id="note" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClientsForm;
