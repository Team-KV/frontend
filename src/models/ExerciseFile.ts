import { ExerciseFileDTO } from './dto/ExerciseFileDTO';

export interface ExerciseFile {
  id: number,
  fileName: string,
  type: string,
  exerciseId: number,
}

export class ExerciseFile {
  constructor(dto: ExerciseFileDTO) {
    this.id = dto.id;
    this.fileName = dto.file_name;
    this.type = dto.type;
    this.exerciseId = dto.exercise_id;
  }
}