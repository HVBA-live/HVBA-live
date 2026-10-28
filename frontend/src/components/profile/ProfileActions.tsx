import { UserPen, KeyRound, Trash2 } from "lucide-react";

interface ProfileActionsProps {
  onEditProfile: () => void;
  onChangePassword: () => void;
  onDelete: () => void;
}

const ProfileActions = ({
  onEditProfile,
  onChangePassword,
  onDelete,
}: ProfileActionsProps) => {
  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={onEditProfile}
        className="flex w-full h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white bg-linear-to-r from-primary to-primary-glow hover:shadow-judicial transition-all duration-300"
      >
        <UserPen size={16} />
        Gegevens wijzigen
      </button>
      <button
        type="button"
        onClick={onChangePassword}
        className="flex w-full h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium border border-border bg-background text-foreground hover:bg-muted transition-all duration-300"
      >
        <KeyRound size={16} />
        Wachtwoord wijzigen
      </button>
      <button
        type="button"
        onClick={onDelete}
        className="flex w-full h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium bg-red-600 hover:bg-red-700 text-white"
      >
        <Trash2 size={16} />
        Account verwijderen
      </button>
    </div>
  );
};

export default ProfileActions;
