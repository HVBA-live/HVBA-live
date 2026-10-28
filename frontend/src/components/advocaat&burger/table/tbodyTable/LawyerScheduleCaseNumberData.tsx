const LawyerScheduleCaseNumberData = ({caseNumber}: {caseNumber : string}) => {
    return (
        <td className="px-4 py-3.5 text-gray-700">
            <div className="flex items-center gap-1.5 text-[#003d66]">
                <span className="font-medium">{caseNumber}</span>
            </div>
        </td>
    )
}

export default LawyerScheduleCaseNumberData;