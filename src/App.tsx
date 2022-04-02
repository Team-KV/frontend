import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes, IRoute } from 'routes';
import ProtectedRoute from 'components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {publicRoutes.map((route: IRoute) => (
            <Route key={route.name} path={route.path} element={route.element} />
          ))}
          {privateRoutes.map((route: IRoute) => (
            <Route
              key={route.name}
              path={route.path}
              element={<ProtectedRoute element={route.element} />}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
