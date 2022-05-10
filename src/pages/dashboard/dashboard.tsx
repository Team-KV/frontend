import dashboardService from 'api/services/dashboardService';
import { Dashboard } from 'models/Dashboard';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import StaffInfo from './components/StaffInfo';
import Event from './components/Event';
import Graph from './components/Graph';
import Tasks from './components/Tasks';
import { Grid } from '@mui/material';


const DashboardPage = () => {
  const [t] = useTranslation();
  const [dashboard, setDashboard] = useState<Dashboard>();

  useEffect(() => {
    dashboardService.getDashboard().then((fetchedDashboard) => {
      setDashboard({ ...fetchedDashboard });
    });
  }, []);

  return (
    <div>
      <h2>{t('dashboard:yourDashboard')}</h2>
      <Grid container spacing={4} py={1}>
        <Grid item xs={12} md={6}>
          <StaffInfo staff={dashboard?.staff} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Graph graph={dashboard?.graph} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Event event={dashboard?.event} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Tasks tasks={dashboard?.tasks} />
        </Grid>
      </Grid>
    </div>
  );
};

export default DashboardPage;
