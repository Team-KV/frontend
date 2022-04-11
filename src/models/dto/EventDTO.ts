import { Event } from "models/Event";
import { EventTypeDTO } from "./EventTypeDTO";
import { ClientDTO } from "./ClientDTO";
import { StaffDTO } from "./StaffDTO";
import { RecordDTO } from "./RecordDTO";
import { Record } from "models/Record";

export interface EventDTO {
  id: number,
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
    this.id = event.id;
    this.name = event.name;
    this.start = event.start.toISOString();
    this.end = event.end.toISOString();
    this.event_type_id = event.eventTypeId;
    this.client_id = event.clientId;
    this.staff_id = event.staffId;
    this.note = event.note;
    this.event_type = new EventTypeDTO({ ...event.eventType });
    this.client = new ClientDTO({ ...event.client });
    this.staff = new StaffDTO({ ...event.staff });
    this.records = event.records.map((record: Record) => new RecordDTO({ ...record }));
  }
}
