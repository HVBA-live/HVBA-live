import { Mail } from "lucide-react";
import ProfileCard from "./ProfileCard";
import ProfileInput from "./ProfileInput";

interface ProfileEmailProps {
  email: string;
  isValid: boolean;
  onEmailChange: (value: string) => void;
}

const ProfileEmail = ({ email, isValid, onEmailChange }: ProfileEmailProps) => {
  return (
    <ProfileCard title="E-mailadres" icon={<Mail size={20} />}>
      <ProfileInput
        id="email"
        label="Nieuw e-mailadres"
        type="email"
        value={email}
        onChange={onEmailChange}
      />
      {email.length > 0 && !isValid && (
        <p className="text-red-500 text-xs">
          Gelieve een geldig e-mailadres in te vullen.
        </p>
      )}
    </ProfileCard>
  );
};

export default ProfileEmail;
