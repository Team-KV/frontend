import { ProcessedEvent } from '@aldabil/react-scheduler/dist/types';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import ClientService from 'api/services/clientService';
import eventTypeService from 'api/services/eventTypeService';
import CardTitle from 'components/CardTitle';
import TextItem from 'components/TextItem';
import { ClientRequest } from 'http';
import { Client } from 'models/Client';
import { EventType } from 'models/EventType';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const EventDetail = ({ event }: { event: ProcessedEvent }) => {
  const [client, setClient] = useState<Client>();
  const [eventTypes, setEventTypes] = useState<any>();

  const [t] = useTranslation();

  useEffect(() => {
    ClientService.getClient(+event.clientId).then((fetchedClient) => {
      setClient({ ...fetchedClient });
    });

    eventTypeService.getEventTypes().then((fetchedEventTypes) => {
      let options: any = fetchedEventTypes.map((eventType) => ({
        label: `${eventType.name}`,
        id: eventType.id,
      }));
      setEventTypes(options);
    });
  }, []);

  return (
    <>
      <TextItem
        label={t('calendar:eventType')}
        value={
          eventTypes?.find((eventType: any) => eventType.id === event.eventTypeId)
            ?.label ?? ''
        }
      ></TextItem>
      <TextItem label={t('calendar:note')} value={event.note}></TextItem>
      <TextItem label={t('calendar:client')} value={''}></TextItem>
      <Button>
        {client?.firstName + ' ' + client?.lastName}
      </Button>
      <Box display={'flex'} gap={1} mt={3}>
        <Button variant="contained" size="large" fullWidth>
          Record
        </Button>
        <Button variant="contained" size="large" fullWidth>
          Task
        </Button>
      </Box>
    </>
  );
};

export default EventDetail;
