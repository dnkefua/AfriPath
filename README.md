# AfriPath

AfriPath is an independent opportunity discovery and application-readiness app by NDN Analytics.
It curates scholarships, international hiring tracks, volunteer pathways, and visa program
information for African applicants, and gives them a private on-device tracker for documents,
deadlines, and application progress.

**What AfriPath does NOT do:** it never submits applications, never talks to consulates or
government systems, and has no user accounts. All applications happen on official program sites,
and all tracker data stays on the user's device.

## Stack

- React 19 + TypeScript + Vite + Tailwind 4
- Capacitor 8 (Android + iOS shells)
- Express static server for Firebase App Hosting
- Vitest for tests

## Run locally

```bash
npm install
npm run dev        # dev server on :3000
npm run lint       # TypeScript check
npm test           # vitest (matching logic + catalog data integrity)
npm run build      # generates public/api/catalog.json, then vite build
```

## Catalog updates without app releases

`npm run build` emits the bundled catalog as `public/api/catalog.json`. The hosted web app serves
it at `/api/catalog.json`, and installed apps fetch it remote-first on launch (4s timeout,
falling back to the bundled copy when offline). Deploying a new App Hosting build is enough to
update catalog content in already-installed apps.

## Admin snapshot sync (optional, disabled by default)

The Command Center's curation desk and backend sync panel are hidden behind a developer mode
(tap the version line in the profile menu 7 times). The `POST /api/afripath/sync` endpoint
returns 503 unless `AFRIPATH_SYNC_KEY` is set on the server; requests must send the matching
`X-AfriPath-Sync-Key` header (`VITE_AFRIPATH_SYNC_KEY` locally — never ship it in a public build).

## Android private testing (Google Play)

```bash
npm run lint
npm run android:sync
npm run android:open
```

Build a signed `.aab` in Android Studio and upload it to a Play Console closed-testing track.
Release builds use R8 minification. Version lives in `android/app/build.gradle`
(`versionCode` / `versionName`) and should be bumped together with `APP_VERSION` in
`src/App.tsx`.

See [docs/GOOGLE_PLAY_PRIVATE_TESTING.md](docs/GOOGLE_PLAY_PRIVATE_TESTING.md) and the
[playstore-submission/](playstore-submission/) folder for the full submission worksheet.

## iOS private testing (TestFlight)

```bash
npm run ios:sync
npm run ios:open
```

See [docs/APP_STORE_PRIVATE_TESTING.md](docs/APP_STORE_PRIVATE_TESTING.md).
