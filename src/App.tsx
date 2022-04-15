import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes, IRoute } from 'routes';
import ProtectedRoute from 'components/ProtectedRoute';

function App() {
  const auth = 'staff';

  let routes = privateRoutes[auth].map((route: IRoute) => (
    <Route
      key={route.name}
      path={route.path}
      element={<ProtectedRoute element={route.element} />}
    />
  ));

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {publicRoutes.map((route: IRoute) => (
            <Route key={route.name} path={route.path} element={route.element} />
          ))}
          {routes}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
