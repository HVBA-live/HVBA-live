import { useState } from "react";
import LawyerFilterButton from "./LawyerFilterButton";
import LawyerScheduleTbody from "./table/tbodyTable/LawyerScheduleTbody";
import LawyerScheduleThead from "./table/theadTable/LawyerScheduleThead";

const LawyerScheduleTable = () => {
  const [selectedChamber, setSelectedChamber] = useState<string>("all");

  return (
    <>
      <LawyerFilterButton value={selectedChamber} onChange={setSelectedChamber}/>
      <div className="w-full max-w-6xl mx-auto px-4 mb-10">
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
          <table className="w-full text-left border-collapse">
            {/*Thead*/}
            <LawyerScheduleThead/>
            {/*Tbody*/}
            <LawyerScheduleTbody selectedChamber={selectedChamber}/>
          </table>
        </div>
      </div>
    </>
  );
};

export default LawyerScheduleTable;