import { useAuth } from "react-oidc-context";
import ProfileUserInfo from "../components/profile/ProfileUserInfo";
import ProfileNotification from "../components/profile/ProfileNotification";
import ProfileActions from "../components/profile/ProfileActions";
import { getMainRole } from "../auth/roles";

const Profile = () => {
  const auth = useAuth();

  const firstName = auth.user?.profile.given_name ?? "";
  const lastName = auth.user?.profile.family_name ?? "";
  const email = auth.user?.profile.email ?? "";
  const phoneNumber = auth.user?.profile.phone_number ?? "";
  const role = getMainRole(auth.user);

  const startKeycloakAction = (action: string) => {
    auth.signinRedirect({
      redirect_uri: `${window.location.origin}/profile`,
      extraQueryParams: { kc_action: action },
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold text-center">Profiel</h1>

      <div className="grid gap-6 lg:grid-cols-3 items-start">
        <div className="space-y-6">
          <ProfileUserInfo
            firstName={firstName}
            lastName={lastName}
            email={email}
            role={role}
          />
          <ProfileActions
            onEditProfile={() => startKeycloakAction("UPDATE_PROFILE")}
            onChangePassword={() => startKeycloakAction("UPDATE_PASSWORD")}
            onDelete={async () => {
              await auth.removeUser();
              startKeycloakAction("delete_account");
            }}
          />
        </div>

        {role === "gebruiker" && (
          <div className="lg:col-span-2">
            <ProfileNotification phoneNumber={phoneNumber} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
