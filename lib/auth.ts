import { Lucia } from "lucia";
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";
import db from "./db";
import { cookies } from "next/headers";
import type { SessionResult, AuthResult } from "@/types/auth";

const adapter = new BetterSqlite3Adapter(db, {
  user: "users",
  session: "sessions",
});

const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});

export async function createAuthSession(userId: string | number): Promise<void> {
  const session = await lucia.createSession(userId.toString(), {});
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
    session: result.session ?? null,
  };
}

export async function destroySession(): Promise<AuthResult> {
  const { session } = await verifyAuth();

  if (!session) {
    return { error: "Unauthorized!" };
  }

  await lucia.invalidateSession(session.id);

  const blankCookie = lucia.createBlankSessionCookie();
  cookies().set(blankCookie.name, blankCookie.value, blankCookie.attributes);

  return {};
}
