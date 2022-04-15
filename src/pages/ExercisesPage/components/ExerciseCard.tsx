import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from '@mui/material';
import { Exercise } from 'models/Exercise';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ExerciseCard = ({ exercise }: { exercise: Exercise }) => {
  let navigate = useNavigate();
  let { id } = useParams();


  const handleClick = () => {
    navigate('1')
  }
  
  return (
    <>
      <Card sx={{ maxWidth: 200 }} onClick={handleClick}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="https://random.imagecdn.app/500/150"
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
