import JudgeScheduleTableRow from "./JudgeScheduleTableRow";
import type { ScheduleTableRowProps } from "../../../../types";

interface JudgeScheduleTbodyProps {
  selectedChamber: string;
}

const sessions : ScheduleTableRowProps[] = [
  {
    hour: "09:00",
    chamber: "B4E3",
    caseNumber: "2024/AR/1835",
    determinationCode: "747§2 al.3 Ger.W.",
    status: "Bezig"
  },
  {
    hour: "11:30",
    chamber: "B4E3",
    caseNumber: "2024/AR/1836",
    determinationCode: "612§1 Ger.W.",
    status: "Start binnenkort",
  },
  {
    hour: "14:00",
    chamber: "A2D1",
    caseNumber: "2024/AR/1837",
    determinationCode: "420 BW",
    status: "Gepland",
  },
  {
    hour: "16:30",
    chamber: "A2D1",
    caseNumber: "2024/AR/1838",
    determinationCode: "310§1 Sw.",
    status: "Gepland",
  },
];

const JudgeScheduleTbody = ({selectedChamber}: JudgeScheduleTbodyProps) => {
  const filtered = selectedChamber === "all" ? sessions : sessions.filter((sessionFilter) => sessionFilter.chamber === selectedChamber)
    return (
        <tbody className="text-sm">
          {filtered.map((session) => (
            <JudgeScheduleTableRow
              key={session.caseNumber}
              hour={session.hour}
              chamber={session.chamber}
              caseNumber={session.caseNumber}
              determinationCode={session.determinationCode}
              status={session.status}/>
          ))}
        </tbody>
    )
}

export default JudgeScheduleTbody;