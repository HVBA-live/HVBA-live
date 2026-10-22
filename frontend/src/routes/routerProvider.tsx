import { createBrowserRouter, Outlet } from "react-router";
import Login from "../pages/login";
import Register from "../pages/register";
import LawyerPortal from "../pages/lawyer&burgerPortal";
import JudgePortal from "../pages/judgePortal";
import LandingPage from "../pages/landing-page";
import Profile from "../pages/profile";
import AppLayout from "../components/layout/AppLayout";

const Root = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        element: <AppLayout />,
        children: [
          {
            path: "lawyer",
            element: <LawyerPortal />,
          },
          {
            path: "judge",
            element: <JudgePortal />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);

export default router;
