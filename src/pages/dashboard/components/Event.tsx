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

  const navigateToEvent = (e: any) => {
    navigate('/calendar');
  };

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
        </List>
      ) : (
        <TextItem value={t('dashboard:noNextEvent')} label={''} />
      )}
    </Card>
  );
};

export default StaffInfo;
