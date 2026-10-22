import { createBrowserRouter, Outlet } from "react-router";
import Login from "../pages/login";
import Register from "../pages/register";
import Lawyer from "../pages/lawyer&burgerPortal";
import LawyerPortal from "../pages/lawyer&burgerPortal";
import JudgePortal from "../pages/judgePortal";

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
            },{
                path:"lawyer",
                element:<LawyerPortal/>
            }
            ,{
                path:"judge",
                element:<JudgePortal/>
            }
        ]
    }
]);

export default router;
