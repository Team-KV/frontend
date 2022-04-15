import API from 'api/api';
import { EventDTO } from 'models/dto/EventDTO';
import { EventTypeDTO } from 'models/dto/EventTypeDTO';
import { EventType } from 'models/EventType';


const eventTypeService = {
  getEventTypes: (): Promise<EventType[]> => {
    return API.get('event-type').then((data) => {
      return data.map((dto: EventTypeDTO) => new EventType(dto))
    })
  }
}

export default eventTypeService;
