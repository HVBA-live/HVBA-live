# HVBA Live

Zittingsagenda van het hof van beroep Antwerpen.

| Onderdeel | Map | Technologie |
| --- | --- | --- |
| Frontend | `frontend/` | React, TypeScript, Vite, Tailwind |
| Backend | `Backend/` | ASP.NET Core |
| Login, registratie en rollen | `keycloak/` | Keycloak 26.8.1 met eigen HVBA-thema |

## Vereisten

- Docker Desktop
- VS Code met de extensie **Dev Containers**

## Eerste keer opstarten

### 1. Keycloak bouwen en starten

In een terminal op je eigen pc (niet in de dev container), in de hoofdmap van het project:

```bash
docker build -t hvba-keycloak ./keycloak
docker run -d --name keycloak -p 127.0.0.1:8080:8080 -e KC_BOOTSTRAP_ADMIN_USERNAME=admin -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin -v keycloak-data:/opt/keycloak/data hvba-keycloak
```

Bij de eerste start wordt de realm `hvba` automatisch geïmporteerd uit `keycloak/realm/hvba-realm.json`, met het thema, de rollen, de client en alle instellingen. Gebruikers en hun gegevens worden bewaard in het Docker-volume `keycloak-data`.

`admin`/`admin` is alleen voor lokaal gebruik.

### 2. Testgebruikers maken

1. Ga naar `http://localhost:8080` en log in met `admin`/`admin`.
2. Kies linksboven de realm **HVBA Live** (niet master).
3. **Users** → **Create new user**: vul e-mail, voornaam en achternaam in, en zet **Email verified** aan.
4. **Credentials** → **Set password**, met **Temporary** uit. Het wachtwoord moet aan de wachtwoordregels voldoen (zie verder).
5. **Role mapping** → **Assign role** → **Realm roles**: kies een rol.

Je kunt ook één admin maken op deze manier, en de andere testgebruikers aanmaken via het adminpaneel van de app.

### 3. Frontend-configuratie

Kopieer `frontend/.env.example` naar `frontend/.env`.

### 4. Frontend starten

1. Open de projectmap in VS Code → **Ctrl+Shift+P** → **Dev Containers: Reopen in Container**.
2. In de terminal van de container:

```bash
cd frontend
npm install
npm run dev
```

3. Open **exact** `http://localhost:5173`. Een ander adres of een andere poort wordt door Keycloak geweigerd.

Heb je ooit `npm install` op Windows gedaan? Verwijder dan eerst `node_modules` en installeer opnieuw in de dev container.

## Volgende keren

1. Start Docker Desktop.
2. Start Keycloak: in Docker Desktop of met `docker start keycloak`.
3. Open het project in de dev container en voer `npm run dev` uit in `frontend`.

## Na een pull met nieuwe Keycloak-instellingen

Is `keycloak/` veranderd (realm-export, thema), dan moet je Keycloak opnieuw opbouwen. De realm wordt alleen geïmporteerd als hij nog niet bestaat.

```bash
docker rm -f keycloak
docker volume rm keycloak-data
docker build -t hvba-keycloak ./keycloak
docker run -d --name keycloak -p 127.0.0.1:8080:8080 -e KC_BOOTSTRAP_ADMIN_USERNAME=admin -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin -v keycloak-data:/opt/keycloak/data hvba-keycloak
```

Je testgebruikers zijn daarna weg: maak ze opnieuw aan.

## Rollen en portalen

| Rol | Portaal |
| --- | --- |
| `gebruiker` | `/lawyer` (advocaat of burger; krijgt iedereen automatisch bij registratie) |
| `justitie` | `/judge` |
| `politie` | `/police` |
| `admin` | `/admin` |

Heeft iemand meerdere rollen, dan telt de belangrijkste: admin > justitie > politie > gebruiker. Na het inloggen word je automatisch naar je portaal gestuurd. Een andere pagina dan de jouwe intypen stuurt je terug.

## Wat Keycloak regelt

