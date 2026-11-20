import type { UserRole } from "../types";

const baseUrl = `${import.meta.env.VITE_KEYCLOAK_URL}/admin/realms/${import.meta.env.VITE_KEYCLOAK_REALM}`;

export const hvbaRoles: UserRole[] = [
  "admin",
  "justitie",
  "politie",
  "gebruiker",
];

export interface NewUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface KeyCloakUser {
  id: string;
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  enabled: boolean;
}

interface KeyCloakRole {
  id: string;
  name: string;
}

const request = async (
  token: string,
  path: string,
  method = "GET",
  body?: unknown,
) => {
  const response = await fetch(`${baseUrl}${path}`, {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response;
};

export const getUsers = async (token: string): Promise<KeyCloakUser[]> => {
  const response = await request(token, "/users?max=1000");
  return response.json();
};

export const getUserIdsWithRole = async (
  token: string,
  role: UserRole,
): Promise<string[]> => {
  const response = await request(token, `/roles/${role}/users?max=1000`);
  const users: KeyCloakUser[] = await response.json();
  return users.map((user) => user.id);
};

const getRole = async (
  token: string,
  role: UserRole,
): Promise<KeyCloakRole> => {
  const response = await request(token, `/roles/${role}`);
  return response.json();
};

export const setUserRole = async (
  token: string,
  userId: string,
  newRole: UserRole,
) => {
  const rolesToAdd: KeyCloakRole[] = [];
  const rolesToRemove: KeyCloakRole[] = [];

  for (const roleName of hvbaRoles) {
    const role = await getRole(token, roleName);
    if (roleName == newRole) {
      rolesToAdd.push(role);
    } else {
      rolesToRemove.push(role);
    }
  }

  await request(
    token,
    `/users/${userId}/role-mappings/realm`,
    "POST",
    rolesToAdd,
  );
  await request(
    token,
    `/users/${userId}/role-mappings/realm`,
    "DELETE",
    rolesToRemove,
  );
};

export const setUserEnabled = async (
  token: string,
  userId: string,
  enabled: boolean,
) => {
  const response = await request(token, `/users/${userId}`);
  const user: KeyCloakUser = await response.json();
  await request(token, `/users/${userId}`, "PUT", {
    ...user,
    enabled: enabled,
  });
};

export const createUser = async (
  token: string,
  newUser: NewUser,
): Promise<string> => {
  await request(token, "/users", "POST", {
    username: newUser.email,
    email: newUser.email,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    enabled: true,
    emailVerified: true,
    credentials: [
      { type: "password", value: newUser.password, temporary: true },
    ],
  });

  const response = await request(
    token,
    `/users?email=${encodeURIComponent(newUser.email)}&exact=true`,
  );
  const users: KeyCloakUser[] = await response.json();
  const userId = users[0].id;

  await setUserRole(token, userId, newUser.role);
  return userId;
};
