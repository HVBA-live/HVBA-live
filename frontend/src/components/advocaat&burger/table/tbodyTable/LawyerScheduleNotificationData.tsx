interface LawyerScheduleNotificationDataProps {
  isSubscribed: boolean;
  onToggle: () => void;
}

const LawyerScheduleNotificationData = ({
  isSubscribed,
  onToggle,
}: LawyerScheduleNotificationDataProps) => {
  return (
    <td className="px-4 py-3.5 text-right">
      <button
        className={`w-32 py-2 px-3 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
          isSubscribed
            ? "bg-white border border-gray-200 text-gray-800 hover:bg-gray-50"
            : "bg-[#005a9c] text-white border border-transparent hover:bg-[#00487c]"
        }`}
        onClick={onToggle}
      >
        {isSubscribed ? "Geabonneerd" : "Abonneren"}
      </button>
    </td>
  );
};

export default LawyerScheduleNotificationData;