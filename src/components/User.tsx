import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from 'redux/slices/userSlice';
import { showError, showSuccess } from 'redux/slices/snackbarSlice';
import { useTranslation } from 'react-i18next';
import LanguageIcon from '@mui/icons-material/Language';
import { AccountCircle } from '@mui/icons-material';
import React from 'react';
import { Button, Modal } from '@mui/material';
import { Controls } from './Controls';
import { Form, useForm } from './Form';
import userService from 'api/services/userService';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [t, i18n] = useTranslation();
  const user = useAppSelector<any>((state) => state.user);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { values, setValues, handleInput } = useForm({
    email: user.value.email,
    password: '',
    password_again: '',
  });

  const [openModal, setOpenModal] = useState(false);

  const handleModalOpen = () => {
    setOpenModal(true);
  };
  const handleModalClose = () => setOpenModal(false);

  const onSubmit = (e: Event) => {
    userService
      .changePassword(user.value.id, values)
      .then(() => {
        dispatch(showSuccess(t('passwordChanged')));
      })
      .catch((err) => {
        const message = err.response.data.message;
        dispatch(showError(message));
      });
    handleModalClose();
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch(showSuccess(t('isLoggedOut')));
    dispatch(logoutUser());
    navigate('/login');
  };

  const changeLanguage = () => {
    const currentLanguage = i18n.language;
    const desiredLanguage = currentLanguage === 'cs' ? 'en' : 'cs';
    i18n.changeLanguage(desiredLanguage);
    localStorage.setItem('locale', desiredLanguage); 
  };

  return (
    <div>
      <Modal open={openModal} onClose={handleModalClose}>
        <Box sx={style}>
          <Form onSubmit={onSubmit}>
            <Box display={'flex'} flexDirection={'column'} gap={2}>
              <Controls.Input
                name='password'
                label={t('password')}
                onChange={handleInput}
                value={values.password}
                type='password'
              />
              <Controls.Input
                name='password_again'
                label={t('passwordAgain')}
                onChange={handleInput}
                value={values.passwordAgain}
                type='password'
              />

              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
              >
                <Button onClick={handleModalClose} variant='outlined'>
                  {t('cancel')}
                </Button>
                <Button variant='contained' type='submit'>
                  {t('save')}
                </Button>
              </Box>
            </Box>
          </Form>
        </Box>
      </Modal>

      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        {user?.value?.email}
        <IconButton
          onClick={handleClick}
          size='small'
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
        >
          <AccountCircle htmlColor='white' fontSize='large' />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={changeLanguage}>
          <ListItemIcon>
            <LanguageIcon fontSize='small' />
          </ListItemIcon>
          {i18n.language === 'cs' ? t('english') : t('czech')}
        </MenuItem>
        <MenuItem onClick={handleModalOpen}>
          <ListItemIcon>
            <Settings fontSize='small' />
          </ListItemIcon>
          {t('changePassword')}
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          {t('logout')}
        </MenuItem>
      </Menu>
    </div>
  );
}
