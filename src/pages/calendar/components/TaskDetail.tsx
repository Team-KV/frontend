import { Box, Card, Slider, Button } from '@mui/material';
import taskService from 'api/services/taskService';
import Section from 'components/Section';
import TextItem from 'components/TextItem';
import { id } from 'date-fns/locale';
import { useAppDispatch } from 'hooks';
import { t } from 'i18next';
import { Task } from 'models/Task';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { showError, showSuccess } from 'redux/slices/snackbarSlice';

const TaskDetail = () => {
  let { id } = useParams();
  const dispatch = useAppDispatch();
  const [t] = useTranslation();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task>();

  const handleDelete = () => {
    taskService
      .deleteTask(+id!)
      .then(() => {
        dispatch(showSuccess(t('calendar:isTaskDeleted')));
        navigate('/calendar');
      })
      .catch((err) => {
        const message = err.response?.data?.message;
        dispatch(showError(message));
      });
  };

  useEffect(() => {
    if (id) {
      taskService.getTask(+id).then((fetchedTask) => {
        setTask({ ...fetchedTask });
      });
    }
  }, []);

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
        <TextItem
          label={t('calendar:description')}
          value={task?.text}
        ></TextItem>
      </Card>
      <Box mt={3} display={'flex'} justifyContent="space-between">
        <Button
          onClick={() => navigate('/tasks/' + id + '/form')}
          color="info"
          variant="contained"
        >
          {t('edit')}
        </Button>
        <Button onClick={handleDelete} color="error" variant="contained">
          {t('delete')}
        </Button>
      </Box>
    </Box>
  );
};

export default TaskDetail;
