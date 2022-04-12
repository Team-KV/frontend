import API from 'api/api';
import { EventDTO } from 'models/dto/EventDTO';

const eventService = {
  getEvents: () => API.get('event'),
  getEvent: (id: number) => API.get('event/' + id),
  updateEvent: (id: number, event: EventDTO) => API.update('event/' + id, event),
  addEvent: (event: EventDTO) => API.post('event', event),
  deleteEvent: (id: number) => API.delete('event/' + id),
}

export default eventService;
