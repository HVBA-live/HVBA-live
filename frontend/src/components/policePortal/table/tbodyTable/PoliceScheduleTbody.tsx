import { useEffect, useState } from "react";
import PoliceScheduleTableRow from "./PoliceScheduleTableRow";
import { getCases, togglePoliceConfirmation, type CaseItem } from "../../../../api/cases";
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

  const handleToggleConfirm = async (caseId: number) => {
    try {
      const result = await togglePoliceConfirmation(caseId);
      setSessions((current) =>
        current.map((session) =>
          session.id === caseId
            ? { ...session, isPoliceConfirmed: result.isPoliceConfirmed }
            : session
        )
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "Bevestigen mislukt");
    }
  };

  // Filteren Kamers
  const filtered =
    selectedChamber === "all"
      ? sessions
      : sessions.filter((session) => session.chamber === selectedChamber);

  if (error) {
    return (
      <tbody>
        <tr>
          <td colSpan={7} className="px-4 py-3.5 text-sm text-red-600">
            {error}
          </td>
        </tr>
      </tbody>
    );
  }

  // Volgnummer per kamer bijhouden (1, 2, ... per kamer)
  const chamberCounters: Record<string, number> = {};

  return (
    <tbody className="text-sm">
      {filtered.map((session) => {
        chamberCounters[session.chamber] =
          (chamberCounters[session.chamber] || 0) + 1;
        const rowNumber = chamberCounters[session.chamber];

        return (
          <PoliceScheduleTableRow
            key={session.id}
            id={session.id}
            rowNumber={rowNumber}
            hour={session.hour}
            chamber={session.chamber}
            caseNumber={session.caseNumber}
            determinationCode={session.determinationCode}
            status={session.status}
            isConfirmed={session.isPoliceConfirmed}
            onToggleConfirm={handleToggleConfirm}
          />
        );
      })}
    </tbody>
  );
};

export default PoliceScheduleTbody;