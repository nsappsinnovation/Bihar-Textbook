# Bihar Purchase Preference Portal (Department of Industries, Bihar)

Bilingual (English / हिन्दी) portal that builds a searchable directory of local
enterprises in Bihar: who produces what, where the unit is, its production
capacity, employment and Udyam details. Government Departments use the directory
to identify local units under the Bihar Purchase Preference Policy.

This is not a tender or bidding portal. There are no bids, purchase orders or
accept/reject statuses.

React 19 + Vite + Tailwind v4 · Firebase Auth, Firestore, Storage, Cloud Functions (asia-south1).
The architecture, auth flow, layout and components are adapted from BRLPP.

> `BRLPP/` is kept only as the reference project and is not part of this app.

## Flows

- **New enterprise:** Home → Login / Create account → Registration (Contact → Unit →
  Products → Investment, employment & Udyam → GIS location & photos (optional) → Review) → Submit → Registration ID
  (`BPPP-YYYY-NNNNNN`).
- **Returning enterprise:** Login → Dashboard (unit summary, products, Edit / Update
  Details, Add Product, View Full Registration, Print / Download PDF).
- **Admins:** Dashboard + **Local Enterprise Directory**. Filter by district, block,
  sector or product; search by enterprise name, applicant name, mobile, Udyam No. or
  product; export the filtered list to Excel (Enterprises + Products sheets) or PDF.
  District admins see only their district; State admins see all districts and can
  manage admin accounts.

## Data (Firestore, same project as BRLPP)

Everything is under `PurchasePolicy/main/…`. Firestore paths alternate
collection / document, so `main` is the fixed document that holds the node.

```
PurchasePolicy/main/
  enterprises/{registrationId}          name, mobile, email, address, unitName, unitLocation,
                                        district, city, block, blockOther, sector, sectorOther,
                                        projectCost (₹ lakh), directEmployees, directEmployeesBihar, indirectEmployees,
                                        udyamRegistrationNo, productList (summary), productCount,
                                        productNames, photos [{url, path, name}], boundary [{lat, lng}],
                                        searchText, ownerUid,
                                        createdAt, updatedAt
    products/{productId}                productName, productionCapacity, capacityUnit, createdAt, updatedAt
  users/{uid}                           enterpriseId, mobile            (one enterprise per account)
  udyam/{udyamNo}                       enterpriseId                    (a Udyam No. registers once)
  admins/{uid}                          loginId, name, role, district   (mirrored by the functions)
  counters/enterprises                  year, seq                       (registration ID sequence)
  resetThrottle/*                       server-only
```

The products subcollection is the source of truth. `productList` on the enterprise
is a summary written in the same transaction, so the directory can filter and export
from a single query.

## Separation from BRLPP (shared Firebase project)

| | BRLPP | This portal |
|---|---|---|
| Data | `applicants`, `applications`, `counters/applications` | `PurchasePolicy/main/**` |
| Citizen account | `<mobile>@citizen.brlpp.local` | `<mobile>@citizen.bppp.local` |
| Admin account | `<id>@admin.brlpp.local`, claim `role` | `<id>@admin.bppp.local`, claims `ppRole` / `ppDistrict` |
| Functions codebase | `brlpp` (`resetPassword`, `listAdmins`, …) | `bppp` (`ppResetPassword`, `ppListAdmins`, …) |

Neither portal's accounts can read the other's data.

Unit photos (up to 5, compressed before upload) are stored in Firebase Storage at
`PurchasePolicy/unit-photos/<uid>/…`. The optional GIS boundary is the unit's corners
(3–20 GPS points, captured on site or typed). Admins see an outline, approximate area,
map link and a GeoJSON download, and the Excel export includes the points.

> **Firestore and Storage rules are project-wide.** `firestore.rules` and
> `storage.rules` here are BRLPP's rules (unchanged) plus a Purchase Preference
> block. Keep them identical to `BRLPP/firestore.rules` and `BRLPP/storage.rules`.
> Otherwise, deploying rules from either project removes the other portal's access.

## Login / OTP

Login and registration are the same as BRLPP: mobile + password by default, with the
Startup Bihar mobile-OTP screens available behind `VITE_CITIZEN_OTP_ENABLED=true`
(plus `CITIZEN_OTP_ENABLED=true` for `ppResetPassword`). The same caveat as BRLPP
applies: the OTP is verified in the browser, so switch to a server-verifiable OTP
proof before enabling password reset in production.

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
firebase hosting:sites:create bihar-purchase-preference    # once; or change "site" in firebase.json
firebase deploy --only firestore:rules,storage              # see the rules note above
firebase deploy --only functions:bppp                      # only this codebase
npm run build && firebase deploy --only hosting:bihar-purchase-preference
```

For a custom domain, add it under **Authentication → Settings → Authorized domains**.
Optional, so photos embed in admin PDF exports: `gsutil cors set cors.json gs://carbonfootprint-69ba7.appspot.com`
(BRLPP uses the same bucket and the same `cors.json`).

### Admin accounts

- First State admin:
  `ADMIN_PASSWORD='…' node scripts/bootstrap-state-admin.mjs <adminId> "<Name>"`
  (run `npm install` first. The script uses `bcryptjs` from devDependencies.)
- All further District/State admins: portal → **Manage Admins**.

## Where things live

- `src/lib/firebase.js`: Firebase config (same as BRLPP) and `ppCol` / `ppDoc` path helpers
- `src/lib/enterprisesApi.js`: register / update / add product transactions, Udyam index
- `src/lib/idGenerator.js`: `BPPP-YYYY-NNNNNN` counter
- `src/i18n/translations.js`: every label, `key: [English, Hindi]`
- `src/data/sectors.js`, `src/data/capacityUnits.js`: dropdown masters
- `src/data/bihar_district_blocks.json`: District → Block master (38 / 531), derived from BRLPP's District → Circle list. "Other (not in list)" lets applicants type a block (saved with `blockOther: true`). Keep `functions/districts.json` in sync if districts change.
- `src/lib/storageApi.js`: photo compression, upload and cleanup
- `src/lib/exporters.js`: Excel (SheetJS) and PDF (html-to-image + jsPDF, keeps Devanagari shaping)
