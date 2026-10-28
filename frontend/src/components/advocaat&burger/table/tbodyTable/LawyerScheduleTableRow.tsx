import LawyerScheduleHourData from "./LawyerScheduleHourData";
import LawyerScheduleChamberData from "./LawyerScheduleChamberData";
import LawyerScheduleDeterminationCodeData from "./LawyerScheduleDeterminationCodeData";
import LawyerScheduleStatusData from "./LawyerScheduleStatusData";
import LawyerScheduleNotificationData from "./LawyerScheduleNotificationData";
import LawyerScheduleCaseNumberData from "./LawyerScheduleCaseNumberData";
import type { ScheduleTableRowProps } from "../../../../types";

const getBackGroundColor = (status : string) => {
    if (status === "Bezig") return "bg-[#edf7f2]";
    if (status === "Start binnenkort") return "bg-[#fefce8]";
    return "";
}

const LawyerScheduleTableRow = ({hour,chamber,caseNumber,determinationCode,status} : ScheduleTableRowProps) => {
    return (
        <tr className={`border-b border-gray-100 ${getBackGroundColor(status)}`}>
            <LawyerScheduleHourData hour={hour} />
            <LawyerScheduleChamberData chamber={chamber} />
            <LawyerScheduleCaseNumberData caseNumber={caseNumber} />
            <LawyerScheduleDeterminationCodeData determinationCode={determinationCode} />
            <LawyerScheduleStatusData status={status} />
            <LawyerScheduleNotificationData />
        </tr>
    )
}

export default LawyerScheduleTableRow