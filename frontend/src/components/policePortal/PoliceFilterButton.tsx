import type { FilterButtonprops } from "../../types";

const PoliceFilterButton = ({value, onChange}: FilterButtonprops) => {
  return (
    <div className="w-full max-w-6xl mx-auto mb-6 px-4">
      <div className="flex items-center gap-1.5 text-[#003d66] text-xs font-semibold mb-1">
        <span>Kamer</span>
      </div>
      <div className="relative">
        <select
          className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-700 appearance-none focus:outline-none focus:border-sky-400 cursor-pointer pr-8"
          value={value} onChange={(event) => onChange(event.target.value)}
        >
          <option value="all">Alle kamers (2)</option>
          <option value="B4E3">B4E3</option>
          <option value="A2D1">A2D1</option>
        </select>
      </div>
    </div>
  );
};

export default PoliceFilterButton;