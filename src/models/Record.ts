import { RecordDTO } from "./dto/RecordDTO";

export interface Record {
  id: number,
  progress: number,
  progressNote: string,
  exerciseNote: string,
  text: string,
  eventId: number,
}

export class Record {
  constructor(dto: RecordDTO) {
    this.id = dto.id;
    this.progress = dto.progress;
    this.progressNote = dto.progress_note;
    this.exerciseNote = dto.exercise_note;
    this.text = dto.text;
    this.eventId = dto.event_id;
  }
}