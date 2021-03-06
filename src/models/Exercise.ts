import { ExerciseDTO } from './dto/ExerciseDTO';
import { ExerciseFileDTO } from './dto/ExerciseFileDTO';
import { ExerciseFile } from './ExerciseFile';
import { ExerciseTask } from './ExerciseTask';

export interface Exercise {
  id: number,
  name: string,
  description: string,
  url: string,
  pivot: ExerciseTask | null,
  categoryId: number,
  files: ExerciseFile[],
}

export class Exercise {
  constructor(dto: ExerciseDTO) {
    this.id = dto.id;
    this.name = dto.name;
    this.description = dto.description;
    this.url = dto.url;
    this.pivot = dto?.pivot ? new ExerciseTask({...dto.pivot}) : null;
    this.categoryId = dto.category_id;
    this.files = dto.files?.map((dto: ExerciseFileDTO) => new ExerciseFile({ ...dto }))
  }
}