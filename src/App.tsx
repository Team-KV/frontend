import { BrowserRouter, Routes, Route } from 'react-router-dom';

import DashboardPage from 'pages/DashboardPage/DashboardPage';
import ClientsPage from 'pages/ClientsPage/ClientsPage';
import CalendarPage from 'pages/CalendarPage/CalendarPage';
import EncyklopediaPage from 'pages/EncyklopediaPage/EncyklopediaPage';
import ExercisesPage from 'pages/ExercisesPage/ExercisesPage';
import LoginPage from 'pages/LoginPage/LoginPage';
import { Box } from '@mui/system';
import MiniDrawer from 'components/MiniDrawer';
import PrivateRoute from 'components/PrivateRoute';
import ClientsDetail from 'pages/ClientsPage/components/ClientsDetail';
import ClientsForm from 'pages/ClientsPage/components/ClientsForm';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <MiniDrawer body={<DashboardPage />} />
              </PrivateRoute>
            }
          />

          <Route
            path="/clients"
            element={
              <PrivateRoute>
                <MiniDrawer body={<ClientsPage />} />
              </PrivateRoute>
            }
          />

          <Route
            path="/clients/:id"
            element={
              <PrivateRoute>
                <MiniDrawer body={<ClientsDetail />} />
              </PrivateRoute>
            }
          />

          <Route
            path="/clients/form"
            element={
              <PrivateRoute>
                <MiniDrawer body={<ClientsForm />} />
              </PrivateRoute>
            }
          />

          <Route
            path="/calendar"
            element={
              <PrivateRoute>
                <MiniDrawer body={<CalendarPage />} />
              </PrivateRoute>
            }
          />

          <Route
            path="/encyclopedia"
            element={
              <PrivateRoute>
                <MiniDrawer body={<EncyklopediaPage />} />
              </PrivateRoute>
            }
          />

          <Route
            path="/exercises"
            element={
              <PrivateRoute>
                <MiniDrawer body={<ExercisesPage />} />
              </PrivateRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <MiniDrawer body={<DashboardPage />} />
              </PrivateRoute>
            }
          />

          {/* <Route path="/client/:clientID" element={<ClientDetail/>} /> */}
          <Route>404 Not found</Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
