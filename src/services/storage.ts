import { Capacitor } from "@capacitor/core";
import { Preferences } from "@capacitor/preferences";

// All persisted keys. Add new keys here so they are restored on native
// devices if the WebView's localStorage is evicted by the OS.
export const STORAGE_KEYS = [
  "afripath_profile",
  "afripath_preferences",
  "afripath_saved",
  "afripath_tracks",
  "afripath_devmode",
  "afripath_visa_planner_step",
  "afripath_application_records",
  "afripath_application_tasks",
  "afripath_application_documents",
  "afripath_applicant_credentials",
  "afripath_curation_leads",
  "afripath_custom_opportunities",
] as const;

const isNative = () => Capacitor.isNativePlatform();

export const storage = {
  get(key: string): string | null {
    return localStorage.getItem(key);
  },

  set(key: string, value: string) {
    localStorage.setItem(key, value);
    if (isNative()) {
      void Preferences.set({ key, value }).catch(() => {});
    }
  },

  remove(key: string) {
    localStorage.removeItem(key);
    if (isNative()) {
      void Preferences.remove({ key }).catch(() => {});
    }
  },
};

// Restores native-persisted values into localStorage before first render.
// localStorage wins when both exist; Preferences only backfills after the
// WebView store has been cleared.
export const hydrateStorage = async () => {
  if (!isNative()) return;

  try {
    await Promise.all(
      STORAGE_KEYS.map(async (key) => {
        if (localStorage.getItem(key) !== null) return;
        const { value } = await Preferences.get({ key });
        if (value !== null) localStorage.setItem(key, value);
      }),
    );
  } catch {
    // Hydration is best-effort; the app still works from localStorage.
  }
};
