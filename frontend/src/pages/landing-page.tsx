import LandingLayout from "../components/landing-page/LandingLayout";
import LandingHero from "../components/landing-page/LandingHero";
import LandingActions from "../components/landing-page/LandingActions";

const LandingPage = () => {
  return (
    <LandingLayout>
      <LandingHero
        title="Welkom"
        subtitle="Zittingsagenda hof van beroep Antwerpen"
      />
      <LandingActions />
    </LandingLayout>
  );
};

export default LandingPage;
