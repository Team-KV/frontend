import API from 'api/api';
import { ExerciseDTO } from 'models/dto/ExerciseDTO';
import { ExerciseFileDTO } from 'models/dto/ExerciseFileDTO';
import { Exercise } from 'models/Exercise';
import { ExerciseFile } from 'models/ExerciseFile';

const exerciseService = {
  getExercises: async (): Promise<Exercise[]> => {
    const { data } = await API.get('exercise')
    return data.map((dto: ExerciseDTO) => new Exercise({ ...dto }));
  },
  getExercise: async (id: number): Promise<Exercise> => {
    const { data } = await API.get('exercise/' + id)
    return new Exercise({ ...data.Exercise });
  },
  addExercise: async (exercise: Exercise): Promise<Exercise> => {
    const dto = new ExerciseDTO(exercise);
    const { data } = await API.post('exercise', dto);
    return new Exercise(data.Exercise)
  },
  updateExercise: async (id: number, exercise: Exercise): Promise<Exercise> => {
    const dto = new ExerciseDTO(exercise);
    const { data } = await API.update('exercise/' + id, dto);
    return new Exercise(data.Exercise)
  },
  deleteExercise: async (id: number) => API.delete('exercise/' + id),

  uploadFile: async (id: number, file: any) => {
    const formData = new FormData();
    formData.append("files[]", file)
    const { data } = await API.postFile(`exercise/${id}/upload`, formData);
    return data.ExerciseFiles.map((dto: ExerciseFileDTO) => new ExerciseFile(dto));
  },
}

export default exerciseService;
