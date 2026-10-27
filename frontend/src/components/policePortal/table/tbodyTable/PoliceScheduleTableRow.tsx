import PoliceScheduleHourData from "./PoliceScheduleHourData";
import PoliceScheduleChamberData from "./PoliceScheduleChamberData";
import PoliceScheduleDeterminationCodeData from "./PoliceScheduleDeterminationCodeData";
import PoliceScheduleStatusData from "./PoliceScheduleStatusData";
import PoliceScheduleNotificationData from "./PoliceScheduleNotificationData";
import PoliceScheduleCaseNumberData from "./PoliceScheduleCaseNumberData";
import type { ScheduleTableRowProps } from "../../../../types";

const getBackGroundColor = (status : string) => {
    if (status === "Bezig") return "bg-[#edf7f2]";
    if (status === "Start binnenkort") return "bg-[#fefce8]";
    return "";
}

const PoliceScheduleTableRow = ({hour,chamber,caseNumber,determinationCode,status} : ScheduleTableRowProps) => {
    return (
        <tr className={`border-b border-gray-100 ${getBackGroundColor(status)}`}>
            <PoliceScheduleHourData hour={hour} />
            <PoliceScheduleChamberData chamber={chamber} />
            <PoliceScheduleCaseNumberData caseNumber={caseNumber} />
            <PoliceScheduleDeterminationCodeData determinationCode={determinationCode} />
            <PoliceScheduleStatusData status={status} />
            <PoliceScheduleNotificationData />
        </tr>
    )
}

export default PoliceScheduleTableRow