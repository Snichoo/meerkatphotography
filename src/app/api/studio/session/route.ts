import { NextResponse } from "next/server";
import { endSession, startSession, verifyPassword } from "@/lib/studio/auth";

export const runtime = "nodejs";

// Log in.
export async function POST(request: Request) {
  let password = "";
  try {
    const body = await request.json();
    password = typeof body?.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!verifyPassword(password)) {
    return NextResponse.json({ error: "Wrong password. Please try again." }, { status: 401 });
  }

  await startSession();
  return NextResponse.json({ ok: true });
}

// Log out.
export async function DELETE() {
  await endSession();
  return NextResponse.json({ ok: true });
}
