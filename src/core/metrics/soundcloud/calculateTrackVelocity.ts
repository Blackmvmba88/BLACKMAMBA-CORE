import { round } from "../../../lib/math";
import type { SoundCloudNormalizedStats } from "../../../types/soundcloud";

export function calculateTrackVelocity(
  current: SoundCloudNormalizedStats,
  previous?: SoundCloudNormalizedStats
): number {
  if (!previous) {
    return current.plays;
  }

  const currentTime = new Date(current.capturedAt).getTime();
  const previousTime = new Date(previous.capturedAt).getTime();
  const hours = Math.max((currentTime - previousTime) / 36e5, 1);
  const delta = Math.max(current.plays - previous.plays, 0);

  return round(delta / hours, 2);
}
