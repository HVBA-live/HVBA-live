interface ProfileActionsProps {
  canSubmit: boolean;
  onDelete: () => void;
}

const ProfileActions = ({ canSubmit, onDelete }: ProfileActionsProps) => {
  return (
    <div>
      <button
        type="submit"
        disabled={!canSubmit}
        className="flex w-full h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white bg-linear-to-r from-primary to-primary-glow hover:shadow-judicial transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"
      >
        Bijwerken
      </button>
      <button
        type="button"
        onClick={onDelete}
        className="flex w-full h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-red-600 hover:bg-red-700 text-white mt-4"
      >
        Account verwijderen
      </button>
    </div>
  );
};

export default ProfileActions;
