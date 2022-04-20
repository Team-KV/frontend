import React, { useEffect } from 'react';

import { useState } from 'react';
import { TextField, Button, DialogActions, Typography } from '@mui/material';
import {
  EventActions,
  ProcessedEvent,
  SchedulerHelpers,
} from '@aldabil/react-scheduler/dist/types';
import clientService from 'api/services/clientService';
import eventTypeService from 'api/services/eventTypeService';
import { Controls } from 'components/Controls';
import { Form, useForm } from 'components/Form';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import eventService from 'api/services/eventService';
import { useAppDispatch } from 'hooks';
import { showError, showSuccess } from 'redux/slices/snackbarSlice';

import mapToProcessedEvent from 'helpers/mapToProcessedEvent';
import mapToEvent from 'helpers/mapToEvent';
import { EventType } from 'models/EventType';

const setDateWithAddedHours = (hours: number) => {
  var dt = new Date();
  dt.setHours(dt.getHours() + hours);
  return dt;
};

const EventForm = ({ scheduler }: { scheduler: SchedulerHelpers }) => {
  const [t] = useTranslation();
  const dispatch = useAppDispatch();
  const event = scheduler.edited;
  
  const [clients, setClients] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);

  const { values, setValues, handleInput } = useForm({
    id: event?.id || null,
    name: event?.title || '',
    eventTypeId: event?.eventTypeId,
    start: event?.start || scheduler.state.start.value,
    end: event?.end || scheduler.state.end.value,
    clientId: event?.clientId || '',
    note: event?.note || '',
    staffId: 1,
  });


  useEffect(() => {
    clientService.getClients().then((fetchedClients) => {
      let options: any = fetchedClients.map((client) => ({
        label: `${client.firstName} ${client.lastName} (${
          client?.dateOfBirth?.getFullYear() ?? '----'
        })`,
        id: client.id,
      }));
      setClients(options);
    });

    eventTypeService.getEventTypes().then((fetchedEventTypes) => {
      let options: any = fetchedEventTypes.map((eventType) => ({
        label: `${eventType.name}`,
        id: eventType.id,
      }));
      setEventTypes(options);
    });
  }, []);
  const handleSubmit = async () => {
    try {
      scheduler.loading(true);
      console.log(event?.event_id);
      const added_updated_event = (await new Promise((res) => {
        if (event) {
          eventService
            .updateEvent(+event.event_id, values)
            .then((event) => {
              dispatch(showSuccess(t('calendar:isEventSaved')));
              res(mapToProcessedEvent(event));
            })
            .catch((err) => {
              const message = err.response?.data?.message;
              dispatch(showError(message));
            })
            .finally(() => {
              scheduler.loading(false);
            });
        } else {
          eventService
            .addEvent(values)
            .then((event) => {
              dispatch(showSuccess(t('calendar:isEventSaved')));
              res(mapToProcessedEvent(event));
            })
            .catch((err) => {
              const message = err.response?.data?.message;
              dispatch(showError(message));
            })
            .finally(() => {
              scheduler.loading(false);
            });
        }
      })) as ProcessedEvent;
      scheduler.onConfirm(added_updated_event, event ? 'edit' : 'create');
      scheduler.close();
    } finally {
      scheduler.loading(false);
    }
  };

  const handleClientInput = (e: any, client: any) => {
    setValues({ ...values, clientId: client?.id });
  };

  const handleEventTypeInput = (e: any, event: any) => {
    setValues({ ...values, eventTypeId: event?.id });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Typography width={600} pl={5} py={3} variant="h6">
        {t('calendar:event')}
      </Typography>
      <Box px={5} display="flex" flexDirection="column" gap={3}>
        <Controls.Autocomplete
          validators={['required']}
          errorMessages={[t('formRequired')]}
          name="eventTypeId"
          onChange={handleEventTypeInput}
          options={eventTypes}
          value={eventTypes.find((eventType: any) => eventType.id == values.eventTypeId) ?? eventTypes[0] ?? ''}
          label={t('calendar:eventType')}
        />
        <Controls.Input
          validators={['required']}
          errorMessages={[t('formRequired')]}
          name="name"
          label={t('calendar:title')}
          onChange={handleInput}
          value={values.name}
        />
        <Controls.DateTimePicker
          validators={['required']}
          errorMessages={[t('formRequired')]}
          name="start"
          label={t('calendar:start')}
          onChange={handleInput}
          value={values.start}
        />
        <Controls.DateTimePicker
          validators={['required']}
          errorMessages={[t('formRequired')]}
          name="end"
          label={t('calendar:end')}
          onChange={handleInput}
          value={values.end}
        />
        <Controls.Autocomplete
          validators={['required']}
          errorMessages={[t('formRequired')]}
          name="clientId"
          onChange={handleClientInput}
          options={clients}
          value={clients.find((client: any) => client.id == values.clientId) ?? ''}
          label={t('calendar:client')}
        />
        <Controls.Input
          validators={['required']}
          errorMessages={[t('formRequired')]}
          name="note"
          label={t('calendar:note')}
          onChange={handleInput}
          value={values.note}
        />
      </Box>
      <DialogActions>
        <Button onClick={scheduler.close}>{t('cancel')}</Button>
        <Button type="submit">{t('save')}</Button>
      </DialogActions>
    </Form>
  );
};

export default EventForm;
