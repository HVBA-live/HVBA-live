export type UserRole = "admin" | "justitie" | "gebruiker" | "politie";
export type SessionStatus = "Bezig" | "Start binnenkort" | "Gepland";
export type NotificationPreference = "sms" | "whatsapp";

export interface StatusBadgeProps {
  status: SessionStatus | string;
}

export interface ScheduleTableRowProps {
  hour : string;
  chamber: string;
  caseNumber: string;
  determinationCode: string;
  status: string;
}

export interface FilterButtonprops {
  value: string;
  onChange: (value: string) => void;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phone?: string;
  notificationPreference?: NotificationPreference;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
  username?: string;
}

export interface Agent {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  phone?: string;
  notificationPreference?: NotificationPreference;
  isAcrive: boolean;
  createdAt: string;
  lastLogin?: string;
}
