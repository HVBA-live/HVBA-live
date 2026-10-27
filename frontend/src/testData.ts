import type { User, Agent} from "./types";

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

export const AgentUser: Agent = {
  id: "Agent1",
  username: "Agent 1",
  email: "Agent@Agent.be",
  role: "politie",
  notificationPreference: "whatsapp",
  isAcrive: true,
  createdAt: "2026-01-01"
};


