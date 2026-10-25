import { User } from "lucide-react";
import type { UserRole } from "../../types";
import ProfileCard from "./ProfileCard";

interface ProfileUserInfoProps {
  firstName: string;
  lastName: string;
  role: UserRole;
}

const ProfileUserInfo = ({
  firstName,
  lastName,
  role,
}: ProfileUserInfoProps) => {
  return (
    <ProfileCard title="Gebruikersinformatie" icon={<User size={20} />}>
      <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-medium text-lg">
          {firstName.charAt(0)}
          {lastName.charAt(0)}
        </div>
        <div>
          <p className="font-medium">
            {firstName} {lastName}
          </p>
          <p className="text-sm text-muted-foreground capitalize">{role}</p>
        </div>
      </div>
    </ProfileCard>
  );
};

export default ProfileUserInfo;
