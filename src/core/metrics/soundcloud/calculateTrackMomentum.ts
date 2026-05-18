import { clamp, round } from "../../../lib/math";
import type { SoundCloudNormalizedStats } from "../../../types/soundcloud";
import { calculateAudienceSpread } from "./calculateAudienceSpread";
import { calculateSoundCloudEngagement } from "./calculateSoundCloudEngagement";
import { calculateTrackVelocity } from "./calculateTrackVelocity";

export function calculateTrackMomentum(
  current: SoundCloudNormalizedStats,
  previous?: SoundCloudNormalizedStats
): number {
  const engagement = calculateSoundCloudEngagement(current);
  const velocity = calculateTrackVelocity(current, previous);
  const spread = calculateAudienceSpread(current);

  return round(
    clamp(engagement * 0.45 + clamp(velocity / 100) * 0.35 + spread * 0.2)
  );
}
