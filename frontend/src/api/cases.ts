import type { ScheduleTableRowProps } from "../types";

export interface CaseItem extends ScheduleTableRowProps {
  id: number;
  date: string;
  subscriberCount: number;
  isSubscribed: boolean;
  isPoliceConfirmed: boolean;
}

export interface SubscriptionToggleResult {
  isSubscribed: boolean;
  subscriberCount: number;
}

export interface CsvImportResult {
  totalProcessed: number;
  created: number;
  updated: number;
  errors: string[];
}

const apiUrl = import.meta.env.VITE_API_URL;

export const getCases = async (
  userId?: string,
  accessToken?: string
): Promise<CaseItem[]> => {
  try {
    const query = userId ? `?userId=${encodeURIComponent(userId)}` : "";
    const headers: HeadersInit = {};
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const response = await fetch(`${apiUrl}/api/cases${query}`, { headers });

    if (!response.ok) {
      throw new Error(`Fout bij ophalen zaken: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("getCases mislukt:", error);
    throw new Error("Kan de zaken niet ophalen. Draait de backend?");
  }
};

export const toggleCaseSubscription = async (
  caseId: number,
  userId?: string,
  accessToken?: string
): Promise<SubscriptionToggleResult> => {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const response = await fetch(`${apiUrl}/api/cases/${caseId}/subscribe`, {
      method: "POST",
      headers,
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      throw new Error(`Fout bij abonneren: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("toggleCaseSubscription mislukt:", error);
    throw new Error("Kan abonnement niet wijzigen. Draait de backend?");
  }
};

export const togglePoliceConfirmation = async (
  caseId: number
): Promise<{ isPoliceConfirmed: boolean }> => {
  try {
    const response = await fetch(`${apiUrl}/api/cases/${caseId}/police-confirm`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error(`Fout bij politiebevestiging: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("togglePoliceConfirmation mislukt:", error);
    throw new Error("Kan bevestiging niet opslaan. Draait de backend?");
  }
};

export const updateCaseStatus = async (id: number, status: string): Promise<void> => {
  try {
    const response = await fetch(`${apiUrl}/api/cases/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error(`Fout bij aanpassen status: ${response.status}`);
    }
  } catch (error) {
    console.error("updateCaseStatus mislukt", error);
    throw new Error("Kan de status niet aanpassen. Draait de backend?");
  }
};

export const importCasesCsv = async (file: File): Promise<CsvImportResult> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${apiUrl}/api/cases/import`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || `Fout bij importeren CSV: ${response.status}`);
  }

  return await response.json();
};