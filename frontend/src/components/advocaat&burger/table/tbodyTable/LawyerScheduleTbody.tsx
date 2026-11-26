import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import LawyerScheduleTableRow from "./LawyerScheduleTableRow";
import { getCases, toggleCaseSubscription, type CaseItem } from "../../../../api/cases";
import { useCaseStatusUpdates } from "../../../../hooks/useCaseStatusUpdates";

interface LawyerScheduleTbodyProps {
  selectedChamber: string;
}

const LawyerScheduleTbody = ({ selectedChamber }: LawyerScheduleTbodyProps) => {
  const auth = useAuth();
  const userId = auth.user?.profile.sub;
  const accessToken = auth.user?.access_token;

  const [sessions, setSessions] = useState<CaseItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useCaseStatusUpdates(setSessions);

  useEffect(() => {
    if (auth.isLoading) return;
    let ignore = false;

    const fetchFunction = async () => {
      try {
        const cases = await getCases(userId, accessToken);
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
  }, [auth.isLoading, userId, accessToken]);

  const handleToggleSubscription = async (caseId: number) => {
    try {
      const result = await toggleCaseSubscription(caseId, userId, accessToken);
      setSessions((current) =>
        current.map((session) =>
          session.id === caseId
            ? {
                ...session,
                isSubscribed: result.isSubscribed,
                subscriberCount: result.subscriberCount,
              }
            : session
        )
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "Abonneren mislukt");
    }
  };

  const filtered =
    selectedChamber === "all"
      ? sessions
      : sessions.filter((session) => session.chamber === selectedChamber);

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
          key={session.id}
          id={session.id}
          hour={session.hour}
          chamber={session.chamber}
          caseNumber={session.caseNumber}
          determinationCode={session.determinationCode}
          status={session.status}
          isSubscribed={session.isSubscribed}
          onToggleSubscribe={handleToggleSubscription}
        />
      ))}
    </tbody>
  );
};

export default LawyerScheduleTbody;