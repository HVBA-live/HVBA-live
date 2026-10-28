import LawyerStatusBadge from "../../LawyerStatusBadge"

const LawyerScheduleStatusData = ({status} : {status : string}) => {
    return (
        <td className="px-4 py-3.5">
            <LawyerStatusBadge status={status}/>
        </td>
    )
}

export default LawyerScheduleStatusData;