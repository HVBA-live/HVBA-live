import { useState } from "react";
import JudgeFilterButton from "./JudgeFilterButton";
import JudgeScheduleTbody from "./table/tbodyTable/JudgeScheduleTbody";
import JudgeScheduleThead from "./table/theadTable/JudgeScheduleThead";

const JudgeScheduleTable = () => {
  const [selectedChamber, setSelectedChamber] = useState<string>("all");

  return (
    <>
      <JudgeFilterButton value={selectedChamber} onChange={setSelectedChamber}/>
      <div className="w-full max-w-6xl mx-auto px-4 mb-10">
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
          <table className="w-full text-left border-collapse">
            {/*Thead*/}
            <JudgeScheduleThead/>
            {/*Tbody*/}
            <JudgeScheduleTbody selectedChamber={selectedChamber}/>
          </table>
        </div>
      </div>
    </>
  );
};

export default JudgeScheduleTable;