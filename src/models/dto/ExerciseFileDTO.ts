import { ExerciseFile } from "models/ExerciseFile";

export interface ExerciseFileDTO {
  id: number,
  file_name: string,
  type: string,
  url: string,
  exercise_id: number,
}

export class ExerciseFileDTO {
  constructor(exerciseFile: ExerciseFile) {
    this.id = exerciseFile.id
    this.file_name = exerciseFile.fileName;
    this.type = exerciseFile.type;
    this.url = exerciseFile.url;
    this.exercise_id = exerciseFile.exerciseId;
  }
}
