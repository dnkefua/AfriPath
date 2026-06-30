# Screenshot And Asset Plan

## Required Play Store Assets

- App icon: 512 x 512 PNG or JPEG, up to 1 MB.
- Feature graphic: 1024 x 500 PNG or JPEG, up to 15 MB.
- Phone screenshots: upload 2-8 PNG/JPEG files, up to 8 MB each, 16:9 or 9:16, each side 320-3840 px.
- Promotion-ready phone set: at least 4 screenshots with a minimum of 1080 px on each side.
- 7-inch tablet screenshots: up to 8 screenshots, PNG/JPEG, up to 8 MB each, 16:9 or 9:16, each side 320-3840 px.
- 10-inch tablet screenshots: up to 8 screenshots, PNG/JPEG, up to 8 MB each, 16:9 or 9:16, each side 1080-7680 px.
- Chromebook screenshots: optional unless targeting Chromebook/promotion; upload 4-8 PNG/JPEG screenshots, 16:9 or 9:16, each side 1080-7680 px.
- Android XR screenshots: not applicable for AfriPath; if used later, upload 4-8 PNG/JPEG screenshots, up to 15 MB each, 16:9 or 9:16, each side 720-7680 px.
- Videos: optional YouTube URLs only; public or unlisted, ads off, not age restricted.

## Prepared Asset Paths

- Icon: `playstore-submission/assets/icon-512.png`
- Feature graphic: `playstore-submission/assets/feature-graphic-1024x500.png`
- Exact upload answers: `playstore-submission/12_GRAPHICS_UPLOAD_ANSWERS.md`

## Captured Phone Screenshots

All phone screenshots are 1080 x 1920 PNG, 9:16 portrait, real v1.1.0 UI, and under 8 MB each.

1. `playstore-submission/assets/screenshots/phone/01-home.png` - home with brand hero, relevance score, profile summary.
2. `playstore-submission/assets/screenshots/phone/02-search.png` - opportunity directory with filters and match cards.
3. `playstore-submission/assets/screenshots/phone/03-opportunity-detail.png` - source-backed detail with eligibility criteria.
4. `playstore-submission/assets/screenshots/phone/04-visa-hub.png` - sponsored jobs and visa pathway hub.
5. `playstore-submission/assets/screenshots/phone/05-command-center.png` - tracker, tasks, document readiness vault.
6. `playstore-submission/assets/screenshots/phone/06-saved.png` - saved bookmarks plus footer with privacy/support links and independent-app disclaimer.

## Prepared 7-Inch Tablet Screenshots

These are 1080 x 1920 PNG, 9:16 portrait, real v1.1.0 UI, and valid for the 7-inch tablet upload slot.

1. `playstore-submission/assets/screenshots/tablet-7/01-home.png`
2. `playstore-submission/assets/screenshots/tablet-7/02-search.png`
3. `playstore-submission/assets/screenshots/tablet-7/03-opportunity-detail.png`
4. `playstore-submission/assets/screenshots/tablet-7/04-visa-hub.png`
5. `playstore-submission/assets/screenshots/tablet-7/05-command-center.png`
6. `playstore-submission/assets/screenshots/tablet-7/06-saved.png`

## Prepared 10-Inch Tablet Screenshots

These are 1080 x 1920 PNG, 9:16 portrait, real v1.1.0 UI, and valid for the 10-inch tablet upload slot.

1. `playstore-submission/assets/screenshots/tablet-10/01-home.png`
2. `playstore-submission/assets/screenshots/tablet-10/02-search.png`
3. `playstore-submission/assets/screenshots/tablet-10/03-opportunity-detail.png`
4. `playstore-submission/assets/screenshots/tablet-10/04-visa-hub.png`
5. `playstore-submission/assets/screenshots/tablet-10/05-command-center.png`
6. `playstore-submission/assets/screenshots/tablet-10/06-saved.png`

## Regeneration

Phone screenshots can be regenerated with:

```bash
npm run preview
node scripts/capture-screenshots.mjs
```

The script fails if any screen logs a console error. Tablet folders were populated from the same verified real app screenshot set because the files already meet the 7-inch and 10-inch Play Store dimensions and size rules.

## Screenshot Rules

- Use only real app UI.
- Do not include Google Play badges.
- Do not imply guaranteed visa approval, hiring, admission, scholarships, or funding.
- Do not use official government, university, employer, or scholarship provider logos unless permission is documented.
- Keep any captions under 20% of screenshot area.

## Status

Ready to upload. Six phone screenshots, six 7-inch tablet screenshots, and six 10-inch tablet screenshots are present and validated.
