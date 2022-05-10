import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { publicRoutes, privateRoutes, IRoute } from 'routes';
import ProtectedRoute from 'components/ProtectedRoute';
import { useEffect, useState } from 'react';
import store from 'store';
// import { fetchUser } from 'redux/slices/userSlice';
import Snackbar from 'components/Snackbar';
import { useAppDispatch, useAppSelector } from 'hooks';
import { fetchUser } from 'redux/slices/userSlice';

function App() {
  const user = useAppSelector<any>((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <div className='App'>
      <Snackbar />
      <BrowserRouter>
        <Routes>
          {publicRoutes.map((route: IRoute) => (
            <Route key={route.name} path={route.path} element={route.element} />
          ))}
          {user?.value?.role === 1
            ? privateRoutes['staff'].map((route: IRoute) => (
                <Route
                  key={route.name}
                  path={route.path}
                  element={<ProtectedRoute element={route.element} />}
                />
              ))
            : ''}
          {user?.value?.role === 0
            ? privateRoutes['client'].map((route: IRoute) => (
                <Route
                  key={route.name}
                  path={route.path}
                  element={<ProtectedRoute element={route.element} />}
                />
              ))
            : ''}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
