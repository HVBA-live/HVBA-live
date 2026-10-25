import type { User } from "./types";

// Tijdelijke testdata tot de backend er is
export const testUser: User = {
  id: "1",
  email: "jan.peeters@mail.be",
  firstName: "Jan",
  lastName: "Peeters",
  role: "gebruiker",
  notificationPreference: "whatsapp",
  isActive: true,
  createdAt: "2026-01-01",
};
