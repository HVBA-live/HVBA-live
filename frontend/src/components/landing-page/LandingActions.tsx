import { useAuth } from "react-oidc-context";
import { LogIn, UserPlus, ArrowRight } from "lucide-react";

const LandingActions = () => {
  const auth = useAuth();

  return (
    <div className="space-y-3 pt-4">
      <button
        type="button"
        onClick={() => auth.signinRedirect()}
        className="flex w-full h-11 items-center justify-center gap-2 rounded-md px-8 text-sm font-medium text-white bg-linear-to-r from-primary to-primary-glow hover:shadow-judicial transition-all duration-300"
      >
        <LogIn size={16} />
        Inloggen
        <ArrowRight size={16} />
      </button>

      <button
        type="button"
        onClick={() => auth.signinRedirect({ prompt: "create" })}
        className="flex w-full h-11 items-center justify-center gap-2 rounded-md px-8 text-sm font-medium border border-border bg-background text-foreground hover:bg-primary-glow hover:text-white transition-all duration-300"
      >
        <UserPlus size={16} />
        Account Aanmaken
      </button>
    </div>
  );
};

export default LandingActions;
