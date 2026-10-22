import { createBrowserRouter, Outlet } from "react-router";
import Login from "../pages/login";
import Register from "../pages/register";
import LawyerPortal from "../pages/lawyer&burgerPortal";
import JudgePortal from "../pages/judgePortal";
import LandingPage from "../pages/landing-page";

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
                index: true,
                element: <LandingPage />,
            },
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
