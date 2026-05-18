import type { Catalog } from "../../../types/catalog";
import type { SoundCloudNormalizedStats, SoundCloudTrackMatch } from "../../../types/soundcloud";

export function matchSoundCloudTrackToCatalog(
  stats: SoundCloudNormalizedStats,
  catalog?: Catalog
): SoundCloudTrackMatch {
  if (!catalog) {
    return unmatched(stats.trackId);
  }

  const byExternalId = catalog.records.find((record) =>
    record.track.sources.some((source) => source.kind === "soundcloud" && source.externalId === stats.trackId)
  );

  if (byExternalId) {
    return matched(stats.trackId, byExternalId.track.id, 1, "source-external-id");
  }

  const byPermalink = stats.permalinkUrl
    ? catalog.records.find((record) => record.track.sources.some((source) => source.url === stats.permalinkUrl))
    : undefined;

  if (byPermalink) {
    return matched(stats.trackId, byPermalink.track.id, 0.95, "permalink-url");
  }

  const title = normalize(stats.title);
  const artist = normalize(stats.artist);
  const byTitleArtist = catalog.records.find((record) => {
    return normalize(record.track.title) === title && normalize(record.track.artist) === artist;
  });

  if (byTitleArtist && title && artist) {
    return matched(stats.trackId, byTitleArtist.track.id, 0.82, "title-artist");
  }

  return unmatched(stats.trackId);
}

function matched(
  soundCloudTrackId: string,
  catalogTrackId: string,
  confidence: number,
  reason: SoundCloudTrackMatch["reason"]
): SoundCloudTrackMatch {
  return { soundCloudTrackId, catalogTrackId, confidence, reason };
}

function unmatched(soundCloudTrackId: string): SoundCloudTrackMatch {
  return { soundCloudTrackId, confidence: 0, reason: "unmatched" };
}

function normalize(value?: string): string {
  return value?.trim().toLowerCase() ?? "";
}
