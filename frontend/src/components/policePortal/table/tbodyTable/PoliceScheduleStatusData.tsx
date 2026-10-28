import PoliceStatusBadge from "../../PoliceStatusBadge"

const PoliceScheduleStatusData = ({status} : {status : string}) => {
    return (
        <td className="px-4 py-3.5">
            <PoliceStatusBadge status={status}/>
        </td>
    )
}

export default PoliceScheduleStatusData;