import JudgeScheduleHour from "./JudgeScheduleHour";
import JudgeScheduleChamber from "./JudgeScheduleChamber";
import JudgeScheduleCaseNumber from "./JudgeScheduleCaseNumber";
import JudgeScheduleDeterminationCode from "./JudgeScheduleDeterminationCode";
import JudgeScheduleStatus from "./JudgeScheduleStatus";
import JudgeScheduleNotification from "./JudgeScheduleNotification";

const JudgeScheduleThead = () => {
    return (
        <thead>
            <tr className="bg-gray-50/80 border-b border-gray-200 text-xs font-semibold text-gray-600">
            {/*Hour*/}
              <JudgeScheduleHour/>
            {/*Chamber*/}
              <JudgeScheduleChamber/>
            {/*Case number*/}
              <JudgeScheduleCaseNumber/>
            {/*Determination code*/}
              <JudgeScheduleDeterminationCode/>
            {/*Status*/}
              <JudgeScheduleStatus/>
            {/*Notification*/}
              <JudgeScheduleNotification/>
            </tr>
        </thead>
    )
}

export default JudgeScheduleThead;