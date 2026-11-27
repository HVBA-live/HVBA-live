import { useEffect, useState } from "react";
import JudgeScheduleTableRow from "./JudgeScheduleTableRow";
import { getCases, updateCaseStatus, type CaseItem } from "../../../../api/cases";
import { useCaseStatusUpdates } from "../../../../hooks/useCaseStatusUpdates";

interface JudgeScheduleTbodyProps {
  selectedChamber: string;
}

const JudgeScheduleTbody = ({ selectedChamber }: JudgeScheduleTbodyProps) => {
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

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await updateCaseStatus(id, status);

      setSessions((current) =>
        current.map((session) =>
          session.id === id ? { ...session, status } : session
        )
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "Onbekende fout");
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
          <td colSpan={9} className="px-4 py-3.5 text-sm text-red-600">
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
          <JudgeScheduleTableRow
            key={session.id}
            id={session.id}
            rowNumber={rowNumber}
            hour={session.hour}
            chamber={session.chamber}
            caseNumber={session.caseNumber}
            determinationCode={session.determinationCode}
            status={session.status}
            subscriberCount={session.subscriberCount}
            isPoliceConfirmed={session.isPoliceConfirmed}
            onStatusChange={handleStatusChange}
          />
        );
      })}
    </tbody>
  );
};

export default JudgeScheduleTbody;