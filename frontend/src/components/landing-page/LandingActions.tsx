import { Link } from "react-router";

const LandingActions = () => {
  return (
    <div className="space-y-3 pt-4">
      <Link
        to="/login"
        className="flex w-full items-center justify-center gap-2 rounded-md bg-linear-to-r from-[#0369a1] to-[#0891e6] py-3 px-4 font-bold text-white shadow-md hover:opacity-90 transition duration-200"
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
