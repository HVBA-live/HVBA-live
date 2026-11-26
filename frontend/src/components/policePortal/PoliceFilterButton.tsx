import type { FilterButtonprops } from "../../types";
import { useChambers } from "../../hooks/useChambers";

const PoliceFilterButton = ({ value, onChange }: FilterButtonprops) => {
  const chambers = useChambers();

  return (
    <div className="w-full max-w-6xl mx-auto mb-6 px-4">
      <div className="flex items-center gap-1.5 text-[#003d66] text-xs font-semibold mb-1.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-3.5 h-3.5 text-[#005a9c]"
        >
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
        <span>Kamer</span>
      </div>
      <div className="relative">
        <select
          className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-700 appearance-none focus:outline-none focus:border-sky-400 cursor-pointer pr-8"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        >
          <option value="all">Alle kamers ({chambers.length})</option>
          {chambers.map((chamber) => (
            <option key={chamber} value={chamber}>
              {chamber}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
          ⌄
        </span>
      </div>
    </div>
  );
};

export default PoliceFilterButton;