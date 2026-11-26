import LawyerScheduleHourData from "./LawyerScheduleHourData";
import LawyerScheduleChamberData from "./LawyerScheduleChamberData";
import LawyerScheduleDeterminationCodeData from "./LawyerScheduleDeterminationCodeData";
import LawyerScheduleStatusData from "./LawyerScheduleStatusData";
import LawyerScheduleNotificationData from "./LawyerScheduleNotificationData";
import LawyerScheduleCaseNumberData from "./LawyerScheduleCaseNumberData";
import type { ScheduleTableRowProps } from "../../../../types";

interface LawyerScheduleTableRowProps extends ScheduleTableRowProps {
  id: number;
  isSubscribed: boolean;
  onToggleSubscribe: (id: number) => void;
}

const getBackGroundColor = (status: string) => {
  if (status === "Bezig") return "bg-[#edf7f2]";
  if (status === "Start binnenkort") return "bg-[#fefce8]";
  if (status === "Afgehandeld") return "bg-gray-200 text-gray-500";
  return "";
};

const LawyerScheduleTableRow = ({
  id,
  hour,
  chamber,
  caseNumber,
  determinationCode,
  status,
  isSubscribed,
  onToggleSubscribe,
}: LawyerScheduleTableRowProps) => {
  return (
    <tr className={`border-b border-gray-100 ${getBackGroundColor(status)}`}>
      <LawyerScheduleHourData hour={hour} />
      <LawyerScheduleChamberData chamber={chamber} />
      <LawyerScheduleCaseNumberData caseNumber={caseNumber} />
      <LawyerScheduleDeterminationCodeData determinationCode={determinationCode} />
      <LawyerScheduleStatusData status={status} />
      <LawyerScheduleNotificationData
        isSubscribed={isSubscribed}
        onToggle={() => onToggleSubscribe(id)}
      />
    </tr>
  );
};

export default LawyerScheduleTableRow;