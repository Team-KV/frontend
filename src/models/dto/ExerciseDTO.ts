import { Exercise } from "models/Exercise";
import { ExerciseFile } from "models/ExerciseFile";
import { ExerciseFileDTO } from "./ExerciseFileDTO";

export interface ExerciseDTO {
  id: number,
  name: string,
  description: string,
  url: string,
  category_id: number,
  files: ExerciseFileDTO[],
}

export class ExerciseDTO {
  constructor(exercise: Exercise) {
    this.id = exercise.id
    this.name = exercise.name;
    this.description = exercise.description;
    this.url = exercise.url;
    this.category_id = exercise.categoryId;
    this.files = exercise.files.map((file: ExerciseFile) => new ExerciseFileDTO({ ...file }))
  }
}
