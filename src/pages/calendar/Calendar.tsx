import { Scheduler } from '@aldabil/react-scheduler';
import { Box } from '@mui/material';
import eventService from 'api/services/eventService';
import { cs } from 'date-fns/locale';
import React, { useEffect, useState } from 'react';
import EventForm from './components/EventForm';
import { Event } from 'models/Event';
import { useAppDispatch } from 'hooks';
import { showError, showSuccess } from 'redux/slices/snackbarSlice';
import { useTranslation } from 'react-i18next';
import { ProcessedEvent } from '@aldabil/react-scheduler/dist/types';

import mapToProcessedEvent from 'helpers/mapToProcessedEvent';
import mapToEvent from 'helpers/mapToEvent';
import EventDetail from './components/EventDetail';


const CalendarPage = () => {
  const dispatch = useAppDispatch();
  const [t] = useTranslation();

  const fetchRemote = async (query: string): Promise<ProcessedEvent[]> => {
    return new Promise((res) => {
      eventService
        .getEvents()
        .then((fetchedEvents: Event[]) => {
          const events: any = fetchedEvents.map(mapToProcessedEvent);
          res(events);
        })
        .catch((err) => {
          const message = err.response?.data?.message ?? err.message;
          dispatch(showError(message));
        });
    });
  };

  const handleEventDrop = async (
    droppedOn: Date,
    updatedEvent: ProcessedEvent,
    originalEvent: ProcessedEvent
  ): Promise<void | ProcessedEvent> => {
    return new Promise((res) => {
      eventService
        .updateEvent(+updatedEvent.event_id, mapToEvent(updatedEvent))
        .then((fetchedEvent) => {
          res(mapToProcessedEvent(fetchedEvent));
        })
        .catch((err) => {
          const message = err.response?.data?.message ?? err.message;
          dispatch(showError(message));
          res(originalEvent);
        });
    });
  };

  const onDelete = (id: number | string): Promise<string | number | void> => {
    return new Promise((res) => {
      eventService
        .deleteEvent(+id)
        .then(() => {
          dispatch(showSuccess(t('calendar:isEventDeleted')));
          res(id)
        })
        .catch((err) => {
          const message = err.response?.data?.message ?? err.message;
          dispatch(showError(message));
        });
    });
  };

  return (
    <div>
      <Scheduler
        customEditor={(scheduler) => <EventForm scheduler={scheduler} />}
        locale={cs}
        view="week"
        remoteEvents={fetchRemote}
        week={{
          weekDays: [0, 1, 2, 3, 4, 5, 6],
          weekStartOn: 1,
          startHour: 6,
          endHour: 22,
          step: 60,
        }}
        day={{
          startHour: 8,
          endHour: 18,
          step: 60,
        }}
        onEventDrop={handleEventDrop}
        viewerExtraComponent={(fields, event) => <EventDetail event={event} />}
        onDelete={onDelete}
      />
    </div>
  );
};

export default CalendarPage;