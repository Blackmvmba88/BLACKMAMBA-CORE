import { clamp, round } from "../../lib/math";
import type { SoundCloudTrackStats } from "../../types/music";

export function calculateEngagementRatio(stats: SoundCloudTrackStats): number {
  if (stats.plays <= 0) {
    return 0;
  }

  const engagements = stats.likes + stats.reposts + stats.comments;
  return round(engagements / stats.plays);
}

export function calculatePlayVelocity(
  current: SoundCloudTrackStats,
  previous?: SoundCloudTrackStats
): number {
  if (!previous) {
    return current.plays;
  }

  const currentTime = new Date(current.capturedAt).getTime();
  const previousTime = new Date(previous.capturedAt).getTime();
  const hours = Math.max((currentTime - previousTime) / 36e5, 1);
  const playDelta = Math.max(current.plays - previous.plays, 0);

  return round(playDelta / hours, 2);
}

export function calculateGrowthScore(
  current: SoundCloudTrackStats,
  previous?: SoundCloudTrackStats
): number {
  const engagement = calculateEngagementRatio(current);
  const velocity = calculatePlayVelocity(current, previous);
  const normalizedVelocity = clamp(velocity / 100);

  return round(clamp(engagement * 0.6 + normalizedVelocity * 0.4));
}
