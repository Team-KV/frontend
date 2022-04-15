import React, { useEffect } from 'react';

import { useState } from 'react';
import { TextField, Button, DialogActions, Autocomplete, Typography } from '@mui/material';
import {
  EventActions,
  ProcessedEvent,
  SchedulerHelpers,
} from '@aldabil/react-scheduler/dist/types';
import { Scheduler } from '@aldabil/react-scheduler';
import clientService from 'api/services/clientService';
import { Client } from 'models/Client';
import eventTypeService from 'api/services/eventTypeService';
import { Controls } from 'components/Controls';
import { Form, useForm } from 'components/Form';
import { Box } from '@mui/system';

interface CustomEditorProps {
  scheduler: SchedulerHelpers;
}

const setDateWithAddedHours = (hours: number) => {
  var dt = new Date();
  dt.setHours(dt.getHours() + hours);
  return dt;
};

const EventForm = ({ scheduler }: CustomEditorProps) => {
  const event = scheduler.edited;

  const { values, setValues, handleInput } = useForm({
    start: new Date(),
    end: setDateWithAddedHours(1)
  });

  const [clients, setClients] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);

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

  const handleSubmit = () => {
    scheduler.onConfirm(
      {
        event_id: values.id ?? Math.random(),
        title: values.name,
        start: values.start,
        end: values.end,
        description: 'lol',
      },
     'create'
    );
    scheduler.close();
  };

  const handleClientInput = (e: any, {id}: any) => {
    setValues({ ...values, clientId: id });
  };

  const handleEventTypeInput = (e: any, {id}: any) => {
    setValues({ ...values, eventTypeId: id });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Typography width={600} pl={5} py={3} variant='h6'>Add event</Typography>
      <Box px={5} display='flex' flexDirection='column' gap={3}>
        <Autocomplete
          disablePortal
          id="eventType"
          onChange={handleEventTypeInput}
          options={eventTypes}
          renderInput={(params: any) => (
            <TextField {...params} label="Event type" />
          )}
        />
        <Controls.Input
           validators={['required']}
           errorMessages={['this field is required']}
           name="title"
           onChange={handleInput}
           value={values.title}
        />
        <Controls.DateTimePicker
          name="start"
          onChange={handleInput}
          value={values.start}
        />
        <Controls.DateTimePicker
          name="end"
          onChange={handleInput}
          value={values.end}
        />
        <Autocomplete
          disablePortal
          id="client"
          onChange={handleClientInput}
          options={clients}
          renderInput={(params: any) => (
            <TextField {...params} label="Client" />
          )}
        />
      </Box>
      <DialogActions>
        <Button onClick={scheduler.close}>Cancel</Button>
        <Button type='submit'>Confirm</Button>
      </DialogActions>
    </Form>
  );
};

export default EventForm;
