import { useState } from "react";
import type { FormEvent } from "react";
import type { UserDetails } from "../../api/keycloakAdmin";

interface UserSettingsFormProps {
  firstName: string;
  lastName: string;
  email: string;
  saving: boolean;
  onSaveDetails: (details: UserDetails) => void;
  onResetPassword: (password: string, temporary: boolean) => void;
  onClose: () => void;
}

const inputClass =
  "h-11 w-full rounded-md border border-[#d7e1ed] bg-white px-3 font-normal text-[#174575] placeholder:text-[#7790b0]";

const UserSettingsForm = ({
  firstName,
  lastName,
  email,
  saving,
  onSaveDetails,
  onResetPassword,
  onClose,
}: UserSettingsFormProps) => {
  const [newFirstName, setNewFirstName] = useState(firstName);
  const [newLastName, setNewLastName] = useState(lastName);
  const [newEmail, setNewEmail] = useState(email);
  const [password, setPassword] = useState("");
  const [temporary, setTemporary] = useState(true);

  const handleDetailsSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSaveDetails({
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail,
    });
  };

  const handlePasswordSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onResetPassword(password, temporary);
  };

  return (
    <div className="col-span-full grid grid-cols-1 gap-4 border-t border-[#d8e2ef] pt-4 sm:grid-cols-2">
      <form onSubmit={handleDetailsSubmit} className="flex flex-col gap-3">
        <h3 className="font-semibold">Gegevens</h3>

        <label className="flex flex-col gap-2 font-semibold">
          Voornaam
          <input
            className={inputClass}
            value={newFirstName}
            onChange={(e) => setNewFirstName(e.target.value)}
            required
          />
        </label>

        <label className="flex flex-col gap-2 font-semibold">
          Achternaam
          <input
            className={inputClass}
            value={newLastName}
            onChange={(e) => setNewLastName(e.target.value)}
            required
          />
        </label>

        <label className="flex flex-col gap-2 font-semibold">
          E-mail
          <input
            className={inputClass}
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
          />
        </label>

        <button
          type="submit"
          disabled={saving}
          className="h-11 cursor-pointer rounded-md bg-[#006db3] px-4 font-semibold text-white hover:bg-[#00558c] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Gegevens opslaan
        </button>
      </form>

      <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-3">
        <h3 className="font-semibold">Wachtwoord wijzigen</h3>

        <label className="flex flex-col gap-2 font-semibold">
          Nieuw wachtwoord
          <input
            className={inputClass}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={12}
            placeholder="Minstens 12 tekens"
            required
          />
        </label>

        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            checked={temporary}
            onChange={(e) => setTemporary(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-[#006db3]"
          />
          Gebruiker moet bij de volgende login zelf een nieuw wachtwoord kiezen
        </label>

        <p className="text-xs text-[#6c83a2]">
          {temporary
            ? "De gebruiker wordt uitgelogd en kiest bij de volgende login zelf een nieuw wachtwoord."
            : "Let op: dit wachtwoord blijft geldig. De gebruiker wordt uitgelogd en logt voortaan in met dit wachtwoord."}
        </p>

        <button
          type="submit"
          disabled={saving}
          className="h-11 cursor-pointer rounded-md bg-[#f34043] px-4 font-semibold text-white hover:bg-[#db3035] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Wachtwoord instellen
        </button>
      </form>

      <div className="sm:col-span-2">
        <button
          type="button"
          onClick={onClose}
          className="h-11 w-full cursor-pointer rounded-md border border-[#d7e1ed] bg-white px-4 font-semibold text-[#07376c] hover:bg-[#f0f4f9]"
        >
          Sluiten
        </button>
      </div>
    </div>
  );
};

export default UserSettingsForm;
