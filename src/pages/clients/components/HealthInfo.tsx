import { Card, Divider, Grid } from '@mui/material';
import { Client } from 'models/Client';
import TextItem from 'components/TextItem';
import SEX from 'constants/sex';
import CardTitle from 'components/CardTitle';
import { t } from 'i18next';

const HealthInfo = ({ client }: { client: Client }) => {
  return (
    <Card
      sx={{
        height: '100%',
        p: 4,
      }}
      elevation={7}
    >
      <CardTitle text={t('healthInfo')} />
      <Grid container>
        <Grid container item xs={9}>
          <Grid item xs={12} sm={6} lg={3}>
            <TextItem
              name={'height'}
              value={
                client?.height?.toString()
                  ? client?.height?.toString() + ' cm'
                  : undefined
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <TextItem
              name={'weight'}
              value={
                client?.weight?.toString()
                  ? client?.weight?.toString() + ' kg'
                  : undefined
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <TextItem name={'pin'} value={client?.pin} />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <TextItem
              name={'insuranceCompany'}
              value={client?.insuranceCompany?.toString()}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextItem name={'pastIllneses'} value={client?.pastIllneses} />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextItem
              name={'injuriesSuffered'}
              value={client?.injuriesSuffered}
            />
          </Grid>
        </Grid>
        <Grid item xs={3} mt={3}>
          Přílohy
        </Grid>
      </Grid>
      <TextItem name={'sport'} value={client?.sport} />
      <TextItem name={'anamnesis'} value={client?.anamnesis} />
      <TextItem name={'note'} value={client?.note} />
    </Card>
  );
};

export default HealthInfo;
