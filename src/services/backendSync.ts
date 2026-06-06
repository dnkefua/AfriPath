import { buildBackendUrl } from "../config";
import { BackendSyncResult, BackendSyncSnapshot } from "../types";

const SYNC_ENDPOINT_PATH = "/api/afripath/sync";
const REQUEST_TIMEOUT_MS = 8000;

export const backendSync = {
  getEndpoint() {
    return buildBackendUrl(SYNC_ENDPOINT_PATH);
  },

  async pushSnapshot(snapshot: BackendSyncSnapshot): Promise<BackendSyncResult> {
    const endpoint = this.getEndpoint();
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(snapshot),
        signal: controller.signal,
      });

      if (!response.ok) {
        return {
          status: "failed",
          endpoint,
          message: `Backend responded with ${response.status}. Export the snapshot or configure the sync endpoint.`,
        };
      }

      return {
        status: "synced",
        endpoint,
        message: "Backend accepted the AfriPath sync snapshot.",
        syncedAt: new Date().toISOString(),
      };
    } catch {
      return {
        status: "failed",
        endpoint,
        message: "Backend sync endpoint is not reachable yet. Use JSON export for deployment or admin import.",
      };
    } finally {
      window.clearTimeout(timeoutId);
    }
  },
};
