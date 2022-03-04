import React from 'react';
import axios from 'axios';

import {
  Box,
  Button,
  Container,
  TextField,
  CssBaseline,
  Typography,
} from '@mui/material';

function Login() {
  let token = '';

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const loginCredentials = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    // debugger;

    axios.post('http://localhost:80/api/login', loginCredentials).then((response) => {
      token = response.data.token;
      console.log(token);
      
      const config = { headers: { Authorization: `Bearer ${token}` } }
      
      axios.get(
        'http://localhost:80/api/test', 
        config).then((response) => {
          console.log(response);
        })
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
          Login
        </Typography>
        <Box component={'form'} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
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
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
