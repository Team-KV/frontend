import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
} from '@mui/material';
import exerciseFileService from 'api/services/exerciseFileService';
import exerciseService from 'api/services/exerciseService';
import CardTitle from 'components/CardTitle';
import { useAppDispatch } from 'hooks';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { Exercise } from 'models/Exercise';
import { ExerciseFile } from 'models/ExerciseFile';
import React, { useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { useTranslation } from 'react-i18next';
import { showError, showSuccess } from 'redux/slices/snackbarSlice';

import config from 'config.json';

const fileTypes = ['jpg', 'png', 'mp4', 'avi', 'jpeg', 'mov'];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  height: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const ExerciseFiles = ({ exercise }: { exercise: Exercise }) => {
  const [t] = useTranslation();
  const dispatch = useAppDispatch();

  const [file, setFile] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const [files, setFiles] = useState<ExerciseFile[] | []>([]);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleChange = (newFile: any) => {
    setFile(newFile);
    exerciseService
      .uploadFile(exercise.id, newFile)
      .then((fetchedFiles) => {
        const message =
          fetchedFiles.length > 1
            ? 'exercises:isFilesUploaded'
            : 'exercises:isFileUploaded';
        dispatch(showSuccess(t(message)));
        setFiles([...files, ...fetchedFiles]);
        handleClose();
      })
      .catch((err) => {
        const message = err.response.data.message;
        dispatch(showError(message));
      });
  };

  useEffect(() => {
    if (exercise?.files) setFiles([...exercise.files]);
  }, [exercise?.files]);

  const deleteExerciseFile = (id: number) => {
    exerciseFileService
      .deleteExerciseFile(id)
      .then(() => {
        dispatch(showSuccess(t('clients:isFileDeleted')));
        if (files) setFiles(files.filter((oneFile) => oneFile.id !== id));
      })
      .catch((err) => {
        const message = err.response.data.message;
        dispatch(showError(message));
      });
  };

  const openFile = (url: string) => {
    const a = document.createElement('a');
    a.href = config.SERVER_URL + url;
    a.click();
  };

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
            name='files'
            types={fileTypes}
          />
        </Box>
      </Modal>
      <CardTitle text={t('files')} />
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'space-between'}
      >
        <List sx={{ overflow: 'auto', height: '100%', maxHeight: 260 }}>
          {files?.map((oneFile) => {
            return (
              <ListItem
                key={oneFile.id}
                secondaryAction={
                  <IconButton
                    edge='end'
                    aria-label='delete'
                    onClick={() => {
                      deleteExerciseFile(oneFile.id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar
                  onClick={() => {
                    openFile(oneFile.url);
                  }}
                  className='hover'
                >
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  onClick={() => {
                    openFile(oneFile.url);
                  }}
                  primary={oneFile.fileName}
                  secondary={oneFile.type.toUpperCase()}
                  className='hover'
                />
              </ListItem>
            );
          })}
        </List>
        <Divider />
        <Button
          variant='contained'
          onClick={handleOpen}
          color='success'
          sx={{
            margin: 'auto',
            marginTop: 1,
            width: 240,
          }}
        >
          {t('exercises:uploadFile')}
        </Button>
      </Box>
    </Card>
  );
};

export default ExerciseFiles;
