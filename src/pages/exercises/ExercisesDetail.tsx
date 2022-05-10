import { Box, Button, Card, Grid, Typography } from '@mui/material';
import exerciseService from 'api/services/exerciseService';
import getYoutubeEmbedId from 'helpers/getYoutubeEmbedId';
import { useAppDispatch } from 'hooks';
import { Exercise } from 'models/Exercise';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { showError, showSuccess } from 'redux/slices/snackbarSlice';
import ExerciseFiles from './components/ExerciseFiles';
import GeneralInfo from './components/GeneralInfo';

const ExerciseDetail = () => {
  const [exercise, setExercise] = useState<Exercise>();
  const [t] = useTranslation();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const deleteExercise = () => {
    if (id) {
      exerciseService.deleteExercise(+id).then(() => {
        dispatch(showSuccess(t('exercises:isExerciseDeleted')));
        navigate('/exercises');
      });
    }
  };

  useEffect(() => {
    if (id) {
      exerciseService
        .getExercise(+id)
        .then((fetchedExercise) => {
          setExercise({ ...fetchedExercise });
        })
        .catch((err) => {
          const message = err.response.data.message;
          dispatch(showError(message));
        });
    }
  }, []);

  return (
    <>
      <Box
        mt={2}
        mb={4}
        px={4}
        display={'flex'}
        justifyContent={'space-between'}
        alignItems='center'
      >
        <Box
          display={'flex'}
          justifyContent='start'
          alignItems='center'
          gap={1}
        >
          <Typography variant='h4' fontWeight={500} letterSpacing={2}>
            {exercise?.name}
          </Typography>
        </Box>
        <Box>
          <Button
            sx={{ fontWeight: 'bold' }}
            onClick={() => navigate('/exercises/' + exercise?.id + '/form')}
            variant='contained'
            size={'large'}
            color='warning'
          >
            {t('edit')}
          </Button>
        </Box>
      </Box>
      <Grid container spacing={4} py={1}>
        <Grid item maxWidth={640} xs={12}>
          <GeneralInfo exercise={exercise!} />
        </Grid>
        <Grid
          item
          xs={12}
          md={7}
          lg={7}
          display='flex'
          justifyContent={'center'}
        >
          <Card
            elevation={7}
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {exercise?.url ? (
              <iframe
                width='100%'
                height='420'
                src={
                  'https://www.youtube.com/embed/' +
                  getYoutubeEmbedId(exercise?.url)
                }
                frameBorder='0'
                allow='autoplay; encrypted-media'
                allowFullScreen
                title='video'
              />
            ) : (
              <Typography variant='h5'>
                {t('exercises:noVideoAvailable')}
              </Typography>
            )}
          </Card>
        </Grid>
        <Grid item xs={12} md={5} lg={5}>
          <ExerciseFiles exercise={exercise!}></ExerciseFiles>
        </Grid>
      </Grid>
      <Box mt={4} px={4} display='flex' justifyContent='flex-end'>
        <Button
          sx={{ fontWeight: 'bold' }}
          color='error'
          onClick={deleteExercise}
          variant='contained'
          size={'large'}
        >
          {t('delete')}
        </Button>
      </Box>
    </>
  );
};

export default ExerciseDetail;
