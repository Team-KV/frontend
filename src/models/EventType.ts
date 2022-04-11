import { EventTypeDTO } from "./dto/EventTypeDTO";

export interface EventType {
  id: number,
  name: string,
}

export class EventType {
  constructor(dto: EventTypeDTO) {
    this.id = dto.id;
    this.name = dto.name;
  }
}