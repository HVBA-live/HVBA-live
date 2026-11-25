import { useEffect, useState } from "react";
import { getCases } from "../api/cases";

export const useChambers = () => {
  const [chambers, setChambers] = useState<string[]>([]);

  useEffect(() => {
    let ignore = false;

    const fetchFunction = async () => {
      try {
        const cases = await getCases();
        if (!ignore) {
          //elke kamer maar 1 keer, daarna alfabetisch sorteren
          const uniqueChambers = [...new Set(cases.map((caseItem) => caseItem.chamber))].sort();
          setChambers(uniqueChambers);
        }
      } catch {
        // de fout wordt al in de tabel getoond
      }
    };

    fetchFunction();

    return () => {
      ignore = true;
    };
  }, []);

  return chambers;
};