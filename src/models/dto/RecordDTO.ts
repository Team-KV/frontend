import { Record } from 'models/Record'

export interface RecordDTO {
  id: number,
  progress: number,
  progress_note: string,
  exercise_note: string,
  text: string,
  event_id: number,
}

export class RecordDTO {
  constructor(record: Record) {
    this.id = record.id;
    this.progress = record.progress;
    this.progress_note = record.progressNote;
    this.exercise_note = record.exerciseNote;
    this.text = record.text;
    this.event_id = record.eventId;
  }
}