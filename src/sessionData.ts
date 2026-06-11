import { ActiveTrack, UserProfile } from "./types";

// Local-only profile; AfriPath has no accounts, so the name lives on-device.
export const DEFAULT_USER_PROFILE: UserProfile = {
  name: "Explorer",
  email: "",
  avatarUrl: "",
};

// Trackers start empty — every track is created by a real user action.
export const INITIAL_ACTIVE_TRACKS: ActiveTrack[] = [];
