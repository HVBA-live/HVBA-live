import { useState } from "react";
import PoliceFilterButton from "./PoliceFilterButton";
import PoliceScheduleTbody from "./table/tbodyTable/PoliceScheduleTbody";
import PoliceScheduleThead from "./table/theadTable/PoliceScheduleThead";

const PoliceScheduleTable = () => {
  const [selectedChamber, setSelectedChamber] = useState<string>("all");

  return (
    <>
      <PoliceFilterButton value={selectedChamber} onChange={setSelectedChamber}/>
      <div className="w-full max-w-6xl mx-auto px-4 mb-10">
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
          <table className="w-full text-left border-collapse">
            {/*Thead*/}
            <PoliceScheduleThead/>
            {/*Tbody*/}
            <PoliceScheduleTbody selectedChamber={selectedChamber}/>
          </table>
        </div>
      </div>
    </>
  );
};

export default PoliceScheduleTable;