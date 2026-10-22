import { Link } from "react-router";

const LandingActions = () => {
  return (
    <div className="space-y-3 pt-4">
      <Link to="/login">Inloggen</Link>
      <Link to="/register">Account Aanmaken</Link>
    </div>
  );
};

export default LandingActions;
