import LandingLayout from "../components/landing-page/LandingLayout";
import LandingHero from "../components/landing-page/LandingHero";
import LandingActions from "../components/landing-page/LandingActions";
import { useAuth } from "react-oidc-context";
import { getMainRole, homePathPerRole } from "../auth/roles";
import { Navigate } from "react-router";

const LandingPage = () => {
  const auth = useAuth();

  if (auth.isLoading) {
    return null;
  }

  if (auth.isAuthenticated) {
    const role = getMainRole(auth.user);
    if (role) {
      return <Navigate to={homePathPerRole[role]} replace />;
    }
  }
  return (
    <LandingLayout>
      <LandingHero
        title="HVBA Live"
        subtitle="Zittingsagenda hof van beroep Antwerpen"
      />
      <LandingActions />
    </LandingLayout>
  );
};

export default LandingPage;
