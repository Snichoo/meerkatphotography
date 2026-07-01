"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function StudioLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/studio/session", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data.error ?? "Wrong password. Please try again.");
        setLoading(false);
        return;
      }

      // Re-render the server page, which will now show the editor.
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="font-heading text-[13px] font-medium uppercase tracking-[0.28em] text-navy/50">
            Meerkat Photography
          </p>
          <h1 className="mt-2 font-heading text-3xl font-semibold text-navy">Studio Login</h1>
          <p className="mt-2 text-sm text-navy/60">Manage your gallery photos.</p>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-navy/10 bg-white/70 p-6 shadow-sm backdrop-blur"
        >
          <label htmlFor="studio-password" className="block text-sm font-medium text-navy">
            Password
          </label>
          <input
            id="studio-password"
            type="password"
            autoFocus
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-lg border border-navy/20 bg-white px-4 py-3 text-navy outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
            placeholder="Enter your password"
          />

          {error && (
            <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || password.length === 0}
            className="mt-5 w-full rounded-lg bg-navy px-4 py-3 font-medium text-cream transition hover:bg-navy/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
