# AfriPath Google Play Closed Testing Audit Report

Prepared: June 10, 2026
Updated: June 30, 2026 (NDN ANALYTICS INC. organization closed-testing pass)

## Repository Summary

- App name: AfriPath
- Developer/company: NDN ANALYTICS INC.
- Play developer account type: Organization
- Framework: React + Vite wrapped with Capacitor Android
- Android package: `com.ndnanalyticsinc.afripath`
- Version prepared for closed testing: `1.1.0`
- Android versionCode prepared for closed testing: `1`
- Android project: `android/`
- Web build output: `dist/`
- App category recommendation: Education
- Hosted web app URL: `https://afripath--afripath.europe-west4.hosted.app/`
- Privacy policy URL after deployment: `https://afripath--afripath.europe-west4.hosted.app/privacy.html`

## Build Configuration

- `applicationId`: `com.ndnanalyticsinc.afripath`
- `namespace`: `com.ndnanalyticsinc.afripath`
- `minSdk`: 24
- `targetSdk`: 36
- `compileSdk`: 36
- Permissions: `android.permission.INTERNET`
- Release debuggable: not enabled in `android/app/build.gradle`
- Release minification: R8 + resource shrinking enabled
- Capacitor plugins: app, preferences, splash-screen, status-bar
- Release signing: local upload key exists outside git in `app-store/signing/`

## App Behavior Audit

- Login required: no
- Account creation: no
- Account deletion required: not applicable for this build
- Ads: no ad SDK found
- In-app purchases: no billing SDK found
- User-generated content: no public posting or user-to-user sharing
- AI-generated content: no active AI generation flow found in the app UI
- Health/medical app: no, although some opportunity records reference medical education and residency paths
- Financial services: no banking, lending, investing, insurance, crypto, or payments features
- Government/regulator references: yes, opportunity and visa source links may reference official sponsor or visa information; app now includes an independent-app disclaimer
- WebView: yes, Capacitor local WebView assets; not configured to load a remote URL

## Data Handling

The app stores user preferences, a local display name, saved opportunities, tracked applications, readiness checklist selections, curation leads, and export snapshots in local app storage (localStorage mirrored to native Preferences). No personal data leaves the device: the in-app "apply" form that previously collected name/email/phone was removed in v1.1.0 — applications happen on official external sites, and the app only keeps a self-managed tracker. The admin snapshot sync endpoint is disabled server-side unless a sync key is configured, and the admin tooling is hidden behind a developer mode.

## v1.1.0 Trust & Policy Changes

- Removed the simulated application form (collected PII with no real submission) — replaced with "Apply on Official Site" deep links plus a local tracker.
- Removed fabricated UI: fake notifications, pre-seeded visa tracks, "Live Consulate Biometric Queue" (now a self-reported "Visa Journey Planner" with an explicit not-connected-to-government disclaimer), "Visa Issued"/"CV Received" phase claims, and the demo profile switcher containing hardcoded email addresses.
- Relabeled match scores as relevance heuristics and removed the artificial score floor.
- App fetches catalog updates from the hosted deployment at launch and falls back to the bundled catalog offline.

## Security And Secret Scan

No committed secret patterns were found in the app files scanned outside ignored signing/build folders. Keystore credentials are intentionally stored in ignored local signing files and must not be committed or pasted into Play Console notes.

## Final Closed Testing Submission Checklist

## Build

- [x] Release AAB builds successfully
- [x] `versionCode` incremented
- [x] Package name stable
- [x] Target SDK current for this project
- [x] Release signing configured locally
- [x] No debug release setting found

## Store Listing

- [x] App name prepared
- [x] Short description prepared
- [x] Full description prepared
- [x] Category recommendation prepared
- [x] Independent-app disclaimer included
- [x] Support email finalized: nkefua@ndnanalytics.com (enter it in Play Console store listing)
- [x] Privacy policy URL live: verified HTTP 200 with v1.1.0 text on June 12, 2026

## Assets

- [x] 512 x 512 icon export prepared
- [x] 1024 x 500 feature graphic prepared
- [x] Six 1080x1920 phone screenshots captured from real v1.1.0 UI (playstore-submission/assets/screenshots/phone) — upload in Play Console

## App Content

- [x] App access documented
- [x] Ads declaration documented
- [x] Target audience draft documented
- [x] Government-app declaration draft documented
- [x] Data Safety worksheet drafted
- [x] Privacy policy content drafted

## In-App Compliance

- [x] Privacy policy accessible from app footer
- [x] Support page accessible from app footer
- [x] Independent-app disclaimer accessible from app footer

## Organization Closed Testing

- [x] Closed testing plan prepared
- [x] Organization developer name set to NDN ANALYTICS INC.
- [x] Organization package name prepared as `com.ndnanalyticsinc.afripath`
- [ ] Closed testing track created in Play Console: NEEDS MANUAL ACTION
- [ ] Tester list or Google Group created: NEEDS MANUAL ACTION
- [ ] 20-30 testers recruited for organization closed testing: NEEDS MANUAL ACTION
- [ ] Keep at least 12 testers opted in for 14 continuous days as conservative production-readiness evidence: NEEDS MANUAL ACTION

## Release Artifact (v1.1.0 / organization package versionCode 1)

- Signed AAB: `playstore-submission/release/app-v1.1.0-vc1-ndn-analytics-inc.aab` (also `app-store/builds/AfriPath-1.1.0-1-ndn-analytics-inc-signed.aab`)
- SHA-256: `9FBC6434815A1252C31577C7D84B5420CEC17C48FF03717315AE90868DE271A6`
- Build command: `npm run build && npx cap sync android && android/gradlew bundleRelease` + jarsigner with the upload key
- Signing status: verified (`jar verified`; self-signed upload cert chain warning is expected before Play App Signing)
- R8 minification + resource shrinking: enabled

## Submission Recommendation

READY FOR ORGANIZATION CLOSED TESTING. Remaining steps are Play Console actions only: upload AAB, paste listing copy, upload assets, complete declarations, create the closed track, and recruit testers. The 12 opted-in testers for 14 continuous days rule is documented as a personal-account production-access requirement, but this organization package should still collect equivalent evidence for a cleaner production-readiness file.
