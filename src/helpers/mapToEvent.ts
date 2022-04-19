const mapToEvent = (processedEvent: any) => ({
  ...processedEvent,
  id: processedEvent.event_id,
  name: processedEvent.title,
  start: new Date(processedEvent.start),
  end: new Date(processedEvent.end),
});

export default mapToEvent;