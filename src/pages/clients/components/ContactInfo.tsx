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
      <CardTitle text={t('clients:contactInfo')} />

      <TextItem label={t('clients:phone')} value={client?.phone} />
      <TextItem label={t('clients:email')} value={client?.email} />
      <TextItem
        label={t('clients:dateOfBirth')}
        value={client?.dateOfBirth ? new Date(client.dateOfBirth).toLocaleDateString('cs-CZ') : ''}
      />
      <TextItem label={t('clients:street')} value={client?.street} />
      <TextItem label={t('clients:postalCode')} value={client?.postalCode} />
      <TextItem label={t('clients:city')} value={client?.city} />
    </Card>
  );
};

export default ContactInfo;
