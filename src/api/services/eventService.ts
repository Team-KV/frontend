import API from 'api/api';
import { debug } from 'console';
import { EventDTO } from 'models/dto/EventDTO';
import { Event } from 'models/Event';

const eventService = {
  getEvents: async (): Promise<Event[]> => {
    const { data } = await API.get('event');
    return data.map((dto: EventDTO) => new Event({ ...dto }));
  },
  getEvent: (id: number) => API.get('event/' + id),
  updateEvent: async (id:number, event: Event): Promise<Event> => {
    const dto = new EventDTO(event);
    delete dto.id;
    const { data } = await API.update('event/' + id, dto);
    return new Event({
      ...data.Event,
      start: data?.Event?.start?.date,
      end: data?.Event?.end?.date,
    });
  },

  addEvent: async (event: Event): Promise<Event> => {
    const dto = new EventDTO(event);
    const { data } = await API.post('event', dto);
    return new Event({
      ...data.Event,
      start: data?.Event?.start?.date,
      end: data?.Event?.end?.date,
    });
  },
  deleteEvent: (id: number) => API.delete('event/' + id),
}

export default eventService;
