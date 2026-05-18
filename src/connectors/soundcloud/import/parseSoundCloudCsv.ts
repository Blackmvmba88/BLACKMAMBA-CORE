import { parseCsvObjects } from "../../../lib/csv";
import type { SoundCloudNormalizedStats, SoundCloudRawCsvRow } from "../../../types/soundcloud";
import { normalizeSoundCloudStats } from "./normalizeSoundCloudStats";

export function parseSoundCloudCsv(csv: string, importedAt = new Date().toISOString()): SoundCloudNormalizedStats[] {
  return parseCsvObjects(csv).map((row) => normalizeSoundCloudStats(mapRow(row), importedAt));
}

function mapRow(row: Record<string, string>): SoundCloudRawCsvRow {
  return {
    trackId: row.trackId || row.id || row.soundcloudTrackId,
    title: row.title,
    artist: row.artist,
    permalinkUrl: row.permalinkUrl || row.url,
    capturedAt: row.capturedAt || row.date,
    plays: row.plays,
    likes: row.likes,
    reposts: row.reposts,
    comments: row.comments,
    downloads: row.downloads
  };
}
