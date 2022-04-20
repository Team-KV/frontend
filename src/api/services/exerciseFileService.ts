import API from 'api/api';
import { ExerciseDTO } from 'models/dto/ExerciseDTO';
import { ExerciseFileDTO } from 'models/dto/ExerciseFileDTO';
import { Exercise } from 'models/Exercise';
import { ExerciseFile } from 'models/ExerciseFile';

const exerciseFileService = {
  getExerciseFile: async (id: number) => {
    const { data } = await API.getFile('exercise-file/' + id);
    return new File([data], 'filelol')
  },
  deleteExerciseFile: async (id: number) => API.delete('exercise-file/' + id),
}

export default exerciseFileService;
