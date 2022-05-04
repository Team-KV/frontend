import { Exercise } from "models/Exercise";
import { Task } from "models/Task";
import { ExerciseDTO } from "./ExerciseDTO";
import { ExerciseTaskDTO } from "./ExerciseTaskDTO";

export interface TaskDTO {
  id: number,
  text: string,
  is_active: boolean,
  client_id: number,
  event_id: number,
  exercises: ExerciseDTO[],
}

export class TaskDTO {
  constructor(task: Task) {
    this.id = task.id;
    this.text = task.text;
    this.is_active = task.isActive;
    this.client_id = task.clientId;
    this.event_id = task.eventId;
    this.exercises = task.exercises?.map((exercise) => new ExerciseDTO({ ...exercise }));
  }
}