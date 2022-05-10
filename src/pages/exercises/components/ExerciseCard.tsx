import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from '@mui/material';
import { Exercise } from 'models/Exercise';
import React, { useEffect, useState } from 'react';
import noImageSrc from 'assets/img/no-image.png';
import { useNavigate, useParams } from 'react-router-dom';
import exerciseService from 'api/services/exerciseService';
import { showError } from 'redux/slices/snackbarSlice';
import config from 'config.json';
import { height, minHeight } from '@mui/system';

const ExerciseCard = ({ exercise }: { exercise: Exercise }) => {
  const navigate = useNavigate();
  const [img, setImg] = useState(noImageSrc);

  const handleClick = () => {
    navigate('/exercises/' + exercise.id);
  };

  useEffect(() => {
    if (exercise?.id) {
      exerciseService.getExercise(exercise.id).then((fetchedExercise) => {
        if (fetchedExercise.files?.length) {
          setImg(config.SERVER_URL + fetchedExercise.files[0].url);
        }
      });
    }
  }, []);

  return (
    <>
      <Card
        sx={{ width: '100%', height: '100%', maxHeight: 320 }}
        onClick={handleClick}
      >
        <CardActionArea>
          <CardMedia component='img' image={img} />
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              {exercise.name}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {exercise.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default ExerciseCard;
