
import { useState } from "react";
import ImportCases from "./ImportCases";
import NotificationSettings from "./NotificationSettings";

type AdminTab = "manage" | "import" | "notifications";

const users = [
  { initials: "AT", name: "A1 Test", email: "test@test.com", role: "Justitie", color: "justice" },
  { initials: "AT", name: "Account TEST", email: "testtest@gmail.test", role: "Gebruiker", color: "user" },
  { initials: "AU", name: "Admin User", email: "admin@admin.be", role: "Admin", color: "admin" },
];

const SearchIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
  <circle cx="11" cy="11" r="7"/>
  <path d="m16 16 5 5"/>
</svg>;

const UsersIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
  <circle cx="9" cy="7" r="4"/>
  <path d="M2 21v-2a7 7 0 0 1 14 0v2M17 3.2a4 4 0 0 1 0 7.6M22 21v-2a7 7 0 0 0-4-6.3"/>
</svg>;

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

  return <div className="min-h-screen bg-white font-[Arial,Helvetica,sans-serif] text-sm text-[#07376c]">
    <main className="px-3 pt-5 pb-7.5 sm:px-4.75 sm:pt-6">
      <h1 className="mb-5 flex items-center justify-center gap-2.5 text-[19px] font-bold text-[#006db3] sm:mb-6.25 sm:text-[21px]">
        <svg className="h-6.25 w-6.25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M12 3 20 6v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-3Z"/>
        </svg>
        Adminpaneel
      </h1>

      <nav className="mb-4.25 grid h-auto grid-cols-3 rounded-md bg-[#f0f4f9] sm:h-10" aria-label="Admin navigatie">
        {([
          ["manage", "Beheren"],
          ["import", "Importeer zaken"],
          ["notifications", "Notificatie beheer"]
        ] as const).map(([tab, label]) =>
          <button
            key={tab}
            type="button"
            className={`flex min-h-11 cursor-pointer items-center justify-center rounded-md px-1 py-2 text-center text-[11px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006db3] sm:min-h-0 sm:text-sm ${
              activeTab === tab
                ? "border border-[#edf1f6] bg-white font-semibold text-[#07376c] shadow-sm"
                : "text-[#49678b] hover:bg-[#e8eff7]"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {label}
          </button>
        )}
      </nav>

      {activeTab === "manage" && <>
        <section className="mb-4.25">
          <label htmlFor="user-search" className="mb-2.25 flex items-center gap-2 font-semibold">
            <span className="h-4 w-4 text-[#0075bb]"><SearchIcon/></span>
            Zoek op naam
          </label>

          <input
            id="user-search"
            className="block h-10.25 w-full rounded-md border border-[#d7e1ed] bg-white px-3 text-[#07376c] placeholder:text-[#7790b0]"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Zoek gebruikers..."
          />
        </section>

        <section className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <label className="flex flex-col gap-2.5 font-semibold">
            Rol
            <select
              className="h-11 w-full rounded-md border border-[#d7e1ed] bg-white px-3 font-normal text-[#174575]"
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value)}
            >
              <option value="all">Alle rollen</option>
              <option>Justitie</option>
              <option>Gebruiker</option>
              <option>Admin</option>
            </select>
          </label>

          <label className="flex flex-col gap-2.5 font-semibold">
            Status
            <select
              className="h-11 w-full rounded-md border border-[#d7e1ed] bg-white px-3 font-normal text-[#174575]"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
            >
              <option value="all">Alle statussen</option>
              <option value="active">Actief</option>
              <option value="inactive">Inactief</option>
            </select>
          </label>

          <label className="flex flex-col gap-2.5 font-semibold">
            Sorteren
            <select
              className="h-11 w-full rounded-md border border-[#d7e1ed] bg-white px-3 font-normal text-[#174575]"
              value={sort}
              onChange={e => setSort(e.target.value)}
            >
              <option value="name">Naam</option>
              <option value="email">E-mail</option>
            </select>
          </label>
        </section>

        <div className="mb-4 flex flex-wrap items-center gap-2.25">
          <div className="flex items-center gap-2.25 whitespace-nowrap text-base font-semibold sm:text-lg">
            <span className="h-5.25 w-5.25 text-[#0075bb]"><UsersIcon/></span>
            Alle gebruikers
            <span className="inline-flex h-5.75 min-w-8 items-center justify-center rounded-full bg-[#07376c] px-1.75 text-xs text-white">
              {visibleUsers.length}
            </span>
          </div>

          <button
            className="h-11 cursor-pointer whitespace-nowrap rounded-md bg-[#006db3] px-4.25 font-semibold text-white shadow-[0_5px_15px_rgba(0,85,150,0.12)] hover:bg-[#00558c]"
            type="button"
          >
            Maak gebruiker
          </button>
        </div>

        <section className="flex flex-col gap-3">
          {visibleUsers.map(user => {
            const role = roleOverrides[user.email] ?? user.role;
            const inactive = inactiveEmails.includes(user.email);

            return <article
              className="grid min-h-19.25 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-[#d8e2ef] bg-white p-3 sm:p-4 min-[651px]:grid-cols-[minmax(180px,1fr)_100px_100px] min-[651px]:gap-4 min-[1101px]:grid-cols-[minmax(220px,1.8fr)_110px_110px_minmax(365px,1.7fr)]"
              key={user.email}
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#006bac] font-semibold text-white">
                  {user.initials}
                </div>

                <div className="min-w-0">
                  <div className="mb-075 text-sm font-semibold">{user.name}</div>
                  <div className="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-[#6c83a2]">
                    {user.email}
                  </div>
                </div>
              </div>

              <span className={`col-start-1 row-start-2 inline-flex h-5.75 w-25 items-center justify-center whitespace-nowrap rounded-full border text-xs sm:col-auto sm:row-auto sm:w-auto ${
                role === "Admin"
                  ? "border-[#e5c7ff] bg-[#f3e5ff] text-[#8b00e8]"
                  : role === "Justitie"
                    ? "border-[#b7d5ff] bg-[#e0edff] text-[#0053d6]"
                    : "border-[#a7f3c4] bg-[#dcfce7] text-[#008044]"
              }`}>
                {role}
              </span>

              <span className={`col-start-2 row-start-2 inline-flex h-5.75 w-21.25 items-center justify-center whitespace-nowrap rounded-full text-xs font-semibold sm:col-auto sm:row-auto sm:w-auto ${
                inactive ? "bg-[#e5e7eb] text-[#374151]" : "bg-[#006bac] text-white"
              }`}>
                {inactive ? "Inactief" : "Actief"}
              </span>

              <div className="col-span-full flex min-w-0 flex-wrap items-center gap-2 sm:justify-start sm:pl-13 min-[1101px]:col-auto min-[1101px]:justify-end min-[1101px]:gap-4 min-[1101px]:pl-0">
                <select
                  className="h-11 min-w-25 max-w-none flex-[1_1_100%] rounded-md border border-[#d7e1ed] bg-white px-3 text-[#174575] sm:max-w-36.25 sm:flex-[0_1_145px] min-[1101px]:flex-1"
                  aria-label={`Rol van ${user.name}`}
                  value={role}
                  onChange={e => setRoleOverrides(old => ({ ...old, [user.email]: e.target.value }))}
                >
                  <option>Justitie</option>
                  <option>Gebruiker</option>
                  <option>Admin</option>
                </select>

                <button
                  type="button"
                  className={`flex h-11 flex-[1_1_150px] cursor-pointer items-center justify-center whitespace-nowrap rounded-md px-3 text-[13px] font-semibold text-white min-[1101px]:flex-[0_0_160px] ${
                    inactive
                      ? "bg-[#006bac] hover:bg-[#00558c]"
                      : "bg-[#f34043] hover:bg-[#db3035]"
                  }`}
                  onClick={() => setInactiveEmails(old => inactive ? old.filter(x => x !== user.email) : [...old, user.email])}
                >
                  {inactive ? "Activeren" : "Deactiveren"}
                </button>

                <button
                  type="button"
                  className="flex h-11 flex-[0_0_44px] cursor-pointer items-center justify-center rounded-md border border-[#d7e1ed] bg-white text-[#07376c] hover:bg-[#f0f4f9]"
                  aria-label={`Instellingen ${user.name}`}
                  onClick={() => setSettingsFor(settingsFor === user.email ? null : user.email)}
                >
                  ⚙
                </button>
              </div>

              {settingsFor === user.email && <div className="col-span-full text-sm text-[#617c9e]">
                Instellingen voor {user.name} (demoweergave).
              </div>}
            </article>;
          })}

          {visibleUsers.length === 0 && <p>Geen gebruikers gevonden.</p>}
        </section>
      </>}

      <div className={activeTab === "import" ? "block" : "hidden"}>
        <ImportCases/>
      </div>

      <div className={activeTab === "notifications" ? "block" : "hidden"}>
        <NotificationSettings/>
      </div>
    </main>
  </div>;
}
