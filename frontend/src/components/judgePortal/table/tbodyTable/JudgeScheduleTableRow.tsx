import JudgeScheduleNumberData from "./JudgeScheduleNumberData";
import JudgeScheduleHourData from "./JudgeScheduleHourData";
import JudgeScheduleChamberData from "./JudgeScheduleChamberData";
import JudgeScheduleDeterminationCodeData from "./JudgeScheduleDeterminationCodeData";
import JudgeScheduleStatusData from "./JudgeScheduleStatusData";
import JudgeScheduleActionsData from "./JudgeScheduleActionsData";
import JudgeScheduleNotificationData from "./JudgeScheduleNotificationData";
import JudgeSchedulePoliceCheckData from "./JudgeSchedulePoliceCheckData";
import JudgeScheduleCaseNumberData from "./JudgeScheduleCaseNumberData";
import type { ScheduleTableRowProps } from "../../../../types";

interface JudgeScheduleTableRowProps extends ScheduleTableRowProps {
  id: number;
  rowNumber: number;
  subscriberCount?: number;
  isPoliceConfirmed?: boolean;
  onStatusChange: (id: number, status: string) => void;
}

const getBackGroundColor = (status: string) => {
  if (status === "Bezig") return "bg-[#edf7f2]";
  if (status === "Start binnenkort") return "bg-[#fefce8]";
  if (status === "Afgehandeld") return "bg-gray-200 text-gray-500";
  return "";
};

const JudgeScheduleTableRow = ({
  id,
  rowNumber,
  hour,
  chamber,
  caseNumber,
  determinationCode,
  status,
  subscriberCount,
  isPoliceConfirmed,
  onStatusChange,
}: JudgeScheduleTableRowProps) => {
  return (
    <tr className={`border-b border-gray-100 ${getBackGroundColor(status)}`}>
      <JudgeScheduleNumberData rowNumber={rowNumber} />
      <JudgeScheduleHourData hour={hour} />
      <JudgeScheduleChamberData chamber={chamber} />
      <JudgeScheduleCaseNumberData caseNumber={caseNumber} />
      <JudgeScheduleDeterminationCodeData determinationCode={determinationCode} />
      <JudgeScheduleStatusData status={status} />
      <JudgeScheduleActionsData
        id={id}
        status={status}
        onStatusChange={onStatusChange}
      />
      <JudgeScheduleNotificationData subscriberCount={subscriberCount} />
      <JudgeSchedulePoliceCheckData isPoliceConfirmed={isPoliceConfirmed} />
    </tr>
  );
};

export default JudgeScheduleTableRow;