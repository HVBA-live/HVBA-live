import { createBrowserRouter, Outlet } from "react-router";
import LawyerPortal from "../pages/lawyer&burgerPortal";
import JudgePortal from "../pages/judgePortal";
import LandingPage from "../pages/landing-page";
import Profile from "../pages/profile";
import AppLayout from "../components/layout/AppLayout";
import AdminPortal from "../pages/adminPortal";
import PolicePortal from "../pages/policePortal";
import RequireAuth from "../auth/RequireAuth";

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
        element: (
          <RequireAuth>
            <AppLayout />
          </RequireAuth>
        ),
        children: [
          {
            path: "lawyer",
            element: (
              <RequireAuth allowedRoles={["gebruiker"]}>
                <LawyerPortal />
              </RequireAuth>
            ),
          },
          {
            path: "judge",
            element: (
              <RequireAuth allowedRoles={["justitie"]}>
                <JudgePortal />
              </RequireAuth>
            ),
          },
          {
            path: "police",
            element: (
              <RequireAuth allowedRoles={["politie"]}>
                <PolicePortal />
              </RequireAuth>
            ),
          },
          {
            path: "admin",
            element: (
              <RequireAuth allowedRoles={["admin"]}>
                <AdminPortal />
              </RequireAuth>
            ),
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
