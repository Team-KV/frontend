import { Box, Card, Typography } from '@mui/material';
import { t } from 'i18next';
import { GraphData } from 'models/GraphData';

import Chart from 'chart.js/auto';
import { useEffect, useState } from 'react';

const Graph = ({ graph }: { graph: GraphData[] | undefined }) => {
  const [renderedGraph, setRenderedGraph] = useState(false);

  useEffect(() => {
    if (graph && !renderedGraph) {
      const ctx: any = document.getElementById('myChart');
      const myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: graph?.map((data) =>
            new Date(data.dateTime).toLocaleDateString()
          ),
          datasets: [
            {
              data: graph?.map((data) => data.progress),
              borderColor: 'rgb(0, 234, 255)',
              tension: 0.1,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              suggestedMin: -5,
              suggestedMax: 5,
            },
          },
        },
      });
      setRenderedGraph(true);
    }
  }, [graph]);

  return (
    <Card
      sx={{
        height: '100%',
        p: 4,
      }}
      elevation={7}
    >
      <Typography variant="h5" fontWeight={500}>
        {t('dashboard:progress')}
      </Typography>
      <Box pt={1}>
        <canvas height={180} id="myChart"></canvas>
      </Box>
    </Card>
  );
};

export default Graph;
