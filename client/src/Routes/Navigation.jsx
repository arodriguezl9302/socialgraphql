import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import Home from '../pages/Home/Home';

const Navigation = () => {
  let routes = useRoutes([
    { 
        path: '/login', 
        element: <h1>Login</h1>
    },
    { 
      path: '', 
      element: <Protected />,
      children: [
      { 
        path: '', 
        element: <div>Protected Index</div>
      },
      { 
        path: ':id', 
        element: <div>Protected Details</div>
      }
    ]
  }
]);
  return routes;
}
export default Navigation

const Games = () => {
  return (
    <div className="Games">
      <div>This is the Games pages</div>
      <Outlet />
    </div>
  );
}

const Protected = () => {
    const isAuth = true
    return isAuth ? <Outlet /> : < Navigate to="login"/>
  }


