import type { SoundCloudImportOptions, SoundCloudImportResult, SoundCloudNormalizedStats } from "../../../types/soundcloud";
import { calculateAudienceSpread } from "../../../core/metrics/soundcloud/calculateAudienceSpread";
import { calculateSoundCloudEngagement } from "../../../core/metrics/soundcloud/calculateSoundCloudEngagement";
import { calculateTrackMomentum } from "../../../core/metrics/soundcloud/calculateTrackMomentum";
import { calculateTrackVelocity } from "../../../core/metrics/soundcloud/calculateTrackVelocity";
import { matchSoundCloudTrackToCatalog } from "./matchSoundCloudTrackToCatalog";
import { normalizeSoundCloudStats } from "./normalizeSoundCloudStats";

export function parseSoundCloudJson(
  input: unknown,
  options: SoundCloudImportOptions = {}
): SoundCloudImportResult {
  const importedAt = options.importedAt ?? new Date().toISOString();
  const rows = Array.isArray(input) ? input : readStatsArray(input);
  const stats = rows.map((row) => normalizeSoundCloudStats(row as SoundCloudNormalizedStats, importedAt));
  const matches = stats.map((item) => matchSoundCloudTrackToCatalog(item, options.catalog));
  const snapshots = stats.map((item, index) => {
    const previous = findPreviousSnapshot(stats, item, index);

    return {
      stats: item,
      engagement: calculateSoundCloudEngagement(item),
      velocity: calculateTrackVelocity(item, previous),
      audienceSpread: calculateAudienceSpread(item),
      momentum: calculateTrackMomentum(item, previous)
    };
  });

  return {
    importedAt,
    stats,
    matches,
    snapshots,
    unmatched: stats.filter((item) => {
      const match = matches.find((candidate) => candidate.soundCloudTrackId === item.trackId);
      return !match?.catalogTrackId;
    })
  };
}

function readStatsArray(input: unknown): unknown[] {
  if (input && typeof input === "object" && "stats" in input) {
    const stats = (input as { stats?: unknown }).stats;
    return Array.isArray(stats) ? stats : [];
  }

  return [];
}

function findPreviousSnapshot(
  stats: SoundCloudNormalizedStats[],
  current: SoundCloudNormalizedStats,
  currentIndex: number
): SoundCloudNormalizedStats | undefined {
  return stats
    .slice(0, currentIndex)
    .filter((candidate) => candidate.trackId === current.trackId)
    .at(-1);
}
