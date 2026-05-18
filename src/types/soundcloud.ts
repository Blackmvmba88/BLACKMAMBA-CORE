import type { Catalog } from "./catalog";
import type { SoundCloudTrackStats } from "./music";

export type SoundCloudRawCsvRow = {
  trackId?: string;
  title?: string;
  artist?: string;
  permalinkUrl?: string;
  capturedAt?: string;
  plays?: string;
  likes?: string;
  reposts?: string;
  comments?: string;
  downloads?: string;
};

export type SoundCloudNormalizedStats = SoundCloudTrackStats & {
  title?: string;
  artist?: string;
};

export type SoundCloudMetricSnapshot = {
  stats: SoundCloudNormalizedStats;
  engagement: number;
  velocity: number;
  audienceSpread: number;
  momentum: number;
};

export type SoundCloudTrackMatch = {
  soundCloudTrackId: string;
  catalogTrackId?: string;
  confidence: number;
  reason: "source-external-id" | "permalink-url" | "title-artist" | "unmatched";
};

export type SoundCloudImportResult = {
  importedAt: string;
  stats: SoundCloudNormalizedStats[];
  matches: SoundCloudTrackMatch[];
  snapshots: SoundCloudMetricSnapshot[];
  unmatched: SoundCloudNormalizedStats[];
};

export type SoundCloudImportOptions = {
  importedAt?: string;
  catalog?: Catalog;
};
