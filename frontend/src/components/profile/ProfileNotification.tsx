import { Phone } from "lucide-react";
import ProfileCard from "./ProfileCard";

interface ProfileNotificationProps {
  phoneNumber: string;
}

const ProfileNotification = ({ phoneNumber }: ProfileNotificationProps) => {
  return (
    <ProfileCard title="Contact" icon={<Phone size={20} />}>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Telefoonnummer</p>
        <p className="font-medium">{phoneNumber || "Niet ingevuld"}</p>
      </div>
      <p className="text-xs text-muted-foreground">
        Wijzigen kan via "Gegevens wijzigen".
      </p>
    </ProfileCard>
  );
};

export default ProfileNotification;
