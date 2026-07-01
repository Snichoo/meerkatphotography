# Gallery Studio — hidden admin for managing photos

Your site has a hidden, password‑protected page where you can **add, delete, and
reorder** the photos in each service gallery. Changes go live on the website
automatically — no code, no redeploy.

- **Address:** `https://your-site.com/studio`
- **Default password:** `meerkat` (please change it — see below)

The link is not shown anywhere on the site and is hidden from Google. Just
bookmark it. Anyone who wants in still needs the password.

---

## What you can do

Once logged in you'll see a tab for each gallery (Event Photography, Weddings,
etc.) with the number of photos in each.

- **Add photos** — click **Add photos** (or drag files onto the dashed box).
  You can select many at once. A progress bar shows each upload.
- **Delete a photo** — hover a photo and click the red trash icon (it asks you
  to confirm).
- **Reorder** — drag any photo to a new spot. On a phone, press‑and‑hold then
  drag. You can also use the ⟵ / ⟶ buttons to send a photo to the start or end.
- **Shuffle** — randomise the whole gallery's order with one click.
- **Reverse** — flip the current order.
- **Caption** — click the text under a photo to rename it.

Every change saves on its own; you'll see **Saving… → Saved** at the top right.
The live gallery updates within a few seconds.

---

## One‑time setup (whoever manages the Vercel account)

Photos and the gallery order are stored in **Vercel Blob**. Until it's connected
the Studio still opens and shows the current galleries, but it can't save
changes (you'll see a yellow warning).

### 1. Create a Blob store

1. Open the project on [vercel.com](https://vercel.com) → **Storage** tab.
2. Click **Create Database → Blob** and give it any name.
3. **Connect** it to this project.

That adds a `BLOB_READ_WRITE_TOKEN` environment variable automatically. Redeploy
(or it applies on the next deploy) and uploads will work.

### 2. Set the password

1. Project → **Settings → Environment Variables**.
2. Add:
   - **Name:** `STUDIO_PASSWORD`
   - **Value:** whatever password you want
3. Redeploy.

If you skip this, the password stays the default `meerkat`. Changing the
password automatically logs everyone out of old sessions.

---

## Running it on your own computer (optional)

```bash
# Pull the Blob token from Vercel so uploads work locally
vercel env pull .env.local

npm run dev
# then open http://localhost:3000/studio
```

Without the token, local uploads are disabled but you can still browse the
galleries and log in. (Locally you can also set `STUDIO_PASSWORD` in `.env.local`.)

---

## Good to know

- The original photos that shipped with the site live in `public/images` and are
  used until you change a gallery in the Studio. Newly uploaded photos are stored
  in Vercel Blob. Deleting an uploaded photo also removes its file; deleting an
  original just hides it from the gallery.
- Accepted files: JPG, PNG, WebP, GIF — up to 30 MB each.
- Forgot the password? Reset `STUDIO_PASSWORD` in Vercel and redeploy.
