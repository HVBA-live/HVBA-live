import PoliceScheduleHour from "./PoliceScheduleHour";
import PoliceScheduleChamber from "./PoliceScheduleChamber";
import PoliceScheduleCaseNumber from "./PoliceScheduleCaseNumber";
import PoliceScheduleDeterminationCode from "./PoliceScheduleDeterminationCode";
import PoliceScheduleStatus from "./PoliceScheduleStatus";
import PoliceScheduleNotification from "./PoliceScheduleNotification";

const PoliceScheduleThead = () => {
    return (
        <thead>
            <tr className="bg-gray-50/80 border-b border-gray-200 text-xs font-semibold text-gray-600">
            {/*Hour*/}
              <PoliceScheduleHour/>
            {/*Chamber*/}
              <PoliceScheduleChamber/>
            {/*Case number*/}
              <PoliceScheduleCaseNumber/>
            {/*Determination code*/}
              <PoliceScheduleDeterminationCode/>
            {/*Status*/}
              <PoliceScheduleStatus/>
            {/*Notification*/}
              <PoliceScheduleNotification/>
            </tr>
        </thead>
    )
}

export default PoliceScheduleThead;