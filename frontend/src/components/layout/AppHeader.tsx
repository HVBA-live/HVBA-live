import { useState } from "react";
import { useNavigate } from "react-router";
import { LogOut, Settings } from "lucide-react";
import logo from "../../assets/HVBALogo.png";
import { testUser } from "../../testData";

interface AppHeaderProps {
  title: string;
}

const AppHeader = ({ title }: AppHeaderProps) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const goTo = (path: string) => {
    setMenuOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    setMenuOpen(false);
    // TODO: uitloggen via de backend
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-border">
      <div className="flex items-center justify-between p-3 sm:p-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center space-x-2 sm:space-x-3"
        >
          <img src={logo} alt="HVBA Logo" className="h-8 object-contain" />
          <span className="text-base sm:text-lg font-bold text-primary truncate">
            {title}
          </span>
        </button>

        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-full p-1 hover:bg-muted"
          >
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-medium text-sm">
              {testUser.firstName.charAt(0)}
              {testUser.lastName.charAt(0)}
            </div>
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-md border border-border bg-white shadow-md py-1">
              <div className="px-3 py-2">
                <p className="text-sm font-medium">
                  {testUser.firstName} {testUser.lastName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {testUser.email}
                </p>
              </div>
              <hr className="border-border" />
              <button
                onClick={() => goTo("/profile")}
                className="flex w-full items-center px-3 py-2 text-sm hover:bg-muted"
              >
                <Settings className="mr-2 h-4 w-4" />
                Instellingen
              </button>
              <hr className="border-border" />
              <button
                onClick={handleLogout}
                className="flex w-full items-center px-3 py-2 text-sm text-destructive hover:bg-muted"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Uitloggen
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
