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
