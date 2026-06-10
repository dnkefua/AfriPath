# AfriPath Google Play Private Testing

AfriPath is prepared for Google Play private testing through Capacitor Android.

## Local Project

- App name: `AfriPath`
- Package name: `com.ndnanalytics.afripath`
- Android project: `android`
- Web output: `dist`
- Capacitor config: `capacitor.config.ts`
- Version name: `1.0.1`
- Version code: `2`

## Build Commands

Run before opening Android Studio:

```bash
npm run lint
npm run android:sync
npm run android:open
```

`npm run android:sync` builds the web app, copies `dist` into the Android project, and updates Capacitor native files.

## Android Studio Steps

1. Open the `android` folder in Android Studio.
2. Let Gradle sync finish.
3. Confirm package name `com.ndnanalytics.afripath`.
4. Confirm version code `2` and version name `1.0.1`.
5. Create or select a release signing key.
6. Build a signed Android App Bundle:
   - `Build > Generate Signed Bundle / APK`
   - Select `Android App Bundle`
   - Choose release signing credentials
   - Build the release `.aab`
7. Upload the `.aab` to Google Play Console.

## Play Console Private Testing

For private testing, use one of these tracks:

- Internal testing: fastest private distribution for trusted testers.
- Closed testing: controlled testing with a defined tester list or Google Group.

Recommended first path:

1. Create the app in Google Play Console.
2. Complete app setup details: app access, ads, content rating, target audience, privacy policy, and data safety.
3. Upload the signed `.aab`.
4. Create an internal testing release first.
5. Add tester emails or a Google Group.
6. Share the opt-in link with testers.
7. Move to closed testing when broader private validation is needed.

## Pre-Upload Checklist

- `npm run lint` passes.
- `npm run android:sync` completes.
- AfriPath launcher icon appears in Android Studio.
- App launches in an Android emulator or physical device.
- Landing page, Search, Visa Hub, Saved, and Command Center render correctly.
- Source links open correctly.
- Backend export works even if sync endpoint is not live.
- Google Play metadata is reviewed in `app-store/metadata/google-play.md`.

## Notes

- Google Play expects Android App Bundles (`.aab`) for new app uploads.
- Final signed release build requires Android Studio or a configured Android SDK/Gradle environment.
- If the app is from a new Play developer account, Google may require closed testing before production access.
