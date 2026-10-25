import { Outlet } from "react-router";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader title="HVBA Live" />
      <main className="flex-1 p-3 sm:p-4 md:p-6">
        <Outlet />
      </main>
      <AppFooter />
    </div>
  );
};

export default AppLayout;
