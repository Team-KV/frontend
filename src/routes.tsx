import NotFound from 'components/NotFound';
import Calendar from 'pages/calendar/Calendar';
import RecordDetail from 'pages/calendar/components/RecordDetail';
import RecordForm from 'pages/calendar/components/RecordForm';
import TaskDetail from 'pages/calendar/components/TaskDetail';
import TaskForm from 'pages/calendar/components/TaskForm';
import Clients from 'pages/clients/Clients';
import ClientsDetail from 'pages/clients/ClientsDetail';
import ClientsForm from 'pages/clients/ClientsForm';
import DashboardPage from 'pages/dashboard/dashboard';
import ExercisesPage from 'pages/exercises/Exercises';
import ExercisesDetail from 'pages/exercises/ExercisesDetail';
import ExercisesForm from 'pages/exercises/ExercisesForm';
import LoginPage from 'pages/LoginPage/LoginPage';

export interface IRoute {
  name: string;
  path: string;
  element: JSX.Element;
}

//\\ =================== PUBLIC ROUTES =================== //\\

export const publicRoutes: IRoute[] = [
  {
    name: 'login',
    path: '/',
    element: <LoginPage />,
  },
  {
    name: 'login',
    path: '/login',
    element: <LoginPage />,
  },
  {
    name: '404',
    path: '*',
    element: <NotFound />,
  },
];

//\\ =================== PRIVATE ROUTES =================== //\\

export const privateRoutes: { staff: IRoute[]; client: IRoute[] } = {
  staff: [
    {
      name: 'clients',
      path: '/clients',
      element: <Clients />,
    },
    {
      name: 'clients-detail',
      path: '/clients/:id',
      element: <ClientsDetail />,
    },
    {
      name: 'clients-form',
      path: '/clients/form',
      element: <ClientsForm />,
    },
    {
      name: 'clients-form',
      path: '/clients/:id/form',
      element: <ClientsForm />,
    },

    // CALENDAR
    {
      name: 'calendar',
      path: '/calendar',
      element: <Calendar />,
    },
    {
      name: 'calendar',
      path: '/events/:eventId/record',
      element: <RecordForm />,
    },
    {
      name: 'calendar',
      path: '/records/:recordId/form',
      element: <RecordForm />,
    },
    {
      name: 'calendar',
      path: '/records/:id',
      element: <RecordDetail />,
    },
    {
      name: 'calendar',
      path: '/events/:eventId/task',
      element: <TaskForm />,
    },
    {
      path: '/tasks/:id/form',
      name: 'calendar',
      element: <TaskForm />,
    },
    {
      path: '/tasks/:id',
      name: 'calendar',
      element: <TaskDetail />,
    },

    // EXERCISES
    {
      name: 'exercises',
      path: '/exercises',
      element: <ExercisesPage />,
    },
    {
      name: 'exercises',
      path: '/exercises/:id',
      element: <ExercisesDetail />,
    },
    {
      name: 'exercises',
      path: '/exercises/:id/form',
      element: <ExercisesForm />,
    },
    {
      name: 'exercises',
      path: '/exercises/form',
      element: <ExercisesForm />,
    },
  ],
  client: [
    {
      name: 'dashboard',
      path: '/dashboard',
      element: <DashboardPage />,
    },
    {
      path: '/tasks/:id',
      name: 'calendar',
      element: <TaskDetail />,
    },
  ],
};
