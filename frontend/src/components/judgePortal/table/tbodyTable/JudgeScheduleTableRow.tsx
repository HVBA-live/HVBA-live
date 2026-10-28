import JudgeScheduleHourData from "./JudgeScheduleHourData";
import JudgeScheduleChamberData from "./JudgeScheduleChamberData";
import JudgeScheduleDeterminationCodeData from "./JudgeScheduleDeterminationCodeData";
import JudgeScheduleStatusData from "./JudgeScheduleStatusData";
import JudgeScheduleNotificationData from "./JudgeScheduleNotificationData";
import JudgeScheduleCaseNumberData from "./JudgeScheduleCaseNumberData";
import type { ScheduleTableRowProps } from "../../../../types";

const getBackGroundColor = (status : string) => {
    if (status === "Bezig") return "bg-[#edf7f2]";
    if (status === "Start binnenkort") return "bg-[#fefce8]";
    return "";
}

const JudgeScheduleTableRow = ({hour,chamber,caseNumber,determinationCode,status} : ScheduleTableRowProps) => {
    return (
        <tr className={`border-b border-gray-100 ${getBackGroundColor(status)}`}>
            <JudgeScheduleHourData hour={hour} />
            <JudgeScheduleChamberData chamber={chamber} />
            <JudgeScheduleCaseNumberData caseNumber={caseNumber} />
            <JudgeScheduleDeterminationCodeData determinationCode={determinationCode} />
            <JudgeScheduleStatusData status={status} />
            <JudgeScheduleNotificationData />
        </tr>
    )
}

export default JudgeScheduleTableRow