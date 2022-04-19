import { Event } from 'models/Event'

const mapToProcessedEvent = (event: any) => ({
  ...event,
  event_id: event.id,
  title: event.name,
  start: new Date(event.start),
  end: new Date(event.end),
});

export default mapToProcessedEvent;
