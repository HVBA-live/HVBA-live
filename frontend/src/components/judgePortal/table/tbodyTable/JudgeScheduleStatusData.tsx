import { sessionStatuses } from "../../../../types";

interface JudgeScheduleStatusDataProps {
  id: number;
  status: string;
  onStatusChange: (id: number, status: string) => void;
}

const getStatusStyle = (status: string) => {
  if (status === "Bezig") return "bg-[#16a34a] text-white font-semibold border-transparent";
  if (status === "Start binnenkort") return "bg-[#eab308] text-white font-semibold border-transparent";
  if (status === "Afgehandeld") return "bg-gray-500 text-white font-semibold border-transparent";
  return "bg-white text-gray-700 font-medium border-gray-200";
};

const getArrowColor = (status: string) => {
  if (status === "Bezig" || status === "Start binnenkort" || status === "Afgehandeld") return "text-white";
  return "text-gray-500";
};

const JudgeScheduleStatusData = ({ id, status, onStatusChange }: JudgeScheduleStatusDataProps) => {
  return (
    <td className="px-4 py-3.5">
      <div className="relative inline-block">
        {/* Keuzelijst in badge-stijl: griffier kiest een nieuwe status */}
        <select
          value={status}
          onChange={(event) => onStatusChange(id, event.target.value)}
          className={`appearance-none cursor-pointer rounded-full border text-xs pl-3 pr-7 py-1 min-w-[130px] [text-align-last:center] ${getStatusStyle(status)}`}
        >
          {sessionStatuses.map((option) => (
            <option key={option} value={option} className="bg-white text-gray-700">
              {option}
            </option>
          ))}
        </select>

        {/* Klein pijltje zodat duidelijk is dat je kan klikken */}
        <span className={`pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] ${getArrowColor(status)}`}>
          ▼
        </span>
      </div>
    </td>
  );
};

export default JudgeScheduleStatusData;