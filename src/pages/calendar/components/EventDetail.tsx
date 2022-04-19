import { ProcessedEvent } from '@aldabil/react-scheduler/dist/types';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import ClientService from 'api/services/clientService';
import eventService from 'api/services/eventService';
import eventTypeService from 'api/services/eventTypeService';
import CardTitle from 'components/CardTitle';
import TextItem from 'components/TextItem';
import { ClientRequest } from 'http';
import { Client } from 'models/Client';
import { EventType } from 'models/EventType';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Event } from 'models/Event';
import { showError } from 'redux/slices/snackbarSlice';
import { useAppDispatch } from 'hooks';

const EventDetail = ({ event }: { event: ProcessedEvent }) => {
  const [client, setClient] = useState<Client>();
  const [eventTypes, setEventTypes] = useState<any>();
  const [eventDetail, setEventDetail] = useState<Event>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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

    eventService
      .getEvent(+event.id)
      .then((fetchedEvent: Event) => {
        setEventDetail({ ...fetchedEvent });
      })
      .catch((err) => {
        const message = err.response?.data?.message;
        dispatch(showError(message));
      });
  }, []);

  const handleClientClick = () => {
    if (client) navigate('/clients/' + client.id);
  };
  return (
    <Box>
      <TextItem
        label={t('calendar:eventType')}
        value={
          eventTypes?.find(
            (eventType: any) => eventType.id === event.eventTypeId
          )?.label ?? ''
        }
      ></TextItem>
      <TextItem label={t('calendar:note')} value={event.note}></TextItem>
      <TextItem label={t('calendar:client')} value={''}></TextItem>
      <Button onClick={handleClientClick}>
        {client?.firstName + ' ' + client?.lastName}
      </Button>
      <Box display={'flex'} gap={1} mt={3}>
        {eventDetail?.record ? (
          <Button
            onClick={() =>  {
              navigate('/records/' + eventDetail.record!.id)}
            }
            variant="contained"
            size="large"
            fullWidth
          >
            {t('calendar:recordDetail')}
          </Button>
        ) : (
          <Button
            onClick={() => navigate('/events/' + eventDetail?.id + '/record') }
            variant="contained"
            size="large"
            fullWidth
            color={'success'}
          >
            {t('calendar:recordNew')}
          </Button>
        )}
         {eventDetail?.task ? (
          <Button
            onClick={() =>  {
              navigate('/tasks/' + eventDetail.task!.id)}
            }
            variant="contained"
            size="large"
            fullWidth
          >
            {t('calendar:taskDetail')}
          </Button>
        ) : (
          <Button
            onClick={() => navigate('/events/' + eventDetail?.id + '/task') }
            variant="contained"
            size="large"
            fullWidth
            color={'success'}
          >
            {t('calendar:taskNew')}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default EventDetail;
