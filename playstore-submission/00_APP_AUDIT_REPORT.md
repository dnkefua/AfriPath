# AfriPath Google Play Closed Testing Audit Report

Prepared: June 10, 2026
Updated: June 11, 2026 (v1.1.0 trust/policy hardening pass)

## Repository Summary

- App name: AfriPath
- Developer/company: NDN Analytics
- Framework: React + Vite wrapped with Capacitor Android
- Android package: `com.ndnanalytics.afripath`
- Version prepared for closed testing: `1.1.0`
- Android versionCode prepared for closed testing: `3`
- Android project: `android/`
- Web build output: `dist/`
- App category recommendation: Education
- Hosted web app URL: `https://afripath--afripath.europe-west4.hosted.app/`
- Privacy policy URL after deployment: `https://afripath--afripath.europe-west4.hosted.app/privacy.html`

## Build Configuration

- `applicationId`: `com.ndnanalytics.afripath`
- `namespace`: `com.ndnanalytics.afripath`
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
- [ ] Privacy policy URL live after deployment: NEEDS MANUAL VERIFICATION

## Assets

- [x] 512 x 512 icon export prepared
- [x] 1024 x 500 feature graphic prepared
- [ ] Minimum 2 screenshots uploaded: NEEDS MANUAL ACTION if automated capture is not completed
- [ ] Recommended 6 phone screenshots uploaded: NEEDS MANUAL ACTION if automated capture is not completed

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

## Closed Testing

- [x] Closed testing plan prepared
- [ ] Closed testing track created in Play Console: NEEDS MANUAL ACTION
- [ ] Tester list or Google Group created: NEEDS MANUAL ACTION
- [ ] 20-30 testers recruited, minimum 12 opted-in testers required for production access: NEEDS MANUAL ACTION
- [ ] Testers remain opted in for at least 14 continuous days: NEEDS MANUAL ACTION

## Submission Recommendation

READY FOR CLOSED TESTING after Play Console manual setup, support email entry, privacy policy URL verification, and screenshot upload.
