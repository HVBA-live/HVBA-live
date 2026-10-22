import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router";
import type { User, NotificationPreference } from "../types";
import ProfileUserInfo from "../components/profile/ProfileUserInfo";
import ProfileName from "../components/profile/ProfileName";
import ProfileEmail from "../components/profile/ProfileEmail";
import ProfilePassword from "../components/profile/ProfilePassword";
import ProfileNotification from "../components/profile/ProfileNotification";
import ProfileActions from "../components/profile/ProfileActions";

// Tijdelijke testdata tot de backend er is
const testUser: User = {
  id: "1",
  email: "jan.peeters@mail.be",
  firstName: "Jan",
  lastName: "Peeters",
  role: "gebruiker",
  notificationPreference: "whatsapp",
  isActive: true,
  createdAt: "2026-01-01",
};

const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

const Profile = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(testUser.firstName);
  const [lastName, setLastName] = useState(testUser.lastName);
  const [email, setEmail] = useState(testUser.email);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notificationPref, setNotificationPref] =
    useState<NotificationPreference>(
      testUser.notificationPreference || "whatsapp",
    );

  const passwordTooShort = newPassword.length > 0 && newPassword.length < 12;
  const passwordsDontMatch =
    newPassword.length > 0 && newPassword !== confirmPassword;
  const canSubmit =
    isValidEmail(email) && !passwordTooShort && !passwordsDontMatch;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: gegevens naar de backend sturen
    alert("Profiel bijgewerkt");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleDelete = () => {
    if (!confirm("Weet u zeker dat u uw account definitief wilt verwijderen?"))
      return;
    // TODO: account verwijderen via de backend
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="p-3 sm:p-4 md:p-6">
        <form onSubmit={handleSubmit} className="max-w-6xl mx-auto space-y-6">
          <h1 className="text-xl sm:text-2xl font-bold text-center">Profiel</h1>

          <div className="grid gap-6 lg:grid-cols-3 items-start">
            <div className="space-y-6">
              <ProfileUserInfo
                firstName={testUser.firstName}
                lastName={testUser.lastName}
                role={testUser.role}
              />
              <ProfileActions canSubmit={canSubmit} onDelete={handleDelete} />
            </div>

            <div className="grid gap-6 md:grid-cols-2 items-start lg:col-span-2">
              <ProfileName
                firstName={firstName}
                lastName={lastName}
                onFirstNameChange={setFirstName}
                onLastNameChange={setLastName}
              />
              <ProfileEmail
                email={email}
                isValid={isValidEmail(email)}
                onEmailChange={setEmail}
              />
              <ProfilePassword
                newPassword={newPassword}
                confirmPassword={confirmPassword}
                onNewPasswordChange={setNewPassword}
                onConfirmPasswordChange={setConfirmPassword}
              />
              {testUser.role === "gebruiker" && (
                <ProfileNotification
                  value={notificationPref}
                  onChange={setNotificationPref}
                />
              )}
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Profile;
