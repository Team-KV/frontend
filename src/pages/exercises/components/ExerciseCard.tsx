import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from '@mui/material';
import { Exercise } from 'models/Exercise';
import React from 'react';
import noImageSrc from 'assets/img/no-image.png'
import { useNavigate, useParams } from 'react-router-dom';

const ExerciseCard = ({ exercise }: { exercise: Exercise }) => {
  let navigate = useNavigate();

  const handleClick = () => {
    navigate('/exercises/' + exercise.id);
  }
  
  return (
    <>
      <Card sx={{ width: '100%' }} onClick={handleClick}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={noImageSrc}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {exercise.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {exercise.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default ExerciseCard;
