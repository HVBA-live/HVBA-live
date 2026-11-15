import LawyerScheduleTableRow from "./LawyerScheduleTableRow";
import type { ScheduleTableRowProps } from "../../../../types";
import { useEffect } from "react";
import { useState } from "react";
import { getCases, type CaseItem } from "../../../../api/cases";

interface LawyerScheduleTbodyProps {
  selectedChamber: string;
}

const LawyerScheduleTbody = ({selectedChamber}: LawyerScheduleTbodyProps) => {
  const [sessions, setSessions] = useState<CaseItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCases = async () => {
      try {
        const data = await getCases();
        setSessions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Onbekende fout");
      }
    };

    loadCases();
  }, []);

  const filtered = selectedChamber === "all" ? sessions : sessions.filter((sessionFilter) => sessionFilter.chamber === selectedChamber)

  if (error) {
    return (
      <tbody>
        <tr>
          <td colSpan={6} className="px-4 py-3.5 text-sm text-red-600">
            {error}
          </td>
        </tr>
      </tbody>
    );
  }

    return (
        <tbody className="text-sm">
          {filtered.map((session) => (
            <LawyerScheduleTableRow
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

export default LawyerScheduleTbody;