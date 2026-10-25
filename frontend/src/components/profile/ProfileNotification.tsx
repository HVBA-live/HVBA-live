import { Bell } from "lucide-react";
import type { NotificationPreference } from "../../types";
import ProfileCard from "./ProfileCard";

interface ProfileNotificationProps {
  value: NotificationPreference;
  onChange: (value: NotificationPreference) => void;
}

const ProfileNotification = ({ value, onChange }: ProfileNotificationProps) => {
  return (
    <ProfileCard title="Meldingvoorkeur" icon={<Bell size={20} />}>
      <select
        id="notification-pref"
        value={value}
        onChange={(e) => onChange(e.target.value as NotificationPreference)}
        className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <option value="sms">SMS</option>
        <option value="whatsapp">WhatsApp</option>
      </select>
    </ProfileCard>
  );
};

export default ProfileNotification;
