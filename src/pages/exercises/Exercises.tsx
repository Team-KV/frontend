import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  TablePagination,
  TextField,
  Typography,
} from '@mui/material';
import { t } from 'i18next';
import { Exercise } from 'models/Exercise';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import React, { useEffect, useState } from 'react';
import ExerciseCard from './components/ExerciseCard';
import exerciseService from 'api/services/exerciseService';
import { useAppDispatch } from 'hooks';
import { showError } from 'redux/slices/snackbarSlice';

const Exercises = () => {
  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useAppDispatch();

  let [exercises, setExercises]: [Exercise[], any] = useState([]);
  let [allExercises, setAllExercises]: [Exercise[], any] = useState([]);

  useEffect(() => {
    exerciseService
      .getExercises()
      .then((fetchedExercises) => {
        setExercises(fetchedExercises);
        setAllExercises(fetchedExercises);
      })
      .catch((err) => {
        const message = err.response.data.message;
        dispatch(showError(message));
      });
  }, []);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const changeFilter = (e: any) => {
    const value: string = e.target.value.toLowerCase();
    const newExercises = allExercises.filter((exercise: Exercise) => {
      return (
        exercise.name.toLowerCase().includes(value) ||
        exercise.description.toLowerCase().includes(value)
      );
    });
    setExercises(newExercises);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5">{t('exercises')}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <TextField
            size="small"
            label={t('search')}
            onChange={changeFilter}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
          <Button
            sx={{ ml: 3 }}
            style={{ height: 40, color: 'white' }}
            variant="contained"
            href="exercises/form"
          >
            <AddIcon />
          </Button>
        </Box>
      </Box>
      <Grid container justifyContent="start" m="auto" spacing={2}>
        {exercises.map((exercise) => (
          <Grid key={exercise.id} item sm={6} md={4} lg={2}>
            <ExerciseCard exercise={exercise} />
          </Grid>
        ))}
      </Grid>
      {/* <TablePagination
        component="div"
        count={100}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </>
  );
};

export default Exercises;
