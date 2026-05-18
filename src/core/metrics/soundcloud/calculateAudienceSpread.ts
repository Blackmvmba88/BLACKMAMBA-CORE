import { round } from "../../../lib/math";
import type { SoundCloudNormalizedStats } from "../../../types/soundcloud";

export function calculateAudienceSpread(stats: SoundCloudNormalizedStats): number {
  if (stats.plays <= 0) {
    return 0;
  }

  const interactionTypes = [stats.likes, stats.reposts, stats.comments, stats.downloads ?? 0];
  const activeTypes = interactionTypes.filter((value) => value > 0).length;

  return round(activeTypes / interactionTypes.length);
}
