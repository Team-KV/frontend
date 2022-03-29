import axios, { Axios, AxiosResponse } from 'axios';
import { useTranslation } from 'react-i18next';
import 'i18n';

import {
  Box,
  Button,
  Container,
  TextField,
  CssBaseline,
  Typography,
} from '@mui/material';

function Login() {
  const { t } = useTranslation();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const loginCredentials = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    axios
      .post('http://localhost/api/login', loginCredentials)
      .then((response: AxiosResponse) => {
        localStorage.setItem('token', response.data.Token);
        console.log('TOKEN IS SET: ' + localStorage.getItem('token'));
      });
  };

  return (
    <Container maxWidth={'xs'}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component={'h1'} variant={'h5'}>
          {t('login')}
        </Typography>
        <Box component={'form'} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={t('email')}
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={t('password')}
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            fullWidth
            variant={'outlined'}
            type={'submit'}
            sx={{ mt: 3, mb: 2 }}
          >
            {t('login_button')}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
