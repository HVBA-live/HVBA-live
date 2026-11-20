import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import ImportCases from "./ImportCases";
import NotificationSettings from "./NotificationSettings";
import CreateUserForm from "./CreateUserForm";
import type { UserRole } from "../../types";
import {
  createUser,
  getUsers,
  getUserIdsWithRole,
  hvbaRoles,
  setUserEnabled,
  setUserRole,
} from "../../api/keycloakAdmin";
import type { NewUser } from "../../api/keycloakAdmin";

type AdminTab = "manage" | "import" | "notifications";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  initials: string;
  role: UserRole;
  active: boolean;
}

const roleLabels: Record<UserRole, string> = {
  admin: "Admin",
  justitie: "Justitie",
  politie: "Politie",
  gebruiker: "Gebruiker",
};

const roleColors: Record<UserRole, string> = {
  admin: "border-[#e5c7ff] bg-[#f3e5ff] text-[#8b00e8]",
  justitie: "border-[#b7d5ff] bg-[#e0edff] text-[#0053d6]",
  politie: "border-[#fde68a] bg-[#fef3c7] text-[#b45309]",
  gebruiker: "border-[#a7f3c4] bg-[#dcfce7] text-[#008044]",
};

const SearchIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="m16 16 5 5" />
  </svg>
);

const UsersIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    aria-hidden="true"
  >
    <circle cx="9" cy="7" r="4" />
    <path d="M2 21v-2a7 7 0 0 1 14 0v2M17 3.2a4 4 0 0 1 0 7.6M22 21v-2a7 7 0 0 0-4-6.3" />
  </svg>
);

