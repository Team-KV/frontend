import API from 'api/api';

const exerciseFileService = {
  getExerciseFile: async (id: number) => {
    const { data } = await API.getFile('exercise-file/' + id);
    return new File([data], 'filelol')
  },
  deleteExerciseFile: async (id: number) => API.delete('exercise-file/' + id),
}

export default exerciseFileService;
