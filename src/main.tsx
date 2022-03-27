import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom';

import { csCZ, enUS } from '@mui/material/locale';

import { Provider } from 'react-redux';
// import store from './store';

const theme = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
    },
  },
  csCZ,
);

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {/* <Provider store={store}> */}
      <App />
      {/* </Provider> */}
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
