interface LandingHeroProps {
  title: string;
  subtitle: string;
}

const LandingHero = ({ title, subtitle }: LandingHeroProps) => {
  return (
    <div className="space-y-4">
      <img src="/logo.png" alt="Logo" className="mx-auto h-24" />
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold">{title}</h1>
        <p className="text-lg">{subtitle}</p>
      </div>
    </div>
  );
};

export default LandingHero;
