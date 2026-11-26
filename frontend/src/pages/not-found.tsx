import { Link } from "react-router";
import { useAuth } from "react-oidc-context";
import { getMainRole, homePathPerRole } from "../auth/roles";

const NotFoundPage = () => {
  const auth = useAuth();
  const role = getMainRole(auth.user);
  const homePath = auth.isAuthenticated && role ? homePathPerRole[role] : "/";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#19274a] via-[#0065a4]/5 to-white">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center space-y-4">
        <p className="text-6xl font-bold text-[#0065a4]">404</p>
        <h1 className="text-xl font-semibold">Pagina niet gevonden</h1>
        <p className="text-sm text-muted-foreground">
          De pagina die je zoekt bestaat niet of is verplaatst.
        </p>
        <Link
          to={homePath}
          className="inline-block rounded-md px-4 py-2 text-white font-medium bg-gradient-to-r from-[#0065a4] to-[#008ee6]"
        >
          Terug naar start
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
