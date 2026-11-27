import JudgeStatusBadge from "../../JudgeStatusBadge";

interface JudgeScheduleStatusDataProps {
  status: string;
}

const JudgeScheduleStatusData = ({ status }: JudgeScheduleStatusDataProps) => {
  return (
    <td className="px-4 py-3.5">
      <JudgeStatusBadge status={status} />
    </td>
  );
};

export default JudgeScheduleStatusData;