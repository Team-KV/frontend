import { Client } from './Client';
import { EventDTO } from './dto/EventDTO';
import { RecordDTO } from './dto/RecordDTO';
import { EventType } from './EventType';
import { Record } from './Record';
import { Staff } from './Staff';

export interface Event {
  id: number,
  name: string,
  start: Date,
  end: Date,
  eventTypeId: number,
  clientId: number,
  staffId: number,
  note: string | null,
  eventType: EventType,
  client: Client,
  staff: Staff,
  records: Record[],
}

export class Event {
  constructor(dto: EventDTO) {
    this.id = dto.id;
    this.name = dto.name;
    this.start = new Date(dto.start);
    this.end = new Date(dto.end);
    this.eventTypeId = dto.event_type_id;
    this.clientId = dto.client_id;
    this.staffId = dto.staff_id;
    this.note = dto.note;
    this.eventType = { ...dto.event_type };
    this.client = new Client({ ...dto.client });
    this.staff = new Staff({ ...dto.staff });
    this.records = dto.records.map((recordDTO: RecordDTO) => new Record({ ...recordDTO }))
  }
}