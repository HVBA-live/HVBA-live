interface JudgeSchedulePoliceCheckDataProps {
  isPoliceConfirmed?: boolean;
}

const JudgeSchedulePoliceCheckData = ({
  isPoliceConfirmed = false,
}: JudgeSchedulePoliceCheckDataProps) => {
  return (
    <td className="px-4 py-3.5 text-right">
      <div
        title={isPoliceConfirmed ? "Politie bevestigd (OK)" : "Wacht op politie"}
        className={`inline-flex items-center justify-center w-9 h-9 rounded-md border transition-colors ${
          isPoliceConfirmed
            ? "bg-[#16a34a] border-[#16a34a] text-white"
            : "bg-gray-100 border-gray-200 text-gray-400"
        }`}
      >
        {isPoliceConfirmed ? (
          /* Cirkeltje met vinkje */
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        ) : (
          /* Leeg cirkeltje */
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="w-4 h-4"
          >
            <circle cx="12" cy="12" r="9" />
          </svg>
        )}
      </div>
    </td>
  );
};

export default JudgeSchedulePoliceCheckData;