- **Inloggen, registreren, wachtwoord wijzigen, account verwijderen**, met pagina's in de HVBA-stijl (`keycloak/themes/hvba/login/`)
- **E-mail als gebruikersnaam**
- **Registratie**: voornaam, achternaam, telefoonnummer, meldingvoorkeur (sms of WhatsApp), e-mail en wachtwoord. Alle velden zijn verplicht.
- **Privacyvoorwaarden** in een pop-up bij registratie: eerst naar beneden scrollen, dan accepteren. De tekst staat in `messages_nl.properties` (`termsText`)
- **Wachtwoordregels**: minstens 12 tekens, een hoofdletter, een kleine letter en een cijfer, niet gelijk aan de gebruikersnaam of het e-mailadres, en de laatste 3 wachtwoorden niet opnieuw
- **Brute force detection**: na 5 foute pogingen wordt een account tijdelijk geblokkeerd (oplopend tot 15 minuten)
- **Token**: bevat naam, e-mail, rollen (`realm_access.roles`), telefoonnummer (`phone_number`) en meldingvoorkeur (`notification_preference`)

## Adminpaneel

Een admin kan op `/admin`:

- alle gebruikers zien, zoeken, filteren en sorteren
- een gebruiker aanmaken, met een tijdelijk wachtwoord en een rol
- de rol van een gebruiker wijzigen
- een account deactiveren of activeren
- via het tandwieltje de gegevens aanpassen en een wachtwoord instellen (eventueel tijdelijk)

Het adminpaneel gebruikt de Admin API van Keycloak (`frontend/src/api/keycloakAdmin.ts`). De rol `admin` heeft daarvoor de rollen `view-users`, `query-users`, `manage-users` en `view-realm` van `realm-management`.

De tabbladen **Importeer zaken** en **Notificatie beheer** wachten nog op de backend.

## Keycloak-instellingen wijzigen

1. Pas de instelling aan in de admin-console (realm **HVBA Live**).
2. Exporteer: **Realm settings** → **Action** → **Partial export** (groepen, rollen en clients aan).
3. Hernoem het gedownloade bestand naar `hvba-realm.json`, vervang `keycloak/realm/hvba-realm.json` en commit.

Het thema staat in `keycloak/themes/hvba/login/`. In de container die je met het image uit de `Dockerfile` start, zit het thema gekopieerd: na een wijziging moet je het image opnieuw bouwen.

### Mailpit (lokale mails)

Registreren vereist e-mailverificatie. Lokaal vangt Mailpit alle mails op, er wordt niets echt verstuurd.

```bash
docker run -d --name mailpit -p 127.0.0.1:8025:8025 -p 127.0.0.1:1025:1025 axllent/mailpit
```

Inbox: http://localhost:8025. Start Mailpit voor je je registreert, anders krijg je "Failed to send email".

Bij het online zetten (Render) moeten de SMTP-instellingen in Keycloak naar een echte mailprovider wijzen.

## Backend

```bash
cd Backend
dotnet run
```

## Veelvoorkomende problemen

| Probleem | Oplossing |
| --- | --- |
| Inloggen doet niets, `ERR_CONNECTION_REFUSED` op poort 8080 | Keycloak draait niet: `docker start keycloak` |
| Keycloak zegt "Invalid parameter: redirect_uri" | Open de app via exact `http://localhost:5173` (geen andere poort, geen `127.0.0.1`) |
| "Client not found" of de nieuwste instellingen ontbreken | Je Keycloak heeft een oude realm: bouw hem opnieuw op (zie hierboven) |
| In de console `undefined/realms/undefined` | `frontend/.env` ontbreekt: kopieer `.env.example` en herstart `npm run dev` |
| Inloggen lukt, maar je blijft op de landingspagina | Je testgebruiker heeft geen rol |
| "U bent in deze sessie al aangemeld" bij registreren | Log eerst uit, of open `http://localhost:8080/realms/hvba/protocol/openid-connect/logout` |
| Wit scherm in de app | Kijk in de console (F12) naar de rode foutmelding |
| Vite of Tailwind geeft fouten in de dev container | `node_modules` verwijderen en `npm install` in de container |
| "Workspace does not exist" bij openen in de container | Remote verbinding sluiten, de map opnieuw openen, **Rebuild and Reopen in Container** |

## Geheimen

Wachtwoorden en databasegegevens komen in een `.env`-bestand, en dat staat in `.gitignore`. `.env.example` toont welke variabelen nodig zijn. Zet nooit een wachtwoord of geheim in een variabele die met `VITE_` begint: die komt in de browser terecht.
