import { Lucia, type Adapter, type DatabaseSession, type DatabaseUser } from "lucia";
import { prisma } from "./prisma";
import { cookies } from "next/headers";
import type { SessionResult, AuthResult } from "@/types/auth";

// Маппим Prisma <-> Lucia
function mapSession(s: any): DatabaseSession {
  return {
    id: s.id,
    userId: String(s.userId),
    expiresAt: s.expiresAt,
    attributes: {}
  };
}

function mapUser(u: any): DatabaseUser {
  return {
    id: String(u.id),
    attributes: {}
  };
}

const luciaPrismaAdapter: Adapter = {
  getUserSessions: async (userId: string): Promise<DatabaseSession[]> => {
    const sessions = await prisma.session.findMany({
      where: { userId: Number(userId) }
    });
    return sessions.map(mapSession);
  },

  getSessionAndUser: async (
    sessionId: string
  ): Promise<[DatabaseSession | null, DatabaseUser | null]> => {
    const session = await prisma.session.findUnique({ where: { id: sessionId } });
    if (!session) return [null, null];

    const user = await prisma.user.findUnique({ where: { id: session.userId } });
    return [mapSession(session), user ? mapUser(user) : null];
  },

  setSession: async (session: DatabaseSession): Promise<void> => {
    await prisma.session.create({
      data: {
        id: session.id,
        userId: Number(session.userId),
        expiresAt: session.expiresAt
      }
    });
  },

  deleteSession: async (sessionId: string): Promise<void> => {
    await prisma.session.delete({ where: { id: sessionId } });
  },

  updateSessionExpiration: async (sessionId: string, expiresAt: Date): Promise<void> => {
    await prisma.session.update({
      where: { id: sessionId },
      data: { expiresAt }
    });
  },

  deleteUserSessions: async (userId: string): Promise<void> => {
    await prisma.session.deleteMany({ where: { userId: Number(userId) } });
  },

  deleteExpiredSessions: async (): Promise<void> => {
    await prisma.session.deleteMany({
      where: { expiresAt: { lt: new Date() } }
    });
  }
};

export const lucia = new Lucia(luciaPrismaAdapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production"
    }
  }
});

export async function createAuthSession(userId: string | number): Promise<void> {
  const session = await lucia.createSession(String(userId), {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
}

export async function verifyAuth(): Promise<SessionResult> {
  const sessionCookie = cookies().get(lucia.sessionCookieName);

  if (!sessionCookie?.value) {
    return { user: null, session: null };
  }

  const result = await lucia.validateSession(sessionCookie.value);

  try {
    if (result.session?.fresh) {
      const refreshedCookie = lucia.createSessionCookie(result.session.id);
      cookies().set(refreshedCookie.name, refreshedCookie.value, refreshedCookie.attributes);
    }

    if (!result.session) {
      const blankCookie = lucia.createBlankSessionCookie();
      cookies().set(blankCookie.name, blankCookie.value, blankCookie.attributes);
    }
  } catch {}

  return {
    user: result.user ?? null,
    session: result.session ?? null
  };
}

export async function destroySession(): Promise<AuthResult> {
  const { session } = await verifyAuth();
  if (!session) return { error: "Unauthorized!" };

  await lucia.invalidateSession(session.id);

  const blankCookie = lucia.createBlankSessionCookie();
  cookies().set(blankCookie.name, blankCookie.value, blankCookie.attributes);

  return {};
}
