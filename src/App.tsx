import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DrawerMenu from './components/DrawerMenu';

import DashboardPageContainer from './pages/DashboardPage/DashboardPageContainer';
import ClientsPageContainer from './pages/ClientsPage/ClientsPageContainer';
import CalendarPageContainer from './pages/CalendarPage/CalendarPageContainer';
import EncyklopediaPageContainer from './pages/EncyklopediaPage/EncyklopediaPageContainer';
import ExercisesPageContainer from './pages/ExercisesPage/ExercisesPageContainer';
import { Box } from '@mui/system';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <DrawerMenu />
        <Box display="flex" justifyContent="center" alignItems="center">
          <Routes>
            <Route path="/" element={<DashboardPageContainer/>} />
            <Route path="/clients" element={<ClientsPageContainer/>} />
            <Route path="/calendar" element={<CalendarPageContainer/>} />
            <Route path="/encyklopedia" element={<EncyklopediaPageContainer/>} />
            <Route path="/exercises" element={<ExercisesPageContainer/>} />

            {/* <Route path="/client/:clientID" element={<ClientDetail/>} /> */}
            <Route>404 Not found</Route>
          </Routes>
        </Box>
      </BrowserRouter>
    </div>
  )
}

export default App