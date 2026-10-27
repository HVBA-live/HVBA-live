
import { useState } from "react";

type EmailTemplate = { id: string; label: string; subject: string; body: string };

const initialTemplates: EmailTemplate[] = [
  {
    id: "confirmation",
    label: "E-mailadres bevestigen",
    subject: "Bevestig uw e-mailadres",
    body: `Beste,

Bedankt voor uw registratie bij HVBA Live.
Om uw account te activeren, klikt u op onderstaande link om uw e-mailadres te bevestigen:

[Bevestig mijn e-mailadres]

Als u deze aanvraag niet heeft gedaan, kunt u deze e-mail negeren.

Met vriendelijke groet,
Het HVBA Live-team`
  },
  {
    id: "reset",
    label: "Wachtwoord resetten",
    subject: "Wachtwoord resetten",
    body: `Wachtwoord resetten

Klik op de onderstaande link om het wachtwoord van uw account te resetten:

[Wachtwoord resetten]

Als u deze aanvraag niet zelf hebt gedaan, kunt u deze e-mail veilig negeren. Uw wachtwoord wordt niet gewijzigd tenzij u de bovenstaande link gebruikt.

Met vriendelijke groet,
HVBA Live`
  },
  {
    id: "new-password",
    label: "Nieuw wachtwoord",
    subject: "Uw nieuw wachtwoord",
    body: `Uw nieuw wachtwoord
Hier is uw nieuw gegenereerd wachtwoord:

[WACHTWOORD]

U kunt nu inloggen op [hvba-live.be.]`
  },
];

const notificationOptions = [
  "Bij het starten van een zaak",
  "Wanneer een zaak als volledig wordt aangeduid",
  "Bij het herstarten van een zaak"
];

export default function NotificationSettings() {
  const [checked, setChecked] = useState([true, true, true]);
  const [templates, setTemplates] = useState(initialTemplates);
  const [saved, setSaved] = useState(false);

  const updateTemplate = (id: string, field: "subject" | "body", value: string) => {
    setTemplates(old => old.map(t => t.id === id ? { ...t, [field]: value } : t));
    setSaved(false);
  };

  return <div className="w-full font-[Arial,Helvetica,sans-serif] text-[#07376c]">
    <h2 className="mt-5 mb-4.5 flex items-center gap-2.5 text-base font-semibold sm:text-lg">
      <span className="text-2xl text-[#0072b7]">♧</span>
      Notificatie instellingen
    </h2>

    <section className="rounded-lg border border-[#d8e2ef] bg-white p-4.5 shadow-sm sm:p-6">
      <h2 className="mb-5 flex items-center text-xl font-semibold sm:text-[23px]">
        Wanneer notificaties versturen?
      </h2>

      <div className="flex flex-col gap-4">
        {notificationOptions.map((option, i) =>
          <label
            className="flex w-fit cursor-pointer items-center gap-2.25 text-xs font-semibold sm:text-sm"
            key={option}
          >
            <input
              type="checkbox"
              className="peer absolute h-px w-px opacity-0"
              checked={checked[i]}
              onChange={() => {
                setChecked(old => old.map((v, index) => index === i ? !v : v));
                setSaved(false);
              }}
            />
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[5px] border border-[#b9cde1] bg-white text-[19px] text-white transition-colors peer-checked:border-[#006bac] peer-checked:bg-[#006bac] peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#90c8ff]">
              {checked[i] ? "✓" : ""}
            </span>
            <span>{option}</span>
          </label>
        )}
      </div>
    </section>

    <div className="my-4 rounded-lg border border-[#d8e2ef] bg-[#f9fbfd] p-4 text-sm leading-[1.6] text-[#617c9e] sm:px-6 sm:py-6.25">
      <strong className="font-bold">Let op:</strong> Deze instellingen bepalen wanneer gebruikers automatisch notificaties ontvangen voor zaken waar zij zich voor hebben ingeschreven.
    </div>

    <section className="rounded-lg border border-[#d8e2ef] bg-white px-3.5 pt-6.25 pb-4.5 shadow-sm sm:px-6 sm:pt-12 sm:pb-6">
      <h2 className="mb-9 text-xl font-semibold sm:text-[23px]">
        E-mail bericht veranderen
      </h2>

      {templates.map(template =>
        <div className="mb-6.5" key={template.id}>
          <h3 className="mb-5 text-base font-semibold">{template.label}</h3>

          <label
            htmlFor={`${template.id}-subject`}
            className="my-3 mb-2.25 block text-sm font-semibold"
          >
            Onderwerp
          </label>

          <input
            id={`${template.id}-subject`}
            className="block h-10.5 w-full rounded-md border border-[#d8e2ef] bg-white px-3.25 text-sm text-[#07376c] focus:border-[#006bac] focus:outline-2 focus:outline-[#b7d9f3]"
            value={template.subject}
            onChange={e => updateTemplate(template.id, "subject", e.target.value)}
          />

          <label
            htmlFor={`${template.id}-body`}
            className="mt-3 mb-2.25 block text-sm font-semibold"
          >
            E-mail bericht
          </label>

          <textarea
            id={`${template.id}-body`}
            className="block min-h-55 w-full resize-y rounded-md border border-[#d8e2ef] bg-white p-3.25 text-sm leading-[1.6] text-[#07376c] focus:border-[#006bac] focus:outline-2 focus:outline-[#b7d9f3] sm:min-h-65"
            value={template.body}
            onChange={e => updateTemplate(template.id, "body", e.target.value)}
          />
        </div>
      )}

      <button
        type="button"
        className="mt-4.5 block h-11 w-full cursor-pointer rounded-md bg-[#006bac] text-sm font-semibold text-white shadow-[0_5px_15px_rgba(0,85,150,0.12)] transition-colors hover:bg-[#00558c] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#006db3]"
        onClick={() => setSaved(true)}
      >
        Opslaan
      </button>

      {saved && <p className="mt-3.5 rounded-md bg-[#e7f8ed] px-3.5 py-3 text-[13px] text-[#167443]" role="status">
        ✓ Wijzigingen bevestigd.
      </p>}
    </section>
  </div>;
}
