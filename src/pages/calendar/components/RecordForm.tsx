import { Box, Slider } from '@mui/material';
import recordService from 'api/services/recordService';
import { Controls } from 'components/Controls';
import { Form, useForm } from 'components/Form';
import Section from 'components/Section';
import TextItem from 'components/TextItem';
import { useAppDispatch } from 'hooks';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { showError, showSuccess } from 'redux/slices/snackbarSlice';

const RecordForm = () => {
  const { values, setValues, handleInput } = useForm({
    progress: 0,
    progressNote: '',
    exerciseNote: '',
    text: '',
  });
  const { recordId, eventId } = useParams();
  const [t] = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    if (recordId) {
      recordService
        .updateRecord(+recordId!, values)
        .then((record) => {
          dispatch(showSuccess(t('calendar:isRecordCreated')));
          navigate('/records/' + record.id);
        })
        .catch((err) => {
          const message = err.response?.data?.message;
          dispatch(showError(message));
        });
    } else {
      recordService
        .addRecord(+eventId!, values)
        .then((record) => {
          dispatch(showSuccess(t('calendar:isRecordCreated')));
          navigate('/records/' + record.id);
        })
        .catch((err) => {
          const message = err.response?.data?.message;
          dispatch(showError(message));
        });
    }
  };
  
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValues({ ...values, progress: newValue });
  };

  const handleCancel = () => {
    navigate('/calendar');
  };

  useEffect(() => {
    if (recordId) {
      recordService
        .getRecord(+recordId)
        .then((record) => {
          setValues({ ...record });
        })
        .catch((err) => {
          const message = err.response?.data?.message;
          dispatch(showError(message));
        });
    }
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <Box
        maxWidth={600}
        m="auto"
        display="flex"
        flexDirection={'column'}
        gap={2}
      >
        <Section first label={recordId ? t('calendar:recordEdit') : t('calendar:recordNew')} />
        <TextItem label={t('calendar:progress')} value={''}></TextItem>
        <Slider
          value={values.progress}
          aria-label={t('calendar:progress')}
          min={-5}
          max={5}
          step={1}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
        />
        <Controls.Input
          multiline
          rows={2}
          name="progressNote"
          label={t('calendar:progressNote')}
          onChange={handleInput}
          value={values.progressNote}
        />
        <Controls.Input
          multiline
          rows={2}
          name="exerciseNote"
          label={t('calendar:exerciseNote')}
          onChange={handleInput}
          value={values.exerciseNote}
        />
        <Controls.Input
          name="text"
          multiline
          rows={5}
          label={t('calendar:text')}
          onChange={handleInput}
          value={values.text}
        />
        <Box display={'flex'} justifyContent="space-between">
          <Controls.Button
            onClick={handleCancel}
            color="primary"
            size="large"
            label={t('cancel')}
            variant="outlined"
          />
          <Controls.Button
            color="primary"
            size="large"
            label={t('save')}
            type="submit"
            variant="contained"
          />
        </Box>
      </Box>
    </Form>
  );
};

export default RecordForm;
