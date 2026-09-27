#!/usr/bin/env node
/**
 * One-time creation of the first State admin of the Purchase Preference portal (later admins are created
 * from the portal's "Manage Admins" page).
 *
 * Uses `firebase auth:import` with a bcrypt hash + custom claims, so no service
 * account key is needed – only a logged-in Firebase CLI with project access.
 *
 *   ADMIN_PASSWORD='...' node scripts/bootstrap-state-admin.mjs <loginId> "<Name>" [--project <id>]
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";

const [loginId, name] = process.argv.slice(2);
const projectIdx = process.argv.indexOf("--project");
const project = projectIdx > -1 ? process.argv[projectIdx + 1] : "carbonfootprint-69ba7";
const password = process.env.ADMIN_PASSWORD;

if (!/^[a-z0-9][a-z0-9_.-]{2,31}$/.test(loginId || "") || !name || !password || password.length < 8) {
  console.error('Usage: ADMIN_PASSWORD=<min 8 chars> node scripts/bootstrap-state-admin.mjs <loginId> "<Name>" [--project <id>]');
  process.exit(1);
}

const dir = mkdtempSync(join(tmpdir(), "bppp-admin-"));
const file = join(dir, "users.json");
try {
  writeFileSync(
    file,
    JSON.stringify({
      users: [
        {
          localId: randomUUID().replace(/-/g, "").slice(0, 28),
          email: `${loginId}@admin.bppp.local`,
          emailVerified: true,
          displayName: name,
          passwordHash: Buffer.from(bcrypt.hashSync(password, 12)).toString("base64"),
          // ppRole (not BRLPP's "role") so this account has no access to BRLPP data.
          customAttributes: JSON.stringify({ ppRole: "state" }),
        },
      ],
    })
  );
  execFileSync("firebase", ["auth:import", file, "--hash-algo=BCRYPT", "--project", project], { stdio: "inherit" });
  console.log(`State admin "${loginId}" imported into ${project}.`);
} finally {
  rmSync(dir, { recursive: true, force: true });
}
