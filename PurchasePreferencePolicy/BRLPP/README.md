# Bihar Raiyati Land Purchase Portal (IDA, Bihar)

Bilingual (English / हिन्दी) data-collection portal for Raiyatis offering land to the
Government / IDA under the Bihar Raiyati Land Purchase Policy.

React 19 + Vite + Tailwind v4 · Firebase Auth, Firestore, Storage, Cloud Functions (asia-south1).

> `MMUY/` is only a UI reference kit and is not part of this app.

## Architecture & security

| Who | Sign-in | Identity (custom claims) | Can access |
|---|---|---|---|
| Citizen | Mobile + password. Registration currently creates the account without mobile verification | Firebase Auth email `<mobile>@citizen.brlpp.local` | own profile + own applications |
| District admin | Admin ID + password (Firebase Auth) | `{ role: "district", district }` | applications of that district (read-only) |
| State / IDA admin | Admin ID + password | `{ role: "state" }` | all applications (read-only), Manage Admins |

- Enforced by `firestore.rules` / `storage.rules`; submissions are immutable, IDs
  (`IDA-RLP-YYYY-NNNNNN`) must match the counter incremented in the same transaction.
- Admin IDs map to Firebase Auth emails `<adminId>@admin.brlpp.local`; citizens to `<mobile>@citizen.brlpp.local` (uid `mob_<mobile>`).
- Forgot-password recovery is hidden while OTP is disabled; allowing password
  reset without identity verification would permit account takeover.
- The browser OTP implementation is retained behind
  `VITE_CITIZEN_OTP_ENABLED=true` for a later rollout. Before enabling it in
  production, use a server-verifiable OTP proof for password reset.
- The retained `resetPassword` function rejects requests unless its server-side
  `CITIZEN_OTP_ENABLED=true` environment setting is also deliberately enabled.

## Develop

```bash
npm install && (cd functions && npm install)
npm run dev
```

Local Firebase emulators:

```bash
firebase emulators:start --only auth,functions,firestore,storage
VITE_USE_EMULATORS=true npm run dev
```

## Deploy (project `carbonfootprint-69ba7`)

```bash
firebase deploy --only firestore:rules,storage
firebase deploy --only functions:brlpp        # only this codebase; leaves the project's other functions alone
npm run build && firebase deploy --only hosting
```

### One-time console setup

1. **Authentication → Sign-in method → Email/Password → Enable** (admin and citizen password login).
2. When OTP is re-enabled, ensure the deployed portal origin is allowed by the Startup Bihar OTP API's CORS policy.
3. For a custom domain, add it under **Authentication → Settings → Authorized domains**.
4. Optional: `gsutil cors set cors.json gs://carbonfootprint-69ba7.appspot.com` so photos embed in admin PDF exports.

### Admin accounts

- First State admin (already created: `idastateadmin`):
  `ADMIN_PASSWORD='…' node scripts/bootstrap-state-admin.mjs <adminId> "<Name>"`
- All further District/State admins: portal → **Manage Admins** (create, reset password, disable).

## Where things live

- `src/lib/otpApi.js`: retained browser-side Startup Bihar OTP client
- `functions/index.js`: retained OTP password reset + admin management functions
- `src/i18n/translations.js`: every label, `key: [English, Hindi]`
- `src/data/bihar_district_circle_mauja.json`: District → Circle → Mauja master (38 / 531 / 8,558), lazy-loaded for dropdowns; "Other (not in list)" lets citizens type a mauja (saved with `maujaOther: true`). District Hindi names are in `src/lib/locations.js`; keep `functions/districts.json` in sync if districts change.
- `src/lib/exporters.js`: Excel (SheetJS) and PDF (html-to-image + jsPDF, keeps Devanagari shaping)
