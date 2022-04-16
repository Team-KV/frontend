import { Card, Divider, Grid } from '@mui/material';
import { Client } from 'models/Client';
import TextItem from 'components/TextItem';
import CardTitle from 'components/CardTitle';
import { useTranslation } from 'react-i18next';
import { zhCN } from 'date-fns/locale';

const HealthInfo = ({ client }: { client: Client }) => {
  const [t] = useTranslation();

  return (
    <Card
      sx={{
        height: '100%',
        p: 4,
      }}
      elevation={7}
    >
      <CardTitle text={t('clients:healthInfo')} />
      <Grid container>
        <Grid container item xs={9}>
          <Grid item xs={12} sm={6} lg={3}>
            <TextItem
              label={t('clients:height')}
              value={
                client?.height?.toString()
                  ? client?.height?.toString() + ' cm'
                  : undefined
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <TextItem
              label={t('clients:weight')}
              value={
                client?.weight?.toString()
                  ? client?.weight?.toString() + ' kg'
                  : undefined
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <TextItem label={t('clients:pin')} value={client?.pin} />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <TextItem
              label={t('clients:insuranceCompany')}
              value={client?.insuranceCompany?.toString()}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextItem label={t('clients:pastIllneses')} value={client?.pastIllneses} />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextItem
              label={t('clients:injuriesSuffered')}
              value={client?.injuriesSuffered}
            />
          </Grid>
        </Grid>
        <Grid item xs={3} mt={3}>
          Přílohy
        </Grid>
      </Grid>
      <TextItem label={t('clients:sport')} value={client?.sport} />
      <TextItem label={t('clients:anamnesis')} value={client?.anamnesis} />
      <TextItem label={t('clients:note')} value={client?.note} />
    </Card>
  );
};

export default HealthInfo;
