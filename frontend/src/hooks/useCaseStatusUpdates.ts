import { useEffect, type Dispatch, type SetStateAction } from "react";
import * as signalR from "@microsoft/signalr";
import type { CaseItem } from "../api/cases";

const apiUrl = import.meta.env.VITE_API_URL;

export const useCaseStatusUpdates = (setSessions: Dispatch<SetStateAction<CaseItem[]>>) => {
  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${apiUrl}/hubs/cases`)
      .withAutomaticReconnect()
      .build();

    // Statuswijziging van een zaak
    connection.on("CaseStatusChanged", (id: number, status: string) => {
      setSessions((current) =>
        current.map((session) => (session.id === id ? { ...session, status } : session))
      );
    });

    // Live update van het aantal abonnees (voor Judge Portal)
    connection.on("CaseSubscriptionChanged", (id: number, subscriberCount: number) => {
      setSessions((current) =>
        current.map((session) =>
          session.id === id ? { ...session, subscriberCount } : session
        )
      );
    });

    // Live update van de politiebevestiging (OK-knop)
    connection.on("CasePoliceConfirmed", (id: number, isPoliceConfirmed: boolean) => {
      setSessions((current) =>
        current.map((session) =>
          session.id === id ? { ...session, isPoliceConfirmed } : session
        )
      );
    });

    // CSV-import
    connection.on("CasesUpdated", (updatedCases: CaseItem[]) => {
      setSessions(updatedCases);
    });

    connection.start().catch((error) => {
      if (!(error instanceof signalR.AbortError)) {
        console.error("SignalR verbinding mislukt:", error);
      }
    });

    return () => {
      connection.stop();
    };
  }, [setSessions]);
};