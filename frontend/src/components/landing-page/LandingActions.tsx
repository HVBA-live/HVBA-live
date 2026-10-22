import { Link } from "react-router";
import { LogIn, UserPlus, ArrowRight } from "lucide-react";

const LandingActions = () => {
  return (
    <div className="space-y-3 pt-4">
      <Link
        to="/login"
        className="flex w-full h-11 items-center justify-center gap-2 rounded-md px-8 text-sm font-medium text-white bg-linear-to-r from-primary to-primary-glow hover:shadow-judicial transition-all duration-300"
      >
        <LogIn size={16} />
        Inloggen
        <ArrowRight size={16} />
      </Link>

      <Link
        to="/register"
        className="flex w-full h-11 items-center justify-center gap-2 rounded-md px-8 text-sm font-medium border border-border bg-background text-foreground hover:bg-primary-glow hover:text-white transition-all duration-300"
      >
        <UserPlus size={16} />
        Account Aanmaken
      </Link>
    </div>
  );
};

export default LandingActions;
