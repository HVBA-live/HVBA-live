import { User } from "lucide-react";
import ProfileCard from "./ProfileCard";
import ProfileInput from "./ProfileInput";

interface ProfileNameProps {
  firstName: string;
  lastName: string;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
}

const ProfileName = ({
  firstName,
  lastName,
  onFirstNameChange,
  onLastNameChange,
}: ProfileNameProps) => {
  return (
    <ProfileCard title="Naam wijzigen" icon={<User size={20} />}>
      <ProfileInput
        id="firstName"
        label="Voornaam"
        value={firstName}
        onChange={onFirstNameChange}
      />
      <ProfileInput
        id="lastName"
        label="Achternaam"
        value={lastName}
        onChange={onLastNameChange}
      />
    </ProfileCard>
  );
};

export default ProfileName;
