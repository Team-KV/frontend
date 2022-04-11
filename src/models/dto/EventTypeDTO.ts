import { EventType } from "models/EventType";

export interface EventTypeDTO {
  id: number,
  name: string,
}

export class EventTypeDTO {
  constructor(eventType: EventType) {
    this.id = eventType.id;
    this.name = eventType.name;
  }
}