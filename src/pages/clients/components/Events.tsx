import {
  Avatar,
  Card,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import CardTitle from 'components/CardTitle';
import { Client } from 'models/Client';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EventIcon from '@mui/icons-material/Event';
import { useNavigate } from 'react-router-dom';
import { Event } from 'models/Event';

const Events = ({ client }: { client: Client }) => {
  const navigate = useNavigate();
  const [t] = useTranslation();
  const [events, setEvents] = useState<Event[]>([]);

  function generate(element: React.ReactElement) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      })
    );
  }

  const startCompare = (a: Event, b: Event): number => {
    const dateA = new Date(a.start);
    const dateB = new Date(b.start);
    return dateA > dateB ? -1 : 1;
  };

  const navigateToEvent = (e: any) => {
    navigate('/calendar');
  };

  useEffect(() => {
    if (client?.events) setEvents([...client.events]);
  }, [client?.events]);

  return (
    <Card
      sx={{
        height: '100%',
        p: 4,
      }}
      elevation={7}
    >
      <CardTitle text={t('events')} />
      <List>
        {events.sort(startCompare).map((event) => {
          return (
            <ListItem key={event.id}>
              <ListItemAvatar onClick={navigateToEvent} className={'hover'}>
                <Avatar variant="rounded">
                  <EventIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${event.name}`}
                secondary={`${new Date(
                  event.start
                ).toLocaleDateString()} - ${new Date(
                  event.end
                ).toLocaleDateString()}`}
                onClick={navigateToEvent}
                className={'hover'}
              />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
};

export default Events;
