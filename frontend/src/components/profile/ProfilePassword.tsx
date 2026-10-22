import { Lock } from "lucide-react";
import ProfileCard from "./ProfileCard";
import ProfileInput from "./ProfileInput";

interface ProfilePasswordProps {
  newPassword: string;
  confirmPassword: string;
  onNewPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
}

const ProfilePassword = ({
  newPassword,
  confirmPassword,
  onNewPasswordChange,
  onConfirmPasswordChange,
}: ProfilePasswordProps) => {
  return (
    <ProfileCard title="Wachtwoord" icon={<Lock size={20} />}>
      <ProfileInput
        id="new-password"
        label="Nieuw wachtwoord"
        type="password"
        value={newPassword}
        placeholder="Minstens 12 tekens"
        onChange={onNewPasswordChange}
      />
      {newPassword.length > 0 && newPassword.length < 12 && (
        <p className="text-red-500 text-xs">
          Wachtwoord moet minstens 12 tekens bevatten.
        </p>
      )}

      <ProfileInput
        id="confirm-password"
        label="Bevestig nieuw wachtwoord"
        type="password"
        value={confirmPassword}
        placeholder="Bevestig nieuw wachtwoord"
        onChange={onConfirmPasswordChange}
      />
      {confirmPassword.length > 0 && newPassword !== confirmPassword && (
        <p className="text-red-500 text-xs">Wachtwoorden komen niet overeen.</p>
      )}
    </ProfileCard>
  );
};

export default ProfilePassword;
