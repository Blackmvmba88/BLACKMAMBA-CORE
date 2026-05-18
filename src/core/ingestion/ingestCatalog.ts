import { normalizeTrack } from "../song-registry/normalizeTrack";
import type {
  CatalogIngestionError,
  CatalogIngestionResult,
  ManualCatalogInput,
  ManualTrackInput
} from "../../types/catalog";
import type { SongLifecycleStatus, Track, TrackSource } from "../../types/music";
import { createCatalog } from "../catalog/catalog";
import { parseCatalogCsv } from "./csv";

const validStatuses: SongLifecycleStatus[] = [
  "draft",
  "generated",
  "selected",
  "released",
  "monitoring",
  "optimizing",
  "archived"
];

const validSourceKinds: TrackSource["kind"][] = ["suno", "soundcloud", "manual", "import"];

export function ingestCatalogJson(input: ManualCatalogInput, now = new Date().toISOString()): CatalogIngestionResult {
  return ingestManualTracks(input.catalogId, input.name, input.tracks, "json", input.importedAt ?? now);
}

export function ingestCatalogCsv(
  catalogId: string,
  name: string,
  csv: string,
  now = new Date().toISOString()
): CatalogIngestionResult {
  return ingestManualTracks(catalogId, name, parseCatalogCsv(csv), "csv", now);
}

function ingestManualTracks(
  catalogId: string,
  name: string,
  inputs: ManualTrackInput[],
  ingestionSource: "json" | "csv",
  importedAt: string
): CatalogIngestionResult {
  const errors: CatalogIngestionError[] = [];
  const tracks: Track[] = [];

  inputs.forEach((input, index) => {
    const validationErrors = validateManualTrack(input, index);

    if (validationErrors.length) {
      errors.push(...validationErrors);
      return;
    }

    tracks.push(manualTrackToTrack(input, importedAt));
  });

  return {
    catalog: createCatalog(catalogId, name, tracks, ingestionSource, importedAt),
    accepted: tracks.length,
    rejected: errors.length ? inputs.length - tracks.length : 0,
    errors
  };
}

function validateManualTrack(input: ManualTrackInput, index: number): CatalogIngestionError[] {
  const errors: CatalogIngestionError[] = [];

  if (!input.title?.trim()) {
    errors.push({ index, field: "title", message: "Track title is required." });
  }

  if (!input.artist?.trim()) {
    errors.push({ index, field: "artist", message: "Track artist is required." });
  }

  if (input.status && !validStatuses.includes(input.status)) {
    errors.push({ index, field: "status", message: `Unsupported status: ${input.status}.` });
  }

  if (input.sourceKind && !validSourceKinds.includes(input.sourceKind)) {
    errors.push({ index, field: "sourceKind", message: `Unsupported source kind: ${input.sourceKind}.` });
  }

  return errors;
}

function manualTrackToTrack(input: ManualTrackInput, importedAt: string): Track {
  const id = input.id?.trim() || slugify(`${input.artist}-${input.title}`);
  const sourceKind = input.sourceKind ?? "manual";
  const source: TrackSource = {
    kind: sourceKind,
    externalId: input.sourceExternalId,
    url: input.sourceUrl,
    createdAt: input.createdAt ?? importedAt
  };

  return normalizeTrack({
    id,
    title: input.title,
    artist: input.artist,
    status: input.status ?? "draft",
    sources: [source],
    lyrics: input.lyrics,
    versions: [input.version ?? "v0"],
    createdAt: input.createdAt ?? importedAt,
    updatedAt: input.updatedAt ?? importedAt
  }, input.updatedAt ?? importedAt);
}

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
