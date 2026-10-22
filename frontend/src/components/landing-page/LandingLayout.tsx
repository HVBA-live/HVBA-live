import type { ReactNode } from "react";

const LandingLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-linear-to-br from-secondary via-primary/5 to-background">
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <div className="w-full max-w-md mx-auto space-y-8">{children}</div>
      </div>
    </div>
  );
};

export default LandingLayout;
