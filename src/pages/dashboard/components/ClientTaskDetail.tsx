import { Box, Button, Modal } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ClientTaskDetail = () => {
  const navigate = useNavigate();
  const [t] = useTranslation();

  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    navigate(-1);
    return setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box display='flex' flexDirection='column' gap={5}>
            {t('notImplementedYet')}
            <Button variant='contained' onClick={handleClose}>
              {t('back')}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ClientTaskDetail;
