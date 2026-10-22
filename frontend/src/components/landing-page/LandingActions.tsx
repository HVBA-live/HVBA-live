import { Link } from "react-router";

const LandingActions = () => {
  return (
    <div className="space-y-6 pt-2">
      <Link
        to="/login"
        className="block w-full text-center bg-hvba-blue hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-md transition duration-200"
      >
        Inloggen
      </Link>
      <Link
        to="/register"
        className="block w-full text-center border border-hvba-blue text-hvba-blue hover:bg-blue-50 font-bold py-2.5 px-4 rounded-md transition duration-200"
      >
        Account Aanmaken
      </Link>
    </div>
  );
};

export default LandingActions;
