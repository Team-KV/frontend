import { Box, Button, Card, Slider } from '@mui/material';
import recordService from 'api/services/recordService';
import TextItem from 'components/TextItem';
import { useAppDispatch } from 'hooks';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { showError, showSuccess } from 'redux/slices/snackbarSlice';
import Section from 'components/Section';

const RecordDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [t] = useTranslation();
  const navigate = useNavigate();

  const [record, setRecord] = useState({
    progress: 0,
    progressNote: '',
    exerciseNote: '',
    text: '',
  });

  useEffect(() => {
    recordService
      .getRecord(+id!)
      .then((fetchedRecord) => {
        setRecord({ ...fetchedRecord });
      })
      .catch((err) => {
        const message = err.response?.data?.message;
        dispatch(showError(message));
        navigate('/calendar');
      });
  }, []);

  const handleDelete = () => {
    recordService
      .deleteRecord(+id!)
      .then(() => {
        dispatch(showSuccess(t('calendar:isRecordDeleted')));
        navigate('/calendar');
      })
      .catch((err) => {
        const message = err.response?.data?.message;
        dispatch(showError(message));
      });
  };

  return (
    <Box
      sx={{
        height: '100%',
        maxWidth: '50%',
        margin: 'auto',
      }}
    >
      <Card
        sx={{
          p: 4,
        }}
        elevation={7}
      >
        <Section first label={t('calendar:recordDetail')} />

        <TextItem label={t('calendar:progress')} value={''}></TextItem>
        <Slider
          value={record.progress}
          aria-label={t('progress')}
          min={-5}
          max={5}
          step={1}
          sx={{
            ':hover': {
              cursor: 'not-allowed',
            },
          }}
          valueLabelDisplay="auto"
        />
        <TextItem
          label={t('calendar:progressNote')}
          value={record.progressNote}
        ></TextItem>
        <TextItem
          label={t('calendar:exerciseNote')}
          value={record.exerciseNote}
        ></TextItem>
        <TextItem label={t('calendar:text')} value={record.text}></TextItem>
      </Card>
      <Box mt={3} display={'flex'} justifyContent="space-between">
        <Button onClick={() => navigate('/records/' + id + '/form')} color="info" variant="contained">
          {t('edit')}
        </Button>
        <Button onClick={handleDelete} color="error" variant="contained">
          {t('delete')}
        </Button>
      </Box>
    </Box>
  );
};

export default RecordDetail;
