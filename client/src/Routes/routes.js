import { useRoutes } from 'react-router-dom'
import Error404 from "../pages/Error404/Error404";
import Home from "../pages/Home/Home";
import User from "../pages/User";


const routes =useRoutes([
    {
        path: '/',
        element: () => <Home/>,
    },
    {
        path: '/user',
        element: () => <User/>,
    },
    {
        element: () => <Error404/>,
    },
    
]);

export default routes;