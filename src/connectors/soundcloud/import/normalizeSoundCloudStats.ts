import type { SoundCloudNormalizedStats, SoundCloudRawCsvRow } from "../../../types/soundcloud";

export function normalizeSoundCloudStats(
  input: SoundCloudRawCsvRow | SoundCloudNormalizedStats,
  fallbackCapturedAt = new Date().toISOString()
): SoundCloudNormalizedStats {
  const trackId = readString(input.trackId) || slugify(readString(input.title) || "soundcloud-track");

  return {
    trackId,
    title: readString(input.title),
    artist: readString(input.artist),
    permalinkUrl: readString(input.permalinkUrl),
    capturedAt: readString(input.capturedAt) || fallbackCapturedAt,
    plays: readNumber(input.plays),
    likes: readNumber(input.likes),
    reposts: readNumber(input.reposts),
    comments: readNumber(input.comments),
    downloads: readOptionalNumber(input.downloads)
  };
}

function readString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function readNumber(value: unknown): number {
  if (typeof value === "number") {
    return Number.isFinite(value) ? Math.max(value, 0) : 0;
  }

  if (typeof value === "string") {
    const normalized = Number(value.replaceAll(",", "").trim());
    return Number.isFinite(normalized) ? Math.max(normalized, 0) : 0;
  }

  return 0;
}

function readOptionalNumber(value: unknown): number | undefined {
  if (value === undefined || value === "") {
    return undefined;
  }

  return readNumber(value);
}

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
