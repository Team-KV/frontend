import {
  Avatar,
  Card,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import TextItem from 'components/TextItem';
import { t } from 'i18next';
import CardTitle from 'components/CardTitle';
import { Task } from 'models/Task';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import { useNavigate } from 'react-router-dom';

const Tasks = ({ tasks }: { tasks: Task[] | undefined }) => {
  const navigate = useNavigate();

  const navigateToTask = (id: number) => {
    navigate('/tasks/' + id);
  };

  return (
    <Card
      sx={{
        height: '100%',
        p: 4,
      }}
      elevation={7}
    >
      <CardTitle text={t('dashboard:tasks')} />
      {tasks ? (
        <List>
          {tasks.map((task) => {
            return (
              <ListItem key={task.id}>
                <ListItemAvatar
                  onClick={() => {
                    navigateToTask(task.id);
                  }}
                  className={'hover'}
                >
                  <Avatar variant="rounded">
                    <AssignmentLateIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`${task.text}`}
                  onClick={() => {
                    navigateToTask(task.id);
                  }}
                  className={'hover'}
                />
              </ListItem>
            );
          })}
        </List>
      ) : (
        <TextItem value={t('dashboard:noTasks')} label={''} />
      )}
    </Card>
  );
};

export default Tasks;
