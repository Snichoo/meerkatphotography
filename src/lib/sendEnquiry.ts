// Posts a contact/enquiry form to the /api/contact route (Resend-backed).
// Reads values by input `name`, so forms just need named fields.
export async function sendEnquiry(form: HTMLFormElement, source: string): Promise<void> {
  const data = new FormData(form);
  const payload = {
    name: String(data.get("name") ?? ""),
    email: String(data.get("email") ?? ""),
    phone: String(data.get("phone") ?? ""),
    message: String(data.get("message") ?? ""),
    source,
  };

  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new Error(body?.error ?? "Could not send your enquiry. Please try again.");
  }
}
