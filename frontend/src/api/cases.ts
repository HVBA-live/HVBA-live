import type { ScheduleTableRowProps } from "../types";

export interface CaseItem extends ScheduleTableRowProps {
    id: number,
    date: string,
}

const apiUrl = import.meta.env.VITE_API_URL;

// get /api/cases

export const getCases = async (): Promise<CaseItem[]> => {
    try {
        const response = await fetch(`${apiUrl}/api/cases`);

        if (!response.ok) {
            throw new Error(`Fout bij ophalen zaken: ${response.status}`);
        }

        return await response.json();
        
    } catch (error) {
        console.error("getCases mislukt", error);
        throw new Error("Kan de zaken niet ophalen. Draait de backend?");
    }
}