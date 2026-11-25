import type { ScheduleTableRowProps } from "../types";

export interface CaseItem extends ScheduleTableRowProps{
    id: number,
    date: string,
}

export interface CsvImportResult {
  totalProcessed: number;
  created: number;
  updated: number;
  errors: string[];
}

const apiUrl = import.meta.env.VITE_API_URL;

export const getCases = async (): Promise<CaseItem[]> => {
  try {
    const response = await fetch(`${apiUrl}/api/cases`);

    // Backend antwoordt, maar met een foutcode (bv. 404 of 500)
    if (!response.ok) {
      throw new Error(`Fout bij ophalen zaken: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    // Ook als de backend niet bereikbaar is (niet gestart, CORS of certificaat)
    console.error("getCases mislukt:", error);
    throw new Error("Kan de zaken niet ophalen. Draait de backend?");
  }
};

export const updateCaseStatus = async (id: number, status: string): Promise<void> => {
  try {
    const response = await fetch(`${apiUrl}/api/cases/${id}/status`, {
      method: "PATCH",
      headers: {"Content-Type": "Application/json"},
      body: JSON.stringify({status}),
    });

    if (!response.ok) {
      throw new Error(`Fout bij aanpassen status: ${response.status}`);
    }
  } catch (error){
    console.error("updateCaseStatus mislukt", error);
    throw new Error("Kan de status niet aanpassen. Draait de backend?");
  }
}

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