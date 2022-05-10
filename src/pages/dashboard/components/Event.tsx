import {
  Avatar,
  Card,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import TextItem from 'components/TextItem';
import CardTitle from 'components/CardTitle';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Event } from 'models/Event';
import EventIcon from '@mui/icons-material/Event';

const StaffInfo = ({ event }: { event: Event | undefined }) => {
  const navigate = useNavigate();
  const [t] = useTranslation();

  return (
    <Card
      sx={{
        height: '100%',
        p: 4,
      }}
      elevation={7}
    >
      <CardTitle text={t('dashboard:nextEvent')} />
      {event ? (
        <List>
          <ListItem key={event.id}>
            <ListItemAvatar>
              <Avatar variant='rounded'>
                <EventIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`${new Date(event.start).toLocaleDateString()} - ${
                event.name
              }`}
              secondary={`${new Date(event.start).toLocaleTimeString(
                navigator.language,
                {
                  hour: '2-digit',
                  minute: '2-digit',
                }
              )} - ${new Date(event.end).toLocaleTimeString(
                navigator.language,
                {
                  hour: '2-digit',
                  minute: '2-digit',
                }
              )}`}
            />
          </ListItem>
        </List>
      ) : (
        <TextItem value={t('dashboard:noNextEvent')} label={''} />
      )}
    </Card>
  );
};

export default StaffInfo;
