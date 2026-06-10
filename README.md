<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/7e187f22-6c74-42fe-ba71-138aec162c1d

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## AfriPath backend sync

The Command Center includes a Backend Connection panel. It builds a typed AfriPath snapshot containing the catalog, curation leads, application records, tasks, documents, saved IDs, active tracks, and user preferences.

Configure `VITE_BACKEND_URL` to point at the backend service. The app will attempt:

`POST ${VITE_BACKEND_URL}/api/afripath/sync`

If the backend endpoint is not available yet, use **Export JSON** in the Command Center to download the same payload for admin import or deployment testing.

## iOS private testing

AfriPath is scaffolded for iOS TestFlight/private App Store testing with Capacitor.

```bash
npm run lint
npm run ios:sync
npm run ios:open
```

Open the generated Xcode project at `ios/App/App.xcodeproj`, select the Apple Developer Team, archive the app, and upload it to App Store Connect for TestFlight.

See [docs/APP_STORE_PRIVATE_TESTING.md](docs/APP_STORE_PRIVATE_TESTING.md) and [app-store/metadata/testflight.md](app-store/metadata/testflight.md).

## Google Play private testing

AfriPath is scaffolded for Android internal/closed testing with Capacitor.

```bash
npm run lint
npm run android:sync
npm run android:open
```

Open the generated Android project in Android Studio, build a signed Android App Bundle (`.aab`), and upload it to Google Play Console for internal or closed testing.

See [docs/GOOGLE_PLAY_PRIVATE_TESTING.md](docs/GOOGLE_PLAY_PRIVATE_TESTING.md) and [app-store/metadata/google-play.md](app-store/metadata/google-play.md).
