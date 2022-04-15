import { Scheduler } from '@aldabil/react-scheduler';
import { Box } from '@mui/material';
import eventService from 'api/services/eventService';
import { cs } from 'date-fns/locale';
import React, { useState } from 'react';
import EventForm from './components/EventForm';

const eventsExample = [
  {
    event_id: 1,
    title: 'Event 1',
    start: new Date('2022/4/13 09:30'),
    end: new Date('2022/4/13 10:30'),
  },
  {
    event_id: 2,
    title: 'Event 2',
    start: new Date('2022/4/14 13:00'),
    end: new Date('2022/4/14 15:00'),
  },
];

const CalendarPage = () => {
  const [events, setEvents] = useState(eventsExample);

  eventService.getEvents().then((data) => {
    console.log('Getting events: ');
    console.log(data);
  })

  return (
    <div>
      <Scheduler
      customEditor={(scheduler) => <EventForm scheduler={scheduler} />}
      locale={cs}
      view="week"
      events={events}
      week={{
        weekDays: [0, 1, 2, 3, 4, 5, 6],
        weekStartOn: 1,
        startHour: 6,
        endHour: 22,
        step: 60,
      }}
      day={{
        startHour: 6,
        endHour: 22,
        step: 60,
      }}
      dialogMaxWidth={'sm'}
      viewerExtraComponent={(fields, event) => {
        return <Box> Client info</Box>;
      }}
    />
    </div>
  );
};

export default CalendarPage;
