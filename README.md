# HVBA Live

Zittingsagenda van het hof van beroep Antwerpen.

| Onderdeel | Map | Technologie |
| --- | --- | --- |
| Frontend | `frontend/` | React, TypeScript, Vite, Tailwind |
| Backend | `Backend/` | ASP.NET Core |
| Login en rollen | `keycloak/` | Keycloak 26.8.1 (eigen HVBA-thema) |

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

De realm `hvba` (thema, rollen, client) wordt automatisch geïmporteerd uit `keycloak/realm/hvba-realm.json`. Gebruikers en instellingen blijven bewaard in het volume `keycloak-data`.

`admin`/`admin` is alleen voor lokaal gebruik.

### 2. Testgebruikers maken

1. Ga naar `http://localhost:8080` en log in met `admin`/`admin`.
2. Kies linksboven de realm **hvba**.
3. **Users → Create new user**: vul e-mail, voornaam en achternaam in en zet **Email verified** aan.
4. **Credentials → Set password**, met **Temporary** uit.
5. **Role mapping → Assign role**: kies een rol.

| Rol | Portaal |
| --- | --- |
| `gebruiker` | `/lawyer` (krijgt iedereen automatisch bij registratie) |
| `justitie` | `/judge` |
| `politie` | `/police` |
| `admin` | `/admin` |

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

3. Open `http://localhost:5173`.

Heb je ooit `npm install` op Windows gedaan? Verwijder dan eerst `node_modules` en installeer opnieuw in de dev container.

## Volgende keren

1. Start Docker Desktop.
2. Start Keycloak: in Docker Desktop of met `docker start keycloak`.
3. Open het project in de dev container en voer `npm run dev` uit in `frontend`.

## Backend

```bash
cd Backend
dotnet run
```

## Keycloak-instellingen wijzigen

1. Pas de instelling aan in de admin-console (realm `hvba`).
2. Exporteer: **Realm settings → Action → Partial export** (groepen, rollen en clients aan).
3. Vervang `keycloak/realm/hvba-realm.json` en commit.

Het thema staat in `keycloak/themes/hvba/login/`.

## Veelvoorkomende problemen

| Probleem | Oplossing |
| --- | --- |
| Inloggen doet niets, `ERR_CONNECTION_REFUSED` op poort 8080 | Keycloak draait niet: `docker start keycloak` |
| Vite of Tailwind geeft fouten in de dev container | `node_modules` verwijderen en `npm install` in de container |
| "Workspace does not exist" bij openen in de container | Remote verbinding sluiten, de map opnieuw openen, **Rebuild and Reopen in Container** |

## Geheimen

Wachtwoorden en databasegegevens komen in een `.env`-bestand, en dat staat in `.gitignore`. `.env.example` toont welke variabelen nodig zijn.
