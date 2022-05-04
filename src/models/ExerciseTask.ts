import { ExerciseTaskDTO } from "models/dto/ExerciseTaskDTO";

export interface ExerciseTask {
  id: number,
  exerciseId: number,
  feedback: string,
  difficulty: number,
  repetitions: number,
  duration: number,
}

export class ExerciseTask {
  constructor(dto: ExerciseTaskDTO) {
    this.id = dto.id;
    this.exerciseId = dto.exercise_id;
    this.feedback = dto.feedback;
    this.difficulty = dto.difficulty;
    this.repetitions = dto.repetitions;
    this.duration = dto.duration;
  }
}
