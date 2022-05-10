import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom';

import { csCZ } from '@mui/material/locale';

import store from './store';

import 'i18n';

const theme = createTheme(
  {
    // palette: {
    //   primary: { main: '#94D1AF' },
    // },
    // shape: {
    //   borderRadius: 25,
    // },
    // typography: {
    //   fontFamily: ['Nunito', 'Open Sans'].join(','),
    // },
    // components: {
    //   MuiButton: {
    //     defaultProps: {
    //       variant: 'outlined',
    //       size: 'small',
    //     },
    //   },
    //   MuiTextField: {
    //     defaultProps: {
    //       variant: 'outlined',
    //       size: 'small',
    //     },
    //   },
    // },
  },
  csCZ
);

import App from './App';
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
