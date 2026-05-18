import { round } from "../../../lib/math";
import type { SoundCloudNormalizedStats } from "../../../types/soundcloud";

export function calculateSoundCloudEngagement(stats: SoundCloudNormalizedStats): number {
  if (stats.plays <= 0) {
    return 0;
  }

  return round((stats.likes + stats.reposts + stats.comments) / stats.plays);
}
