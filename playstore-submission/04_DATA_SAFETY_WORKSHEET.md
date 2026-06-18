# Data Safety Worksheet

Updated: June 12, 2026 for v1.1.0 (versionCode 3).

## Data Collection Summary

AfriPath v1.1.0 has no accounts, no login, and no analytics, ads, crash-reporting, or
tracking SDKs. All user state (display name, preferences, saved opportunities, tracker
progress, tasks, document readiness, curation drafts) is stored on-device only
(WebView localStorage mirrored to Android SharedPreferences via Capacitor Preferences).

Network behavior:

- On launch the app performs a GET request to
  `https://afripath--afripath.europe-west4.hosted.app/api/catalog.json` to refresh the
  opportunity catalog. The request contains no user data, no identifiers, and no headers
  beyond standard HTTP. Verified live (HTTP 200) on June 12, 2026.
- The admin snapshot sync endpoint (`POST /api/afripath/sync`) is hidden behind a
  7-tap developer mode in the app and returns HTTP 503 on the server unless
  `AFRIPATH_SYNC_KEY` is configured. It is NOT configured for the closed-testing
  deployment, so no tester data can be transmitted even if the panel is unlocked.
- Remote opportunity images are loaded over HTTPS for display only.
- The v1.0.x in-app application form that captured name/email/phone was REMOVED in
  v1.1.0. No form in the app transmits personal data.

## Play Console Data Safety Answers

- Does your app collect or share any of the required user data types? **No**
- (All follow-up questions are skipped when "No" is selected.)

Rationale: Google's Data Safety guidance treats on-device-only storage that never
leaves the device as "not collected". Nothing is transmitted off the device by the
developer, and there are no third-party SDKs that collect data.

## Security Practices (for reference)

- All network requests use HTTPS.
- Local data can be removed by the user at any time via Android Settings > Apps >
  AfriPath > Clear storage, or by uninstalling.

## Account Deletion

- Account creation: No. Account deletion section: Not applicable.

## Re-Declaration Triggers

Update this worksheet and the Play Console form BEFORE shipping any of the following:
accounts/login, cloud sync of user data, analytics or crash reporting (e.g. Sentry,
Crashlytics), ads, push notifications, payments, messaging, or AI generation.
