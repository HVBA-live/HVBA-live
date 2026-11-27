interface JudgeScheduleActionsDataProps {
  id: number;
  status: string;
  onStatusChange: (id: number, status: string) => void;
}

const JudgeScheduleActionsData = ({
  id,
  status,
  onStatusChange,
}: JudgeScheduleActionsDataProps) => {
  const isStartingSoon = status === "Start binnenkort";
  const isOngoing = status === "Bezig";
  const isFinished = status === "Afgehandeld";

  // Zodra de zaak "Bezig" of "Afgehandeld" is, tonen we 1 knop: "Zaak beëindigen"
  if (isOngoing || isFinished) {
    return (
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={isFinished}
            onClick={() => onStatusChange(id, "Afgehandeld")}
            className={`w-62 py-2 px-4 rounded-md text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors ${
              isFinished
                ? "bg-white border border-gray-300 text-gray-400 cursor-not-allowed"
                : "bg-[#005a9c] text-white border border-transparent hover:bg-[#00487c] cursor-pointer"
            }`}
          >
            {/* Vierkant stop-icoon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3.5 h-3.5"
            >
              <rect x="4" y="4" width="16" height="16" rx="2" />
            </svg>
            <span>Zaak beëindigen</span>
          </button>
        </div>
      </td>
    );
  }

  // Bij "Gepland" of "Start binnenkort": 2 knoppen naast elkaar
  return (
    <td className="px-4 py-3.5">
      <div className="flex items-center gap-2">
        {/* Knop 1: Start binnenkort */}
        <button
          type="button"
          disabled={isStartingSoon}
          onClick={() => onStatusChange(id, "Start binnenkort")}
          className={`w-36 py-2 px-3 rounded-md text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors ${
            isStartingSoon
              ? "bg-white border border-[#eab308] text-[#eab308] cursor-not-allowed"
              : "bg-[#eab308] text-white border border-transparent hover:bg-[#ca8a04] cursor-pointer"
          }`}
        >
          {/* Vinkje in cirkel */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3.5 h-3.5 shrink-0"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          <span>Start binnenkort</span>
        </button>

        {/* Knop 2: Start */}
        <button
          type="button"
          onClick={() => onStatusChange(id, "Bezig")}
          className="w-24 py-2 px-3 rounded-md text-xs font-semibold inline-flex items-center justify-center gap-1.5 bg-[#16a34a] text-white border border-transparent hover:bg-[#15803d] transition-colors cursor-pointer"
        >
          {/* Play-icoon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3.5 h-3.5 shrink-0"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          <span>Start</span>
        </button>
      </div>
    </td>
  );
};

export default JudgeScheduleActionsData;