import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes, IRoute } from 'routes';
import ProtectedRoute from 'components/ProtectedRoute';
import { useEffect } from 'react';
import store from 'store';
import { fetchUser } from 'redux/slices/userSlice';
import Snackbar from 'components/Snackbar';

function App() {
  const auth = 'staff';

  let routes = privateRoutes[auth].map((route: IRoute) => (
    <Route
      key={route.name}
      path={route.path}
      element={<ProtectedRoute element={route.element} />}
    />
  ));

  useEffect(() => {
    store.dispatch(fetchUser)
  }, [])

  return (
    <div className="App">
      <Snackbar />
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
