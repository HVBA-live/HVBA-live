import JudgeStatusBadge from "../../JudgeStatusBadge";

const JudgeScheduleStatusData = ({status} : {status : string}) => {
    return (
        <td className="px-4 py-3.5">
            <JudgeStatusBadge status={status}/>
        </td>
    )
}

export default JudgeScheduleStatusData;