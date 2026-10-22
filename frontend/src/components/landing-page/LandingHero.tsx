import logo from "../../assets/HVBALogo.png";

interface LandingHeroProps {
  title: string;
  subtitle: string;
}

const LandingHero = ({ title, subtitle }: LandingHeroProps) => {
  return (
    <div className="space-y-4">
      <img src={logo} alt="HVBA Logo" className="mx-auto h-20 object-contain" />
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0369a1]">
          {title}
        </h1>
        <p className="text-lg text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
};

export default LandingHero;
