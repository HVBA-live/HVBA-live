import { createBrowserRouter, Outlet } from "react-router";
import Login from "../pages/login";
import Register from "../pages/register";

const Root = () => {
    return (
        <>
        <Outlet />
        </>
    );
};

const router = createBrowserRouter([
    {
        path:"/",
        element:<Root/>,
        children:[
            {
                path:"login",
                element:<Login/>
            },{
                path:"register",
                element:<Register/>
            }
        ]
    }
]);

export default router;
