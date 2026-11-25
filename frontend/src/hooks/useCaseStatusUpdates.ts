import { useEffect, type Dispatch, type SetStateAction } from "react";
import * as signalR from "@microsoft/signalr";
import type { CaseItem } from "../api/cases";

const apiUrl = import.meta.env.VITE_API_URL;

// luistert naar statuswijzigingen van de backend (SignalR) en past de lijst meteen aan
export const useCaseStatusUpdates = (setSessions: Dispatch<SetStateAction<CaseItem[]>>) => {
  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${apiUrl}/hubs/cases`)
      .withAutomaticReconnect()
      .build();

    // bericht van de backend: zaak {id} heeft nu status {status}
    connection.on("CaseStatusChanged", (id: number, status: string) => {
      setSessions((current) =>
        current.map((session) => (session.id === id ? { ...session, status } : session))
      );
    });

    // bericht van de backend: er is een CSV geïmporteerd, vervang de lijst live
    connection.on("CasesUpdated", (updatedCases: CaseItem[]) => {
      setSessions(updatedCases);
    });

    connection.start().catch((error) => {
      if (!(error instanceof signalR.AbortError)) {
        console.error("SignalR verbinding mislukt:", error);
      }
    });

    // cleanup: verbinding sluiten als de component verdwijnt
    return () => {
      connection.stop();
    };
  }, [setSessions]);
};
