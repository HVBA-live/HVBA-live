import LawyerScheduleHour from "./LawyerScheduleHour";
import LawyerScheduleChamber from "./LawyerScheduleChamber";
import LawyerScheduleCaseNumber from "./LawyerScheduleCaseNumber";
import LawyerScheduleDeterminationCode from "./LawyerScheduleDeterminationCode";
import LawyerScheduleStatus from "./LawyerScheduleStatus";
import LawyerScheduleNotification from "./LawyerScheduleNotification";

const LawyerScheduleThead = () => {
    return (
        <thead>
            <tr className="bg-gray-50/80 border-b border-gray-200 text-xs font-semibold text-gray-600">
            {/*Hour*/}
              <LawyerScheduleHour/>
            {/*Chamber*/}
              <LawyerScheduleChamber/>
            {/*Case number*/}
              <LawyerScheduleCaseNumber/>
            {/*Determination code*/}
              <LawyerScheduleDeterminationCode/>
            {/*Status*/}
              <LawyerScheduleStatus/>
            {/*Notification*/}
              <LawyerScheduleNotification/>
            </tr>
        </thead>
    )
}

export default LawyerScheduleThead;