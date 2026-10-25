import { useState } from "react";
import "./AdminExtras.css";

type EmailTemplate = { id: string; label: string; subject: string; body: string };
const initialTemplates: EmailTemplate[] = [
    {
        id: "confirmation", 
        label: "E-mailadres bevestigen", 
        subject: "Bevestig uw e-mailadres", 
        body: `Beste,\n\nBedankt voor uw registratie bij HVBA Live.\nOm uw account te activeren, klikt u op onderstaande link om uw e-mailadres te bevestigen:\n\n[Bevestig mijn e-mailadres]\n\nAls u deze aanvraag niet heeft gedaan, kunt u deze e-mail negeren.\n\nMet vriendelijke groet,\nHet HVBA Live-team`
    },
    {
        id: "reset", 
        label: "Wachtwoord resetten", 
        subject: "Wachtwoord resetten", 
        body: `Wachtwoord resetten\n\nKlik op de onderstaande link om het wachtwoord van uw account te resetten:\n\n[Wachtwoord resetten]\n\nAls u deze aanvraag niet zelf hebt gedaan, kunt u deze e-mail veilig negeren. Uw wachtwoord wordt niet gewijzigd tenzij u de bovenstaande link gebruikt.\n\nMet vriendelijke groet,\nHVBA Live`
    },
    {
        id: "new-password", 
        label: "Nieuw wachtwoord", 
        subject: "Uw nieuw wachtwoord", 
        body: `Uw nieuw wachtwoord\nHier is uw nieuw gegenereerd wachtwoord:\n\n[WACHTWOORD]\n\nU kunt nu inloggen op [hvba-live.be.]`
    },
];

const notificationOptions = ["Bij het starten van een zaak", "Wanneer een zaak als volledig wordt aangeduid", "Bij het herstarten van een zaak"];

export default function NotificationSettings() {
  const [checked, setChecked] = useState([true, true, true]);
  const [templates, setTemplates] = useState(initialTemplates);
  const [saved, setSaved] = useState(false);
  const updateTemplate = (id: string, field: "subject" | "body", value: string) => {setTemplates(old => old.map(t => t.id === id ? {...t, [field]: value} : t)); setSaved(false);};
  
  return <div className="admin-extra-page">
    <h2 className="extra-section-title">
        <span>♧</span> 
        Notificatie instellingen
    </h2>
    <section className="extra-card notification-card">
        <h2 className="extra-card-title">Wanneer notificaties versturen?</h2>
        <div className="notification-options">{notificationOptions.map((option, i) => 
            <label className="notification-option" key={option}>
                <input type="checkbox" checked={checked[i]} onChange={() => {setChecked(old => old.map((v, index) => index === i ? !v : v)); setSaved(false);}}/>
                <span className="custom-checkbox">{checked[i] ? "✓" : ""}</span>
                <span>{option}</span>
            </label>)}
        </div>
    </section>
    <div className="notification-info">
        <strong>Let op:</strong> Deze instellingen bepalen wanneer gebruikers automatisch notificaties ontvangen voor zaken waar zij zich voor hebben ingeschreven.
    </div>
    <section className="extra-card email-settings-card">
        <h2 className="extra-card-title">E-mail bericht veranderen</h2>
        {templates.map(template => 
            <div className="email-template" key={template.id}>
                <h3>{template.label}</h3>
                <label htmlFor={`${template.id}-subject`}>Onderwerp</label>
                <input id={`${template.id}-subject`} className="email-input" value={template.subject} onChange={e => updateTemplate(template.id, "subject", e.target.value)}/>
                <label htmlFor={`${template.id}-body`}>E-mail bericht</label>
                <textarea id={`${template.id}-body`} className="email-textarea" value={template.body} onChange={e => updateTemplate(template.id, "body", e.target.value)}/>    
            </div>)}
        <button type="button" className="save-settings-button" onClick={() => setSaved(true)}>Opslaan</button>
        {saved && <p className="save-confirmation" role="status">✓ Wijzigingen bevestigd.</p>}
    </section>
  </div>;
}
