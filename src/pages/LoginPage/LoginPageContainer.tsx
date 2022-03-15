import axios from 'axios';
import { useTranslation } from 'react-i18next';
import '../../locales/i18n';

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

  let token = '';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const loginCredentials = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    console.log(loginCredentials);

    axios
      .post('http://localhost/api/login', loginCredentials)
      .then((response) => {
        token = response.data.Token;

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        axios.get('http://localhost/api/info', config).then((response) => {
          console.log(response);
        });
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
          {t('LOGIN_LABEL')}
        </Typography>
        <Box component={'form'} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={t('LOGIN_EMAIL')}
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={t('LOGIN_PASSWORD')}
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
            {t('LOGIN_BUTTON')}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
