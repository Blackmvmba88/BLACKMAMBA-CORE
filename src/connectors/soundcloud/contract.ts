import type { SoundCloudTrackStats } from "../../types/music";

export type SoundCloudConnector = {
  getTrackStats(trackId: string): Promise<SoundCloudTrackStats | null>;
};
