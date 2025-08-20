import type { Session, User } from "lucia";

export type FormErrors = {
  email?: string;
  password?: string;
};

export type AuthResult = {
  errors?: FormErrors;
  error?: string;
};

export type PrevState = AuthResult | null;

export type AuthMode = "login" | "signup";

export type SessionResult = {
  user: User | null;
  session: Session | null;
};