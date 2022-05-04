import { t } from "i18next";
import { Exercise } from "models/Exercise";
import { ExerciseFile } from "models/ExerciseFile";
import { ExerciseTask } from "models/ExerciseTask";
import { ExerciseFileDTO } from "./ExerciseFileDTO";
import { ExerciseTaskDTO } from "./ExerciseTaskDTO";

export interface ExerciseDTO {
  id: number,
  name: string,
  description: string,
  url: string,
  pivot: ExerciseTaskDTO | null,
  category_id: number,
  files: ExerciseFileDTO[],
}

export class ExerciseDTO {
  constructor(exercise: Exercise) {
    this.id = exercise.id
    this.name = exercise.name;
    this.description = exercise.description;
    this.url = exercise.url;
    this.pivot = exercise?.pivot ? new ExerciseTaskDTO(exercise.pivot) : null
    this.category_id = exercise.categoryId;
  }
}
