import { Event } from "models/Event";
import { EventTypeDTO } from "./EventTypeDTO";
import { ClientDTO } from "./ClientDTO";
import { StaffDTO } from "./StaffDTO";
import { RecordDTO } from "./RecordDTO";
import { Record } from "models/Record";

export interface EventDTO {
  id?: number,
  name: string,
  start: string,
  end: string,
  event_type_id: number,
  client_id: number,
  staff_id: number,
  note: string | null,
  event_type: EventTypeDTO,
  client: ClientDTO,
  staff: StaffDTO,
  records: RecordDTO[],
}

export class EventDTO {
  constructor(event: Event) {
    this.id = event.id
    this.name = event.name;
    this.start = new Date(event.start).toISOString().split('T')[0] + ' ' + new Date(event.start).toTimeString().split(' ')[0];
    this.end = new Date(event.end).toISOString().split('T')[0] + ' ' + new Date(event.end).toTimeString().split(' ')[0];
    this.event_type_id = event.eventTypeId;
    this.client_id = event.clientId;
    this.staff_id = event.staffId;
    this.note = event.note;
  }
}
