import axios, { AxiosResponse } from 'axios';

import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'hooks';
import { showError, showSuccess } from 'redux/slices/snackbarSlice';
import config from 'config.json';
import { fetchUser } from 'redux/slices/userSlice';
import { useEffect } from 'react';

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [t] = useTranslation();
  const user = useAppSelector<any>((state) => state.user);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const loginCredentials = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    axios
      .post(config.SERVER_URL + 'login', loginCredentials, addConfig())
      .then((response: AxiosResponse) => {
        localStorage.setItem('token', response.data.Token);
        dispatch(showSuccess(t('isLoggedIn')));
        dispatch(fetchUser());
      })
      .catch((err) => {
        const message = err.response.data.message;
        dispatch(showError(message));
      });
  };

  useEffect(() => {
    if (user.value && user.value.role === 1) {
      navigate('/clients');
    }
    if (user.value && user.value.role === 0) {
      navigate('/dashboard');
    }
  }, [user.value]);

  const addConfig = () => {
    return {
      headers: {
        'X-localization': 'cs',
      },
    };
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
            margin='normal'
            required
            fullWidth
            id='email'
            label={t('email')}
            name='email'
            autoComplete='email'
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label={t('password')}
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <Button
            fullWidth
            variant={'outlined'}
            type={'submit'}
            sx={{ mt: 3, mb: 2 }}
          >
            {t('loginButton')}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
