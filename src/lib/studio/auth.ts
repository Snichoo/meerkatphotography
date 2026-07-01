// Server-only. Tiny password gate for the hidden Studio admin.
// The password is read from STUDIO_PASSWORD (falls back to a default for first
// run). The session cookie stores an HMAC derived from the password, never the
// password itself, so it can't be reversed and is invalidated if you change it.
import crypto from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "mk_studio";
const DEFAULT_PASSWORD = "meerkat";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

export function getStudioPassword(): string {
  return process.env.STUDIO_PASSWORD || DEFAULT_PASSWORD;
}

function sessionToken(): string {
  return crypto
    .createHmac("sha256", getStudioPassword())
    .update("mk-studio-session-v1")
    .digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);
  return bufferA.length === bufferB.length && crypto.timingSafeEqual(bufferA, bufferB);
}

export function verifyPassword(input: string): boolean {
  return safeEqual(input, getStudioPassword());
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const value = store.get(COOKIE_NAME)?.value;
  return typeof value === "string" && safeEqual(value, sessionToken());
}

export async function startSession(): Promise<void> {
  const store = await cookies();
  store.set(COOKIE_NAME, sessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function endSession(): Promise<void> {
  const store = await cookies();
  store.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