const AdminPanel = () => {
  const auth = useAuth();
  const myId = auth.user?.profile.sub;

  const [activeTab, setActiveTab] = useState<AdminTab>("manage");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sort, setSort] = useState("name");
  const [settingsFor, setSettingsFor] = useState<string | null>(null);

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    let ignore = false;

    const fetchFunction = async () => {
      const token = auth.user?.access_token;
      if (!token) return;

      try {
        const keycloakUsers = await getUsers(token);

        const idsPerRole: string[][] = [];
        for (const role of hvbaRoles) {
          idsPerRole.push(await getUserIdsWithRole(token, role));
        }

        const result: AdminUser[] = keycloakUsers.map((user) => {
          const firstName = user.firstName ?? "";
          const lastName = user.lastName ?? "";
          const name = `${firstName} ${lastName}`.trim() || user.username;

          const roleIndex = idsPerRole.findIndex((ids) =>
            ids.includes(user.id),
          );

          return {
            id: user.id,
            name: name,
            email: user.email ?? "",
            initials:
              (firstName.charAt(0) + lastName.charAt(0)).toUpperCase() ||
              name.charAt(0).toUpperCase(),
            role: roleIndex === -1 ? "gebruiker" : hvbaRoles[roleIndex],
            active: user.enabled,
          };
        });

        if (!ignore) {
          setUsers(result);
        }
      } catch {
        if (!ignore) {
          setError("Kon de gebruikers niet ophalen");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchFunction();

    return () => {
      ignore = true;
    };
  }, []);

  const changeRole = async (user: AdminUser, newRole: UserRole) => {
    const token = auth.user?.access_token;
    if (!token) return;

    setUpdatingId(user.id);
    setError(null);
    try {
      await setUserRole(token, user.id, newRole);
      setUsers((old) =>
        old.map((u) => (u.id === user.id ? { ...u, role: newRole } : u)),
      );
    } catch {
      setError(`Kon de rol van ${user.name} niet aanpassen`);
    } finally {
      setUpdatingId(null);
    }
  };

  const toggleActive = async (user: AdminUser) => {
    const token = auth.user?.access_token;
    if (!token) return;

    setUpdatingId(user.id);
    setError(null);
    try {
      await setUserEnabled(token, user.id, !user.active);
      setUsers((old) =>
        old.map((u) => (u.id === user.id ? { ...u, active: !user.active } : u)),
      );
    } catch {
      setError(
        `Kon ${user.name} niet ${user.active ? "deactiveren" : "activeren"}.`,
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const handleCreate = async (newUser: NewUser) => {
    const token = auth.user?.access_token;
    if (!token) return;

    setCreating(true);
    setError(null);
    try {
      const id = await createUser(token, newUser);
      const name = `${newUser.firstName} ${newUser.lastName}`.trim();

      setUsers((old) => [
        ...old,
        {
          id: id,
          name: name,
          email: newUser.email,
          initials: (
            newUser.firstName.charAt(0) + newUser.lastName.charAt(0)
          ).toUpperCase(),
          role: newUser.role,
          active: true,
        },
      ]);
    } catch (err) {
      if ((err as Error).message.includes("409")) {
        setError("Er bestaat al een gebruiker met dit e-mailadres.");
      } else {
        setError("Kon de gebruiker niet aanmaken.");
      }
    } finally {
      setCreating(false);
    }
  };

  const visibleUsers = users
    .filter((user) => {
      return (
        (user.name + " " + user.email)
          .toLowerCase()
          .includes(search.toLowerCase()) &&
        (roleFilter === "all" || user.role === roleFilter) &&
        (statusFilter === "all" ||
          (statusFilter === "active" ? user.active : !user.active))
      );
    })
    .sort((a, b) =>
      sort === "email"
        ? a.email.localeCompare(b.email)
        : a.name.localeCompare(b.name),
    );

  return (
    <div className="min-h-screen bg-white font-[Arial,Helvetica,sans-serif] text-sm text-[#07376c]">
      <main className="px-3 pt-5 pb-7.5 sm:px-4.75 sm:pt-6">
        <h1 className="mb-5 flex items-center justify-center gap-2.5 text-[19px] font-bold text-[#006db3] sm:mb-6.25 sm:text-[21px]">
          <svg
            className="h-6.25 w-6.25"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path d="M12 3 20 6v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-3Z" />
          </svg>
          Adminpaneel
        </h1>

        <nav
          className="mb-4.25 grid h-auto grid-cols-3 rounded-md bg-[#f0f4f9] sm:h-10"
          aria-label="Admin navigatie"
        >
          {(
            [
              ["manage", "Beheren"],
              ["import", "Importeer zaken"],
              ["notifications", "Notificatie beheer"],
            ] as const
          ).map(([tab, label]) => (
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
          ))}
        </nav>

        {activeTab === "manage" && (
          <>
            <section className="mb-4.25">
              <label
                htmlFor="user-search"
                className="mb-2.25 flex items-center gap-2 font-semibold"
              >
                <span className="h-4 w-4 text-[#0075bb]">
                  <SearchIcon />
                </span>
                Zoek op naam
              </label>

              <input
                id="user-search"
                className="block h-10.25 w-full rounded-md border border-[#d7e1ed] bg-white px-3 text-[#07376c] placeholder:text-[#7790b0]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Zoek gebruikers..."
              />
            </section>

            <section className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <label className="flex flex-col gap-2.5 font-semibold">
                Rol
                <select
                  className="h-11 w-full rounded-md border border-[#d7e1ed] bg-white px-3 font-normal text-[#174575]"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <option value="all">Alle rollen</option>
                  {hvbaRoles.map((role) => (
                    <option key={role} value={role}>
                      {roleLabels[role]}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2.5 font-semibold">
                Status
                <select
                  className="h-11 w-full rounded-md border border-[#d7e1ed] bg-white px-3 font-normal text-[#174575]"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
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
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="name">Naam</option>
                  <option value="email">E-mail</option>
                </select>
              </label>
            </section>

            <div className="mb-4 flex flex-wrap items-center gap-2.25">
              <div className="flex items-center gap-2.25 whitespace-nowrap text-base font-semibold sm:text-lg">
                <span className="h-5.25 w-5.25 text-[#0075bb]">
                  <UsersIcon />
                </span>
                Alle gebruikers
                <span className="inline-flex h-5.75 min-w-8 items-center justify-center rounded-full bg-[#07376c] px-1.75 text-xs text-white">
                  {visibleUsers.length}
                </span>
              </div>

              <button
                className="h-11 cursor-pointer whitespace-nowrap rounded-md bg-[#006db3] px-4.25 font-semibold text-white shadow-[0_5px_15px_rgba(0,85,150,0.12)] hover:bg-[#00558c]"
                type="button"
                onClick={() => setShowCreateForm(!showCreateForm)}
              >
                Maak gebruiker
              </button>
            </div>

            {showCreateForm && (
              <CreateUserForm
                roleLabels={roleLabels}
                saving={creating}
                onSave={handleCreate}
                onCancel={() => setShowCreateForm(false)}
              />
            )}

            {error && (
              <p className="mb-4 text-sm font-semibold text-[#f34043]">
                {error}
              </p>
            )}

            <section className="flex flex-col gap-3">
              {loading && <p>Gebruikers laden...</p>}

              {!loading &&
                visibleUsers.map((user) => {
                  const inactive = !user.active;
                  const isMe = user.id === myId;
                  const updating = updatingId === user.id;

                  return (
                    <article
                      className="grid min-h-19.25 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-[#d8e2ef] bg-white p-3 sm:p-4 min-[651px]:grid-cols-[minmax(180px,1fr)_100px_100px] min-[651px]:gap-4 min-[1101px]:grid-cols-[minmax(220px,1.8fr)_110px_110px_minmax(365px,1.7fr)]"
                      key={user.id}
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#006bac] font-semibold text-white">
                          {user.initials}
                        </div>

                        <div className="min-w-0">
                          <div className="mb-075 text-sm font-semibold">
                            {user.name}
                            {isMe && " (jij)"}
                          </div>
                          <div className="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-[#6c83a2]">
                            {user.email}
                          </div>
                        </div>
                      </div>

                      <span
                        className={`col-start-1 row-start-2 inline-flex h-5.75 w-25 items-center justify-center whitespace-nowrap rounded-full border text-xs sm:col-auto sm:row-auto sm:w-auto ${roleColors[user.role]}`}
                      >
                        {roleLabels[user.role]}
                      </span>

                      <span
                        className={`col-start-2 row-start-2 inline-flex h-5.75 w-21.25 items-center justify-center whitespace-nowrap rounded-full text-xs font-semibold sm:col-auto sm:row-auto sm:w-auto ${
                          inactive
                            ? "bg-[#e5e7eb] text-[#374151]"
                            : "bg-[#006bac] text-white"
                        }`}
                      >
                        {inactive ? "Inactief" : "Actief"}
                      </span>

                      <div className="col-span-full flex min-w-0 flex-wrap items-center gap-2 sm:justify-start sm:pl-13 min-[1101px]:col-auto min-[1101px]:justify-end min-[1101px]:gap-4 min-[1101px]:pl-0">
                        <select
                          className="h-11 min-w-25 max-w-none flex-[1_1_100%] rounded-md border border-[#d7e1ed] bg-white px-3 text-[#174575] disabled:cursor-not-allowed disabled:opacity-50 sm:max-w-36.25 sm:flex-[0_1_145px] min-[1101px]:flex-1"
                          aria-label={`Rol van ${user.name}`}
                          value={user.role}
                          disabled={updating || isMe}
                          onChange={(e) =>
                            changeRole(user, e.target.value as UserRole)
                          }
                        >
                          {hvbaRoles.map((role) => (
                            <option key={role} value={role}>
                              {roleLabels[role]}
                            </option>
                          ))}
                        </select>

                        <button
                          type="button"
                          disabled={updating || isMe}
                          className={`flex h-11 flex-[1_1_150px] cursor-pointer items-center justify-center whitespace-nowrap rounded-md px-3 text-[13px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 min-[1101px]:flex-[0_0_160px] ${
                            inactive
                              ? "bg-[#006bac] hover:bg-[#00558c]"
                              : "bg-[#f34043] hover:bg-[#db3035]"
                          }`}
                          onClick={() => toggleActive(user)}
                        >
                          {inactive ? "Activeren" : "Deactiveren"}
                        </button>

                        <button
                          type="button"
                          className="flex h-11 flex-[0_0_44px] cursor-pointer items-center justify-center rounded-md border border-[#d7e1ed] bg-white text-[#07376c] hover:bg-[#f0f4f9]"
                          aria-label={`Instellingen ${user.name}`}
                          onClick={() =>
                            setSettingsFor(
                              settingsFor === user.id ? null : user.id,
                            )
                          }
                        >
                          ⚙
                        </button>
                      </div>

                      {settingsFor === user.id && (
                        <div className="col-span-full text-sm text-[#617c9e]">
                          Instellingen voor {user.name} (demoweergave).
                        </div>
                      )}
                    </article>
                  );
                })}

              {!loading && visibleUsers.length === 0 && (
                <p>Geen gebruikers gevonden.</p>
              )}
            </section>
          </>
        )}

        <div className={activeTab === "import" ? "block" : "hidden"}>
          <ImportCases />
        </div>

        <div className={activeTab === "notifications" ? "block" : "hidden"}>
          <NotificationSettings />
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
