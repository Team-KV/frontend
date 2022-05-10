import { Client } from './Client';
import { EventDTO } from './dto/EventDTO';
import { EventType } from './EventType';
import { Record } from './Record';
import { Staff } from './Staff';
import { Task } from './Task';

export interface Event {
  id?: number,
  name: string,
  start: string,
  end: string,
  eventTypeId: number,
  clientId: number,
  staffId: number,
  note: string | null,
  eventType: EventType,
  client: Client,
  staff: Staff,
  record: Record | null,
  task: Task | null,
}

export class Event {
  constructor(dto: EventDTO) {
    this.id = dto.id;
    this.name = dto.name;
    this.start = dto.start;
    this.end = dto.end;
    this.eventTypeId = dto.event_type_id;
    this.clientId = dto.client_id;
    this.staffId = dto.staff_id;
    this.note = dto.note;
    this.record = dto.record ? new Record({ ...dto.record }) : null;
    this.task = dto.task ? new Task({ ...dto.task }) : null;
  }
}