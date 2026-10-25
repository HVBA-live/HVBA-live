import { useRef, useState } from "react";
import "./AdminExtras.css";

export default function ImportCases() {
  const fileInput = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  
  return <div className="admin-extra-page">
    <h2 className="extra-section-title"><span>⇧</span> Importeer zaken</h2>
    <section className="extra-card">
        <h2 className="extra-card-title"><span>⇧</span> CSV Import</h2>
        <p className="extra-description">Upload een CSV bestand met puntkomma (;) gescheiden velden:</p>
        <ul className="csv-requirements">
            <li>Kamer (bijv. B4E3)</li>
            <li>Datum (DD-MM-YYYY formaat)</li>
            <li>Uur (HH:MM formaat)</li>
            <li>Code van vaststelling</li>
            <li>Rolnummer</li>
        </ul>
        <input ref={fileInput} type="file" accept=".csv,text/csv" hidden onChange={e => setFileName(e.target.files?.[0]?.name ?? "")}/>
        <button type="button" className="csv-upload-zone" onClick={() => fileInput.current?.click()}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/>
                <path d="M14 2v6h6M8 13h8M8 17h8"/>
            </svg>
            <span>{fileName || "Klik om CSV bestand te selecteren"}</span>
            {fileName && <small>Bestand geselecteerd</small>}
        </button>
        <div className="csv-example">
            <div className="csv-example-title">ⓘ &nbsp; Voorbeeld CSV formaat:</div>
            <pre>
                {`B4E3;26-09-2025;09:00;747§2 al.3 Ger.W.;2024/AR/1835
                B4E3;26-09-2025;11:30;612§1 Ger.W.;2024/AR/1836`}
            </pre>
        </div>
    </section>
  </div>;
}