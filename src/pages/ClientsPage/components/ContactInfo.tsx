import { Box, Card, Grid, Typography } from '@mui/material';
import { Client } from 'models/Client';
import TextItem from 'components/TextItem';
import SEX from 'constants/sex';
import { t } from 'i18next';
import CardTitle from 'components/CardTitle';

const ContactInfo = ({ client }: { client: Client }) => {
  return (
    <Card
      sx={{
        height: '100%',
        p: 4,
      }}
      elevation={7}
    >
      <CardTitle text={t('contactInfo')} />

      <TextItem name={'phone'} value={client?.phone} />
      <TextItem name={'email'} value={client?.email} />
      <TextItem
        name={'dateOfBirth'}
        value={client?.dateOfBirth.toLocaleDateString('cs-CZ')}
      />
      <TextItem name={'street'} value={client?.street} />
      <TextItem name={'postalCode'} value={client?.postalCode} />
      <TextItem name={'city'} value={client?.city} />
    </Card>
  );
};

export default ContactInfo;
