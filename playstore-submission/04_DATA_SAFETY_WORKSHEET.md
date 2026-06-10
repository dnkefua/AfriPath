# Data Safety Worksheet

## Data Collection Summary

AfriPath does not require account creation in this closed testing build. The app stores user-selected preferences, saved opportunity IDs, tracked application details, application tasks, document readiness status, applicant credential readiness, curation leads, custom opportunities, and export snapshots in local app/browser storage.

The app also includes an optional backend sync/export workflow. If enabled and triggered, a snapshot can be sent to the configured AfriPath backend endpoint for app operations, debugging, and curation review.

## Suggested Data Safety Answers

## Data Collection

- Does the app collect or share any required user data? NEEDS VERIFICATION based on whether backend sync is enabled for closed testing.
- If the private testing build uses local storage only and no backend sync is triggered: declare no data collected by the developer, but document local device storage in the privacy policy.
- If backend sync is enabled or testers are instructed to use it: declare collected data as described below.

## Data Types If Backend Sync Is Enabled

- App activity:
  - Saved opportunities
  - Application tracking status
  - App interactions and in-app search/filter preferences
  - Purpose: app functionality, analytics/debugging, developer communications if feedback is attached outside the app
- User-provided content:
  - Curation lead notes and custom opportunity notes
  - Purpose: app functionality and content curation review
- Personal info:
  - Only if users type personal names or identity details into local application fields or exported snapshots
  - Purpose: app functionality

## Sharing

- No sale of data.
- No ad sharing found.
- External opportunity links may open third-party sites controlled by their own operators.
- NEEDS VERIFICATION: backend hosting/provider and processor terms before final production Data Safety submission.

## Security Practices

- Data encrypted in transit: Yes for HTTPS web/backend URLs when deployed correctly.
- Users can request deletion: Not applicable for app accounts because this build does not create accounts. Local app data can be cleared by uninstalling the app or clearing app storage.

## Account Deletion

- Has user account creation: No.
- In-app account deletion required: No for this build.
- Web deletion URL required: No for this build.

## Reviewer Note

If AfriPath adds accounts, cloud sync, analytics, crash reporting, payments, ads, messaging, or AI generation later, update this worksheet and Google Play Data Safety before release.
