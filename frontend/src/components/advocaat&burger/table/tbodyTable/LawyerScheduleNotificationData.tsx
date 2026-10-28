import { useState } from "react"

const LawyerScheduleNotificationData = () => {
    const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

    return (
        <td className="px-4 py-3.5 text-right">
            <button className={`w-32 py-1.5 px-3 rounded-md text-xs font-semibold ${isSubscribed ? "border border-gray-200 text-white bg-[#16a34a]": "bg-[#005a9c] text-white border border-gray-200"}`} onClick={() => setIsSubscribed(!isSubscribed)}>
                {isSubscribed ? "Geabonneerd" : "Abonneren"}
            </button>
        </td>
    )
}

export default LawyerScheduleNotificationData;