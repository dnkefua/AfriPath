# AfriPath App Store Private Testing

AfriPath is prepared for iOS private testing through TestFlight using Capacitor.

## Local Project

- App name: `AfriPath`
- Bundle identifier: `com.ndnanalytics.afripath`
- iOS project: `ios/App/App.xcodeproj`
- Web output: `dist`
- Capacitor config: `capacitor.config.ts`
- App icon source: `public/assets/afripath-logo.png`
- iOS app icon: `ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png`

## Build Commands

Run before opening Xcode:

```bash
npm run lint
npm run ios:sync
npm run ios:open
```

`npm run ios:sync` builds the web app, copies `dist` into the iOS project, and updates Capacitor native files.

## Xcode Steps

1. Open `ios/App/App.xcodeproj` on macOS with Xcode.
2. Select the `App` target.
3. Set the Apple Developer Team under Signing & Capabilities.
4. Confirm bundle id `com.ndnanalytics.afripath`.
5. Confirm version `1.0` and increment build number for every upload.
6. Select `Any iOS Device` as destination.
7. Choose `Product > Archive`.
8. In Organizer, choose `Distribute App`.
9. Select `App Store Connect`.
10. Upload the build.

## App Store Connect / TestFlight

1. Create or open the AfriPath app record in App Store Connect.
2. Match the bundle id to `com.ndnanalytics.afripath`.
3. Add internal testers or an internal testing group.
4. Complete missing beta metadata using `app-store/metadata/testflight.md`.
5. After processing completes, assign the build to the internal testing group.

## Private Testing Notes

- Internal TestFlight testing requires Apple Developer Program membership and App Store Connect user access.
- External TestFlight testing requires Apple beta app review before external testers can install.
- Final archive/upload cannot be completed from Windows; it requires macOS and Xcode.
- If the backend endpoint is not live yet, the in-app Backend Connection panel can still export a JSON snapshot for testing.

## Pre-Upload Checklist

- `npm run lint` passes.
- `npm run ios:sync` completes.
- AfriPath logo appears as the app icon in Xcode.
- App launches in an iOS Simulator or on a physical device.
- Command Center, Search, Saved, Visa Hub, and hosted Live link render correctly.
- TestFlight metadata is filled in.
- Privacy and data-use answers are reviewed in App Store Connect.
