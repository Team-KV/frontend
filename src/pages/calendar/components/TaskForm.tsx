import { Box } from '@mui/material';
import { taskCompleted } from '@reduxjs/toolkit/dist/listenerMiddleware/exceptions';
import eventService from 'api/services/eventService';
import taskService from 'api/services/taskService';
import { Controls } from 'components/Controls';
import { useForm, Form } from 'components/Form';
import Section from 'components/Section';
import { useAppDispatch } from 'hooks';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { showError, showSuccess } from 'redux/slices/snackbarSlice';

const TaskForm = () => {
  const { values, setValues, handleInput } = useForm({
    text: '',
    isActive: null,
    eventId: null,
    clientId: null,
  });

  let { eventId, id } = useParams();
  const [t] = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    if (id) {
      taskService
        .updateTask(+id, values)
        .then((task) => {
          dispatch(showSuccess(t('calendar:isTaskCreated')));
          navigate('/tasks/' + task.id);
        })
        .catch((err) => {
          const message = err.response.data.message;
          dispatch(showError(message));
        });
    } else {
      taskService
        .addTask(values)
        .then((task) => {
          dispatch(showSuccess(t('calendar:isTaskCreated')));
          navigate('/tasks/' + task.id);
        })
        .catch((err) => {
          const message = err.response.data.message;
          dispatch(showError(message));
        });
    }
  };

  const handleCheck = (event: any) => {
    const checked = event.target.checked;
    setValues({ ...values, isActive: checked });
  };

  useEffect(() => {
    if (eventId) {
      eventService.getEvent(+eventId).then((event) => {
        setValues({
          ...values,
          eventId: event.id,
          clientId: event.clientId,
        });
      });
    }
    if (id) {
      taskService.getTask(+id).then((fetchedTask) => {
        setValues({
          ...fetchedTask,
        });
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
        <Section first label={t('calendar:taskNew')} />
        <Controls.Checkbox
          name="isActive"
          checked={values.isActive ?? false}
          label={t('calendar:isActive')}
          onChange={handleCheck}
          value={values.isActive ?? false}
        />
        <Controls.Input
          multiline
          rows={5}
          name="text"
          label={t('calendar:description')}
          onChange={handleInput}
          value={values.text}
        />
        <Box display={'flex'} justifyContent="space-between">
          <Controls.Button
            onClick={() => navigate('/calendar')}
            color="primary"
            size="large"
            label={t('cancel')}
            variant="outlined"
          />
          <Controls.Button
            color="primary"
            size="large"
            sx={{ width: 200 }}
            label={t('save')}
            type="submit"
            variant="contained"
          />
        </Box>
      </Box>
    </Form>
  );
};

export default TaskForm;
