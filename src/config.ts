const DEFAULT_APP_URL = "https://afripath--afripath.europe-west4.hosted.app/";

const normalizeUrl = (value: string | undefined): string | undefined => {
  if (!value) return undefined;

  try {
    return new URL(value).toString();
  } catch {
    return undefined;
  }
};

export const APP_URL =
  normalizeUrl(import.meta.env.VITE_APP_URL) ?? DEFAULT_APP_URL;

export const BACKEND_URL =
  normalizeUrl(import.meta.env.VITE_BACKEND_URL) ?? APP_URL;

export const buildBackendUrl = (path = "/") => new URL(path, BACKEND_URL).toString();
