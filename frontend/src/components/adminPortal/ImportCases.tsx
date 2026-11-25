import { useRef, useState } from "react";
import { importCasesCsv, type CsvImportResult } from "../../api/cases"; // pas het relatieve pad aan indien nodig

export default function ImportCases() {
  const fileInput = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<CsvImportResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setSelectedFile(file);
    setResult(null);
    setErrorMessage(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setErrorMessage(null);
    setResult(null);

    try {
      const importResult = await importCasesCsv(selectedFile);
      setResult(importResult);
      setSelectedFile(null);
      if (fileInput.current) {
        fileInput.current.value = "";
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Onbekende fout bij het importeren.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full font-[Arial,Helvetica,sans-serif] text-[#07376c]">
      <h2 className="mt-5 mb-4.5 flex items-center gap-2.5 text-base font-semibold sm:text-lg">
        <span className="text-2xl text-[#0072b7]">⇧</span>
        Importeer zaken
      </h2>

      <section className="rounded-lg border border-[#d8e2ef] bg-white p-4.5 shadow-sm sm:p-6">
        <h2 className="mb-5.5 flex items-center gap-2.5 text-xl font-semibold sm:text-[23px]">
          <span className="text-[25px]">⇧</span>
          CSV Import
        </h2>

        <p className="mb-3 text-sm text-[#5d789c]">
          Upload een CSV bestand met puntkomma (;) gescheiden velden:
        </p>

        <ul className="mb-4.5 list-disc pl-5 text-sm leading-[1.75] text-[#5d789c]">
          <li className="pl-px">Kamer (bijv. B4E3)</li>
          <li className="pl-px">Datum (DD-MM-YYYY formaat)</li>
          <li className="pl-px">Uur (HH:MM formaat)</li>
          <li className="pl-px">Code van vaststelling</li>
          <li className="pl-px">Rolnummer</li>
        </ul>

        <input
          ref={fileInput}
          type="file"
          accept=".csv,text/csv"
          hidden
          onChange={handleFileChange}
        />

        <button
          type="button"
          className="flex min-h-25 w-full cursor-pointer flex-col items-center justify-center gap-2.25 rounded-lg border-2 border-dashed border-[#e6edf6] bg-white p-4 text-sm font-semibold transition-colors hover:border-[#006db3] hover:bg-[#f8fbff] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#006db3] sm:min-h-28"
          onClick={() => fileInput.current?.click()}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
            className="text-[#657f9e]"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
            <path d="M14 2v6h6M8 13h8M8 17h8" />
          </svg>

          <span>{selectedFile?.name || "Klik om CSV bestand te selecteren"}</span>
          {selectedFile && (
            <small className="text-xs font-normal text-[#607d9d]">
              Bestand geselecteerd
            </small>
          )}
        </button>

        {selectedFile && (
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              disabled={isUploading}
              onClick={handleUpload}
              className="cursor-pointer rounded-md bg-[#006db3] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#005792] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isUploading ? "Bezig met importeren..." : "Bestand importeren"}
            </button>
          </div>
        )}

        {errorMessage && (
          <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        {result && (
          <div className="mt-4 rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-800">
            <p className="font-semibold">
              Import voltooid: {result.totalProcessed} zaken verwerkt ({result.created} nieuw, {result.updated} bijgewerkt).
            </p>
            {result.errors.length > 0 && (
              <ul className="mt-2 list-disc pl-5 text-xs text-amber-800">
                {result.errors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div className="mt-4 rounded-[7px] bg-[#f8fafc] px-3.25 py-3.75">
          <div className="mb-1.25 flex items-center gap-2 text-[13px] text-[#b94d00]">
            ⓘ &nbsp; Voorbeeld CSV formaat:
          </div>

          <pre className="m-0 ml-0 whitespace-pre-wrap break-words font-mono text-[11px] leading-normal text-[#07376c] sm:ml-5 sm:text-xs">
            {`B4E3;26-09-2025;09:00;747§2 al.3 Ger.W.;2024/AR/1835\nB4E3;26-09-2025;11:30;612§1 Ger.W.;2024/AR/1836`}
          </pre>
        </div>
      </section>
    </div>
  );
}