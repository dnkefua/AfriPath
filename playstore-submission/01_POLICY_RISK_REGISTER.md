# AfriPath Policy Risk Register

## BLOCKER

- None found in the local repository audit.

## HIGH

- Privacy policy URL must be live before Play submission. The app includes `public/privacy.html`; deploy the hosted app and verify `https://afripath--afripath.europe-west4.hosted.app/privacy.html`.
- Screenshots must be real app UI and uploaded before store listing completion.

## MEDIUM

- AfriPath references visa pathways, official source links, sponsor lists, and international opportunities. Keep the independent-app disclaimer visible and avoid implying government, university, employer, or sponsor affiliation.
- Optional backend sync can send user-created snapshots if enabled. Data Safety must reflect this if the endpoint is used during testing or production.
- The app includes international jobs and opportunities. Avoid claims that visas, scholarships, hiring, approvals, or admissions are guaranteed.

## LOW

- Support email confirmed: nkefua@ndnanalytics.com (set in `public/support.html` and `public/privacy.html`; enter the same address in Play Console). RESOLVED June 11, 2026.
- `@google/genai` dependency removed in v1.1.0. RESOLVED June 11, 2026.
