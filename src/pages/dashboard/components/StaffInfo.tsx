import { Box, Card, Grid, Typography } from '@mui/material';
import TextItem from 'components/TextItem';
import { t } from 'i18next';
import CardTitle from 'components/CardTitle';
import { Staff } from 'models/Staff';

const StaffInfo = ({ staff }: { staff: Staff | undefined }) => {
  return (
    <Card
      sx={{
        height: '100%',
        p: 4,
      }}
      elevation={7}
    >
      <CardTitle text={t('dashboard:staffInfo')} />
      <TextItem label={t('dashboard:firstName')} value={staff?.firstName} />
      <TextItem label={t('dashboard:lastName')} value={staff?.lastName} />
      <TextItem label={t('dashboard:phone')} value={staff?.phone} />
    </Card>
  );
};

export default StaffInfo;
