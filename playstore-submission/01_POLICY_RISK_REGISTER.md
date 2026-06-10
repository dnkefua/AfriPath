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

- Support email is not committed in the repository. Add the final developer support email in Play Console and in `public/support.html` when confirmed.
- `@google/genai` exists as a dependency but no active AI generation UI was found. Remove it later if unused to reduce policy review questions and bundle surface.
