export type SessionStatus = "Bezig" | "Start binnenkort" | "Gepland";

interface StatusBadgeProps {
  status: SessionStatus | string;
}

const LawyerStatusBadge = ({ status }: StatusBadgeProps) => {
  if (status === "Bezig") {
    return (
      <span className="inline-block bg-[#16a34a] text-white text-xs font-semibold px-6 py-1 rounded-full text-center min-w-[110px]">
        Bezig
      </span>
    );
  }

  if (status === "Start binnenkort") {
    return (
      <span className="inline-block bg-[#eab308] text-white text-xs font-semibold px-3 py-1 rounded-full text-center min-w-[110px]">
        Start binnenkort
      </span>
    );
  }

  return (
    <span className="inline-block bg-white border border-gray-200 text-gray-700 text-xs font-medium px-5 py-1 rounded-full text-center min-w-[110px]">
      Gepland
    </span>
  );
};

export default LawyerStatusBadge;