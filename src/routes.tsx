import NotFound from 'components/NotFound';
import CalendarPage from 'pages/CalendarPage/CalendarPage';
import ClientsPage from 'pages/clients/Clients';
import ClientsDetail from 'pages/clients/ClientsDetail';
import ClientsForm from 'pages/clients/ClientsForm';
import DashboardPage from 'pages/DashboardPage/DashboardPage';
import ExercisesPage from 'pages/ExercisesPage/ExercisesPage';
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

export const privateRoutes: {staff: IRoute[], client: IRoute[]} = {
  staff: [
    {
      name: 'home',
      path: '/',
      element: <ClientsPage />,
    },
    {
      name: 'clients',
      path: '/clients',
      element: <ClientsPage />,
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
      element: <CalendarPage />,
    },

    // EXERCISES
    {
      name: 'exercises',
      path: '/exercises',
      element: <ExercisesPage />,
    }
  ],
  client: [
    {
      name: 'home',
      path: '/',
      element: <DashboardPage />,
    },
    {
      name: 'dashboard',
      path: '/dashboard',
      element: <DashboardPage />,
    },
  ]
}