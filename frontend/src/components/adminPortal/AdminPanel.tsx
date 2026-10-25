import { useState } from "react";
import ImportCases from "./ImportCases";
import NotificationSettings from "./NotificationSettings";
import "./AdminPanel.css";

type AdminTab = "manage" | "import" | "notifications";

const users = [
  { initials: "AT", name: "A1 Test", email: "test@test.com", role: "Justitie", color: "justice" },
  { initials: "AT", name: "Account TEST", email: "testtest@gmail.test", role: "Gebruiker", color: "user" },
  { initials: "AU", name: "Admin User", email: "admin@admin.be", role: "Admin", color: "admin" },
];

const SearchIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/></svg>;
const UsersIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="9" cy="7" r="4"/><path d="M2 21v-2a7 7 0 0 1 14 0v2M17 3.2a4 4 0 0 1 0 7.6M22 21v-2a7 7 0 0 0-4-6.3"/></svg>;

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<AdminTab>("manage");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sort, setSort] = useState("name");
  const [inactiveEmails, setInactiveEmails] = useState<string[]>([]);
  const [roleOverrides, setRoleOverrides] = useState<Record<string, string>>({});
  const [settingsFor, setSettingsFor] = useState<string | null>(null);

  const visibleUsers = users.filter(user => {
    const role = roleOverrides[user.email] ?? user.role;
    const active = !inactiveEmails.includes(user.email);
    return (user.name + " " + user.email).toLowerCase().includes(search.toLowerCase()) &&
      (roleFilter === "all" || role === roleFilter) &&
      (statusFilter === "all" || (statusFilter === "active" ? active : !active));
  }).sort((a, b) => sort === "email" ? a.email.localeCompare(b.email) : a.name.localeCompare(b.name));

  return <div className="admin-page">
    <main className="admin-content">
      <h1 className="admin-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M12 3 20 6v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-3Z"/>
        </svg>
        Adminpaneel
      </h1>

      <nav className="admin-tabs" aria-label="Admin navigatie">
        <button type="button" className={`admin-tab ${activeTab === "manage" ? "active" : ""}`} onClick={() => setActiveTab("manage")}>Beheren</button>
        <button type="button" className={`admin-tab ${activeTab === "import" ? "active" : ""}`} onClick={() => setActiveTab("import")}>Importeer zaken</button>
        <button type="button" className={`admin-tab ${activeTab === "notifications" ? "active" : ""}`} onClick={() => setActiveTab("notifications")}>Notificatie beheer</button>
      </nav>

      {activeTab === "manage" && <>
        <section className="admin-search">
          <label htmlFor="user-search">
            <SearchIcon/>Zoek op naam
          </label>
          <input id="user-search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Zoek gebruikers..." />
        </section>
        <section className="admin-filters">
          <label className="admin-filter">
            Rol
            <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
              <option value="all">Alle rollen</option>
              <option>Justitie</option><option>Gebruiker</option>
              <option>Admin</option>
            </select>
          </label>
          <label className="admin-filter">
            Status
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              <option value="all">Alle statussen</option>
              <option value="active">Actief</option>
              <option value="inactive">Inactief</option>
            </select>
          </label>
          <label className="admin-filter">
            Sorteren
            <select value={sort} onChange={e => setSort(e.target.value)}>
              <option value="name">Naam</option>
              <option value="email">E-mail</option>
            </select>
          </label>
        </section>
        <div className="admin-list-heading">
          <div className="admin-list-title">
            <UsersIcon/>Alle gebruikers 
            <span className="user-count">{visibleUsers.length}</span>
          </div>
          <button className="create-user-button" type="button" >Maak gebruiker</button>
        </div>
        <section className="admin-user-list">{visibleUsers.map(user => {
          const role = roleOverrides[user.email] ?? user.role;
          const inactive = inactiveEmails.includes(user.email);
          return <article className="admin-user-card" key={user.email}>
            <div className="user-identity">
              <div className="user-avatar">{user.initials}</div>
              <div className="user-details">
                <div className="user-name">{user.name}</div>
                <div className="user-email">{user.email}</div>
              </div>
            </div>
            <span className={`role-badge ${role === "Admin" ? "admin" : role === "Justitie" ? "justice" : "user"}`}>{role}</span>
            <span className={`status-badge ${inactive ? "inactive" : ""}`}>{inactive ? "Inactief" : "Actief"}</span>
            <div className="user-card-actions">
              <select className="role-select" aria-label={`Rol van ${user.name}`} value={role} onChange={e => setRoleOverrides(old => ({...old, [user.email]: e.target.value}))}>
                <option>Justitie</option>
                <option>Gebruiker</option>
                <option>Admin</option>
              </select>
              <button type="button" className="deactivate-button" onClick={() => setInactiveEmails(old => inactive ? old.filter(x => x !== user.email) : [...old, user.email])}>{inactive ? "Activeren" : "Deactiveren"}</button>
              <button type="button" className="settings-button" aria-label={`Instellingen ${user.name}`} onClick={() => setSettingsFor(settingsFor === user.email ? null : user.email)}>⚙</button>
            </div>
            {settingsFor === user.email && <div className="user-settings-note">Instellingen voor {user.name} (demoweergave).</div>}
          </article>;
        })}{visibleUsers.length === 0 && <p>Geen gebruikers gevonden.</p>}</section>
      </>}
      <div style={{display: activeTab === "import" ? "block" : "none"}}><ImportCases/></div>
      <div style={{display: activeTab === "notifications" ? "block" : "none"}}><NotificationSettings/></div>
    </main>
  </div>;
}
