import { Exercise } from "models/Exercise";
import { ExerciseFile } from "models/ExerciseFile";
import { ExerciseTask } from "models/ExerciseTask";
import { ExerciseFileDTO } from "./ExerciseFileDTO";

export interface ExerciseTaskDTO {
  id: number
  exercise_id: number,
  feedback: string,
  difficulty: number,
  repetitions: number,
  duration: number,
}

export class ExerciseTaskDTO {
  constructor(exerciseTask: ExerciseTask) {
    this.id = exerciseTask.id;
    this.exercise_id = exerciseTask.exerciseId;
    this.feedback = exerciseTask.feedback;
    this.difficulty = exerciseTask.difficulty;
    this.repetitions = exerciseTask.repetitions;
    this.duration = exerciseTask.duration;
  }
}
