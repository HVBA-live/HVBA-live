import { Bell } from "lucide-react";
import ProfileCard from "./ProfileCard";

interface ProfileNotificationProps {
  phoneNumber: string;
  notificationPreference: string;
}

const preferenceLabels: Record<string, string> = {
  sms: "SMS",
  whatsapp: "WhatsApp",
};

const ProfileNotification = ({
  phoneNumber,
  notificationPreference,
}: ProfileNotificationProps) => {
  return (
    <ProfileCard title="Meldingen" icon={<Bell size={20} />}>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Telefoonnummer</p>
        <p className="font-medium">{phoneNumber || "Niet ingevuld"}</p>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Meldingvoorkeur</p>
        <p className="font-medium">
          {preferenceLabels[notificationPreference] ?? "Niet ingevuld"}
        </p>
      </div>
      <p className="text-xs text-muted-foreground">
        Wijzigen kan via "Gegevens wijzigen".
      </p>
    </ProfileCard>
  );
};

export default ProfileNotification;
