import PoliceScheduleNumberData from "./PoliceScheduleNumberData";
import PoliceScheduleHourData from "./PoliceScheduleHourData";
import PoliceScheduleChamberData from "./PoliceScheduleChamberData";
import PoliceScheduleDeterminationCodeData from "./PoliceScheduleDeterminationCodeData";
import PoliceScheduleStatusData from "./PoliceScheduleStatusData";
import PoliceScheduleNotificationData from "./PoliceScheduleNotificationData";
import PoliceScheduleCaseNumberData from "./PoliceScheduleCaseNumberData";
import type { ScheduleTableRowProps } from "../../../../types";

interface PoliceScheduleTableRowProps extends ScheduleTableRowProps {
  rowNumber: number;
}

const getBackGroundColor = (status: string) => {
  if (status === "Bezig") return "bg-[#edf7f2]";
  if (status === "Start binnenkort") return "bg-[#fefce8]";
  if (status === "Afgehandeld") return "bg-gray-200 text-gray-500";
  return "";
};

const PoliceScheduleTableRow = ({
  rowNumber,
  hour,
  chamber,
  caseNumber,
  determinationCode,
  status,
}: PoliceScheduleTableRowProps) => {
  return (
    <tr className={`border-b border-gray-100 ${getBackGroundColor(status)}`}>
      <PoliceScheduleNumberData rowNumber={rowNumber} />
      <PoliceScheduleHourData hour={hour} />
      <PoliceScheduleChamberData chamber={chamber} />
      <PoliceScheduleCaseNumberData caseNumber={caseNumber} />
      <PoliceScheduleDeterminationCodeData determinationCode={determinationCode} />
      <PoliceScheduleStatusData status={status} />
      <PoliceScheduleNotificationData />
    </tr>
  );
};

export default PoliceScheduleTableRow;