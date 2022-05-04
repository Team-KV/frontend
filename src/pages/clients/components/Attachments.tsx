import {
  Avatar,
  Box,
  Button,
  Card,
  IconButton,
  Link,
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
import React, { useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { useTranslation } from 'react-i18next';
import { showError, showSuccess } from 'redux/slices/snackbarSlice';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { Attachment } from 'models/Attachment';

import config from "config.json";

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

  const [attachments, setAttachments] = useState<Attachment[] | []>([]);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleChange = (newFile: any) => {
    ClientService.uploadAttachments(client.id, newFile)
      .then((fetchedAttachments) => {
        const message =
          fetchedAttachments.length > 1
            ? 'clients:isFilesUploaded'
            : 'clients:isFileUploaded';
        dispatch(showSuccess(t(message)));
        setAttachments([...attachments, ...fetchedAttachments]);
        setFile(newFile);
        handleClose();
      })
      .catch((err) => {
        const message = err.response.data.message;
        dispatch(showError(message));
      });
  };

  useEffect(() => {
    if (client?.attachments) setAttachments([...client.attachments]);
    console.log(client?.attachments);
  }, [client]);

  const deleteAttachment = (id: number) => {
    ClientService.deleteAttachment(id)
      .then(() => {
        dispatch(showSuccess(t('clients:isFileDeleted')));
        if (attachments)
          setAttachments(
            attachments.filter((attachment) => attachment.id !== id)
          );
      })
      .catch((err) => {
        const message = err.response.data.message;
        dispatch(showError(message));
      });
  };

  const openAttachment = (url: string) => {
    console.log(url);
    var a = document.createElement('a');
    a.href = config.SERVER_URL + url;
    a.click();
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
        <List sx={{ overflow: 'auto', height: '100%', maxHeight: 380 }}>
          {attachments?.map((attachment) => {
            return (
              <ListItem
                key={attachment.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                      deleteAttachment(attachment.id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
                onClick={() => openAttachment(attachment.url)}
              >
                <ListItemAvatar
                  className="hover"
                >
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  onClick={() => openAttachment(attachment.url)}
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
