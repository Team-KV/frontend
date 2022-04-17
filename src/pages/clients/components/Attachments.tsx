import {
  Avatar,
  Box,
  Button,
  Card,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
} from '@mui/material';
import ClientService from 'api/services/clientService';
import CardTitle from 'components/CardTitle';
import { useAppDispatch } from 'hooks';
import { Client } from 'models/Client';
import React, { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { useTranslation } from 'react-i18next';
import { showError, showSuccess } from 'redux/slices/snackbarSlice';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';

const fileTypes = ['jpeg', 'png', 'pdf', 'doc', 'jpg', 'docx'];

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  height: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const Attachments = ({ client }: { client: Client }) => {
  const [t] = useTranslation();
  const dispatch = useAppDispatch();

  const [file, setFile] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const [attachments, setAttachments] = useState([
    {
      fileName: 'Lékařská zpráva',
      type: 'pdf',
    },
    {
      fileName: 'Výkonnové testy',
      type: 'jpeg',
    },
    {
      fileName: 'Obrázek kočičky',
      type: 'png',
    },
    {
      fileName: 'Recept na guláš',
      type: 'docx',
    },
    {
      fileName: 'Zlomená ruka ty bláho',
      type: 'pdf',
    },
    {
      fileName: 'Přání k narozkám asi',
      type: 'doc',
    },
  ]);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleChange = (file: any) => {
    setFile(file);
    ClientService.uploadAttachments(client.id, file)
      .then((response) => {
        dispatch(showSuccess(t('clients:isFilesUploaded')));
      })
      .catch((err) => {
        const message = err.response.data.message;
        dispatch(showError(message));
      });
  };

  const deleteAttachment = (e) => {
    debugger;
  };

  const openAttachment = (e) => {
    debugger;
  };

  function generate(element: React.ReactElement) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      })
    );
  }

  return (
    <Card
      sx={{
        height: '100%',
        p: 4,
      }}
      elevation={7}
    >
      <Modal open={openModal} onClose={handleClose}>
        <Box sx={style}>
          <FileUploader
            label={t('clients:dragOrDropFiles')}
            hoverTitle={t('clients:dropHere')}
            classes={'drop-area drop-zone'}
            handleChange={handleChange}
            name="files"
            types={fileTypes}
          />
        </Box>
      </Modal>
      <CardTitle text={t('attachments')} />
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'space-between'}
      >
        <List sx={{ overflow: 'auto', height: '100%', maxHeight: 380}}>
          {attachments.map((attachment) => {
            return (
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon onClick={deleteAttachment} />
                  </IconButton>
                }
              >
                <ListItemAvatar onClick={openAttachment} className="hover">
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  onClick={openAttachment}
                  primary={attachment.fileName}
                  secondary={attachment.type.toUpperCase()}
                  className="hover"
                />
              </ListItem>
            );
          })}
        </List>

        <Button
          variant="contained"
          onClick={handleOpen}
          fullWidth
          color="success"
        >
          {t('clients:uploadFile')}
        </Button>
      </Box>
    </Card>
  );
};

export default Attachments;
