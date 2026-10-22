export type UserRole = "admin" | "justitie" | "gebruiker" | "politie";

export type NotificationPreference = "sms" | "whatsapp";

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
