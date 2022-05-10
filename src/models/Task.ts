import { TaskDTO } from "./dto/TaskDTO";
import { Exercise } from "./Exercise";

export interface Task {
  id: number,
  text: string,
  isActive: boolean,
  clientId: number,
  eventId: number,
  exercises: Exercise[],
}

export class Task {
  constructor(dto: TaskDTO) {
    this.id = dto.id;
    this.text = dto.text;
    this.isActive = dto.is_active;
    this.clientId = dto.client_id;
    this.eventId = dto.event_id;
    this.exercises = dto.exercises?.map((dto) => new Exercise({ ...dto }));
  }
}