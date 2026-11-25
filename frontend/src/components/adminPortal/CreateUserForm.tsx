import { useState } from "react";
import type { FormEvent } from "react";
import type { UserRole } from "../../types";
import { hvbaRoles } from "../../api/keycloakAdmin";
import type { NewUser } from "../../api/keycloakAdmin";

interface CreateUserFormProps {
  roleLabels: Record<UserRole, string>;
  saving: boolean;
  onSave: (newUser: NewUser) => void;
  onCancel: () => void;
}

const inputClass =
  "h-11 w-full rounded-md border border-[#d7e1ed] bg-white px-3 font-normal text-[#174575] placeholder:text-[#7790b0]";

const CreateUserForm = ({
  roleLabels,
  saving,
  onSave,
  onCancel,
}: CreateUserFormProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("gebruiker");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave({ firstName, lastName, email, password, role });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 grid grid-cols-1 gap-3 rounded-lg border border-[#d8e2ef] bg-white p-4 sm:grid-cols-2"
    >
      <label className="flex flex-col gap-2 font-semibold">
        Voornaam
        <input
          className={inputClass}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </label>

      <label className="flex flex-col gap-2 font-semibold">
        Achternaam
        <input
          className={inputClass}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </label>

      <label className="flex flex-col gap-2 font-semibold">
        E-mail
        <input
          className={inputClass}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label className="flex flex-col gap-2 font-semibold">
        Tijdelijk wachtwoord
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

      <label className="flex flex-col gap-2 font-semibold">
        Rol
        <select
          className={inputClass}
          value={role}
          onChange={(e) => setRole(e.target.value as UserRole)}
        >
          {hvbaRoles.map((r) => (
            <option key={r} value={r}>
              {roleLabels[r]}
            </option>
          ))}
        </select>
      </label>

      <div className="flex items-end gap-2">
        <button
          type="submit"
          disabled={saving}
          className="h-11 flex-1 cursor-pointer rounded-md bg-[#006db3] px-4 font-semibold text-white hover:bg-[#00558c] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "Opslaan..." : "Opslaan"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="h-11 flex-1 cursor-pointer rounded-md border border-[#d7e1ed] bg-white px-4 font-semibold text-[#07376c] hover:bg-[#f0f4f9]"
        >
          Annuleren
        </button>
      </div>
    </form>
  );
};

export default CreateUserForm;
