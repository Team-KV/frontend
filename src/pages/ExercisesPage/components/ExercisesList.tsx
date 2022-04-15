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
import ExerciseCard from './ExerciseCard';

const initExercises: Exercise[] = [
  {
    id: 1,
    name: 'Cvik 1',
    description: 'Toto je cvik 1',
    url: 'https://www.cvik.com',
    categoryId: 1,
    files: [],
  },
  {
    id: 2,
    name: 'Cvik 2',
    description: 'Toto je cvik 2',
    url: 'https://www.cvik.com',
    categoryId: 2,
    files: [],
  },
  {
    id: 3,
    name: 'Cvik 3',
    description: 'Toto je cvik 3',
    url: 'https://www.cvik.com',
    categoryId: 3,
    files: [],
  },
  {
    id: 4,
    name: 'Cvik 4',
    description: 'Toto je cvik 4',
    url: 'https://www.cvik.com',
    categoryId: 4,
    files: [],
  },
  {
    id: 5,
    name: 'Cvik 5',
    description: 'Toto je cvik 5',
    url: 'https://www.cvik.com',
    categoryId: 5,
    files: [],
  },
];

const ExercisesList = () => {
  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  let [exercises, setExercises]: [Exercise[], any] = useState([]);
  let [allExercises, setAllExercises]: [Exercise[], any] = useState([]);

  useEffect(() => {
    setExercises(initExercises);
    setAllExercises(initExercises);
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
            href="clients/form"
          >
            <AddIcon />
          </Button>
        </Box>
      </Box>
      <Grid container justifyContent="start" m='auto' spacing={2}>
        {exercises.map((exercise) => (
          <Grid key={exercise.id} item>
            <ExerciseCard  exercise={exercise} />
          </Grid>
        ))}
      </Grid>
      <TablePagination
        component="div"
        count={100}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default ExercisesList;
