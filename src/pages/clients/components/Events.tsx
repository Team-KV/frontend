import {
  Avatar,
  Card,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import CardTitle from 'components/CardTitle';
import { Client } from 'models/Client';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DeleteIcon from '@mui/icons-material/Delete';
import EventIcon from '@mui/icons-material/Event';

const Events = (client: Client) => {
  const [t] = useTranslation();
  const [events, setEvents] = useState([
    {
      id: 1,
      name: 'Jarmilka vstupní meeting',
      start: new Date(),
      end: new Date(),
      note: 'Poznámka k meetingu',
      eventType: 'Schůzka',
    },
    {
      id: 2,
      name: 'Jarmilka další meeting',
      start: new Date(),
      end: new Date(),
      note: 'Poznámka',
      eventType: 'Schůzka',
    },
    {
      id: 3,
      name: 'Jarmilka poslední meeting',
      start: new Date(),
      end: new Date(),
      note: 'Poznámka k ukončení spolupráce',
      eventType: 'Schůzka',
    },
  ]);

  function generate(element: React.ReactElement) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      })
    );
  }

  const [secondary, setSecondary] = React.useState(false);

  const navigateToEvent = (e: any) => {
    //
  };

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
        {events.map((event) => {
          return (
            <ListItem>
              <ListItemAvatar onClick={navigateToEvent} className={'hover'}>
                <Avatar variant="rounded">
                  <Typography fontSize={16} fontWeight={700}>{event.start.getDate() + '.' + event.start.getMonth() + '.'}</Typography>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${event.name}`}
                secondary={`${event.start.getHours()}:${event.start.getMinutes()} - ${event.end.getHours() + 1}:${event.end.getMinutes()}`}
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
