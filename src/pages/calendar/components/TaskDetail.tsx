import {
  Box,
  Button,
  Card,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import exerciseService from 'api/services/exerciseService';
import taskService from 'api/services/taskService';
import { Controls } from 'components/Controls';
import { Form, useForm } from 'components/Form';
import Section from 'components/Section';
import TextItem from 'components/TextItem';
import { useAppDispatch } from 'hooks';
import { Exercise } from 'models/Exercise';
import { Task } from 'models/Task';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { showError, showSuccess } from 'redux/slices/snackbarSlice';
import DeleteIcon from '@mui/icons-material/Delete';

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
interface Column {
  id: 'feedback' | 'difficulty' | 'repetitions' | 'duration';
  label: string;
  minWidth?: number;
  align?: 'right';
}

const TaskDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task>();
  const [t] = useTranslation();
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const { values, setValues, handleInput } = useForm({
    name: '',
    repetitions: '',
    duration: '',
    exerciseId: 0,
    feedback: '',
    difficulty: '',
  });

  const columns: Column[] = [
    { id: 'feedback', label: t('calendar:feedback'), minWidth: 100 },
    {
      id: 'difficulty',
      label: t('calendar:difficulty'),
      minWidth: 100,
      align: 'right',
    },
    {
      id: 'repetitions',
      label: t('calendar:repetitions'),
      minWidth: 100,
      align: 'right',
    },
    {
      id: 'duration',
      label: t('calendar:duration'),
      minWidth: 100,
      align: 'right',
    },
  ];

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    exerciseService.getExercises().then((fetchedExercises) => {
      const options: any = fetchedExercises.map((exercise) => ({
        label: `${exercise.name}`,
        id: exercise.id,
      }));
      setExercises(options);
    });
  }, []);

  const onSubmit = () => {
    taskService
      .addExerciseToTask(+id!, values)
      .then((fetchedExerciseTask) => {
        taskService.getTask(+id!).then((fetchedTask) => {
          setTask({ ...fetchedTask });
        });
      })
      .catch((err) => {
        const message = err.response?.data?.message;
        dispatch(showError(message));
      });
    handleClose();
  };

  const handleExerciseInput = (e: any, exercise: any) => {
    setValues({ ...values, exerciseId: exercise?.id });
  };

  const handleDeleteExerciseTask = (exerciseId: number) => {
    taskService
      .deleteExerciseFromTask(exerciseId)
      .then(() => {
        const myExercises = task?.exercises.filter(
          (exer) => exer.id == +exerciseId!
        );
        setTask({ ...task, exercises: myExercises });
      })
      .catch((err) => {
        const message = err.response?.data?.message;
        dispatch(showError(message));
      });
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Form onSubmit={onSubmit}>
            <Box display='flex' flexDirection='column' gap={2}>
              <Controls.Autocomplete
                validators={['required']}
                errorMessages={[t('formRequired')]}
                name='eventTypeId'
                onChange={handleExerciseInput}
                options={exercises}
                value={
                  exercises.find(
                    (exercise: any) => exercise.id == values.exerciseId
                  ) ?? ''
                }
                label={t('exercises:exercise')}
              />
              <Controls.Input
                name='repetitions'
                label={t('calendar:repetitions')}
                onChange={handleInput}
                value={values.repetitions}
              />
              <Controls.Input
                name='duration'
                label={t('calendar:duration')}
                onChange={handleInput}
                value={values.duration}
              />
            </Box>

            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              mt={3}
            >
              <Button onClick={handleClose} variant='outlined'>
                {t('cancel')}
              </Button>
              <Button variant='contained' type='submit'>
                {t('save')}
              </Button>
            </Box>
          </Form>
        </Box>
      </Modal>
      <Box
        sx={{
          height: '100%',
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
          <TableContainer sx={{ marginTop: 3 }}>
            <Table aria-label='clients'>
              <TableHead>
                <TableRow>
                  <TableCell align={'left'} style={{ top: 57, minWidth: 140 }}>
                    {t('calendar:exercise')}
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ top: 57, minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                  <TableCell align={'right'} style={{ top: 57, minWidth: 80 }}>
                    {t('actions')}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {task?.exercises.map((exerciseTask: any, i: number) => {
                  return (
                    <TableRow role='checkbox' tabIndex={-1} key={i}>
                      <TableCell align='left'>{exerciseTask.name}</TableCell>
                      {columns.map((column) => {
                        const value = exerciseTask.pivot[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                      <TableCell align='right'>
                        <IconButton
                          onClick={() =>
                            handleDeleteExerciseTask(exerciseTask.id)
                          }
                          color='error'
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <Button
              onClick={() => handleOpen()}
              fullWidth
              variant='outlined'
              color='success'
              sx={{ marginTop: 1 }}
            >
              {t('exercises:addExerciseTask')}
            </Button>
          </TableContainer>
        </Card>
        <Box mt={3} display={'flex'} justifyContent='space-between'>
          <Button
            onClick={() => navigate('/tasks/' + id + '/form')}
            color='info'
            variant='contained'
          >
            {t('edit')}
          </Button>
          <Button onClick={handleDelete} color='error' variant='contained'>
            {t('delete')}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default TaskDetail;
