import type { SongLifecycleStatus, Track, TrackSource } from "./music";

export type ManualTrackInput = {
  id?: string;
  title: string;
  artist: string;
  status?: SongLifecycleStatus;
  sourceKind?: TrackSource["kind"];
  sourceExternalId?: string;
  sourceUrl?: string;
  lyrics?: string;
  version?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ManualCatalogInput = {
  catalogId: string;
  name: string;
  importedAt?: string;
  tracks: ManualTrackInput[];
};

export type CatalogTrackRecord = {
  track: Track;
  importedAt: string;
  ingestionSource: "json" | "csv";
};

export type Catalog = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  records: CatalogTrackRecord[];
};

export type CatalogIngestionError = {
  index: number;
  field: string;
  message: string;
};

export type CatalogIngestionResult = {
  catalog: Catalog;
  accepted: number;
  rejected: number;
  errors: CatalogIngestionError[];
};

export type CatalogSummary = {
  totalTracks: number;
  byStatus: Partial<Record<SongLifecycleStatus, number>>;
  bySourceKind: Partial<Record<TrackSource["kind"], number>>;
};
