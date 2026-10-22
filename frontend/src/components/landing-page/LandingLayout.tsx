import type { ReactNode } from "react";

const LandingLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-linear-to-br from-[#1b365d] via-[#a3b8cc] via-35% to-[#f8fafc] to-65% min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md text-center space-y-8">{children}</div>
    </div>
  );
};

export default LandingLayout;
