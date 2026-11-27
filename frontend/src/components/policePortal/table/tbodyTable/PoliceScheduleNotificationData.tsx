interface PoliceScheduleNotificationDataProps {
  isConfirmed: boolean;
  onToggleConfirm: () => void;
}

const PoliceScheduleNotificationData = ({
  isConfirmed,
  onToggleConfirm,
}: PoliceScheduleNotificationDataProps) => {
  return (
    <td className="px-4 py-3.5 text-right">
      <button
        type="button"
        className={`w-28 py-2 px-3 rounded-md text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
          isConfirmed
            ? "bg-white border border-[#109648] text-[#109648] hover:bg-emerald-50"
            : "bg-[#109648] text-white border border-transparent hover:bg-[#0d7d3c]"
        }`}
        onClick={onToggleConfirm}
      >
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
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
        <span>OK</span>
      </button>
    </td>
  );
};

export default PoliceScheduleNotificationData;