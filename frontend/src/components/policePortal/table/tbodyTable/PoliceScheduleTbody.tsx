import { useEffect, useState } from "react";
import PoliceScheduleTableRow from "./PoliceScheduleTableRow";
import { getCases, type CaseItem } from "../../../../api/cases";
import { useCaseStatusUpdates } from "../../../../hooks/useCaseStatusUpdates";

interface PoliceScheduleTbodyProps {
  selectedChamber: string;
}

const PoliceScheduleTbody = ({ selectedChamber }: PoliceScheduleTbodyProps) => {
  const [sessions, setSessions] = useState<CaseItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useCaseStatusUpdates(setSessions);

  useEffect(() => {
    let ignore = false;

    const fetchFunction = async () => {
      try {
        const cases = await getCases();
        if (!ignore) {
          setSessions(cases);
        }
      } catch (err) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : "Onbekende fout");
        }
      }
    };

    fetchFunction();

    return () => {
      ignore = true;
    };
  }, []);

  // Filteren Kamers
  const filtered = selectedChamber === "all" ? sessions : sessions.filter((session) => session.chamber === selectedChamber);

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
        <PoliceScheduleTableRow
          key={session.id}
          hour={session.hour}
          chamber={session.chamber}
          caseNumber={session.caseNumber}
          determinationCode={session.determinationCode}
          status={session.status}
        />
      ))}
    </tbody>
  );
};

export default PoliceScheduleTbody;