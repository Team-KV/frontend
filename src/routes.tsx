import NotFound from 'components/NotFound';
import ClientsPage from 'pages/ClientsPage/ClientsPage';
import ClientsDetail from 'pages/ClientsPage/components/ClientsDetail';
import ClientsForm from 'pages/ClientsPage/components/ClientsForm';
import DashboardPage from 'pages/DashboardPage/DashboardPage';
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

export const privateRoutes: IRoute[] = [

  // GENERAL
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

  // CLIENTS
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
];
