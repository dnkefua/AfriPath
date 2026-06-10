# AfriPath TestFlight Metadata Draft

## App Name

AfriPath

## Subtitle

Global opportunities, guidance, and application readiness.

## Short Description

AfriPath helps users discover verified scholarships, international hiring pathways, volunteer placements, visa routes, and sponsor-backed opportunities, then organize documents and next actions in one command center.

## Beta App Description

AfriPath is a global opportunity intelligence platform for applicants preparing scholarships, international jobs, volunteer placements, and visa-supported mobility pathways.

This private TestFlight build focuses on:

- Opportunity search and matching
- Verified source signals
- International hiring and volunteer filters
- Applicant Readiness Center
- Application Command Center
- Research Verification Desk
- Backend snapshot export/sync workflow

## What To Test

- Open the landing page and confirm the AfriPath logo/video branding renders correctly.
- Use Search to filter scholarships, jobs, and volunteer opportunities.
- Open an opportunity detail page and confirm source verification metadata appears.
- Save an opportunity.
- Track an opportunity and confirm it appears in the Command Center.
- Mark applicant credentials as ready in the Applicant Readiness Center.
- Use the Decision Intelligence Board to review, save, and track a priority pathway.
- Add a research lead in the Research Verification Desk.
- Advance a lead to Verified and publish it to the catalog.
- Export a backend JSON snapshot.

## Beta Feedback Notes

Please report:

- Broken links or unclear opportunity evidence.
- Any screen that feels too dense on mobile.
- Search/filter combinations that return confusing results.
- Missing documents needed for real applications.
- Any TestFlight launch, navigation, or media playback issue.

## Review Notes

AfriPath is currently prepared for private testing. Some backend sync behavior may return a configuration notice if the production sync endpoint is not active. The JSON export fallback is expected during private testing.

## Privacy Notes Draft

The current private testing build stores user selections, readiness toggles, saved opportunities, curation leads, and application tracking state locally in the app/browser storage. No production account login or payment flow is included in this build.
