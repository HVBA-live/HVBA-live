import JudgeScheduleNumber from "./JudgeScheduleNumber";
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
        {/* Nr. */}
        <JudgeScheduleNumber />
        {/* Hour */}
        <JudgeScheduleHour />
        {/* Chamber */}
        <JudgeScheduleChamber />
        {/* Case number */}
        <JudgeScheduleCaseNumber />
        {/* Determination code */}
        <JudgeScheduleDeterminationCode />
        {/* Status */}
        <JudgeScheduleStatus />
        {/* Actieknoppen */}
        <th className="px-4 py-3"></th>
        {/* Abonnees */}
        <JudgeScheduleNotification />
        {/* Politiebevestiging */}
        <th className="px-4 py-3 w-16"></th>
      </tr>
    </thead>
  );
};

export default JudgeScheduleThead;