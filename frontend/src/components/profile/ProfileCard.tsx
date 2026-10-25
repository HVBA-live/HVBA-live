import type { ReactNode } from "react";

interface ProfileCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

const ProfileCard = ({ title, icon, children }: ProfileCardProps) => {
  return (
    <div className="rounded-lg border border-border bg-background text-foreground shadow-sm">
      <div className="p-6">
        <h3 className="flex items-center gap-2 text-2xl font-semibold leading-none tracking-tight">
          {icon}
          {title}
        </h3>
      </div>
      <div className="p-6 pt-0 space-y-4">{children}</div>
    </div>
  );
};

export default ProfileCard;
