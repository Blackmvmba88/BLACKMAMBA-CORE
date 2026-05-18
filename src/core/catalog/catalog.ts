import type { Catalog, CatalogSummary, CatalogTrackRecord } from "../../types/catalog";
import type { Track } from "../../types/music";

export function createCatalog(
  id: string,
  name: string,
  tracks: Track[] = [],
  ingestionSource: CatalogTrackRecord["ingestionSource"] = "json",
  now = new Date().toISOString()
): Catalog {
  return {
    id,
    name,
    createdAt: now,
    updatedAt: now,
    records: tracks.map((track) => ({
      track,
      importedAt: now,
      ingestionSource
    }))
  };
}

export function upsertCatalogTrack(catalog: Catalog, track: Track, now = new Date().toISOString()): Catalog {
  const existingIndex = catalog.records.findIndex((record) => record.track.id === track.id);
  const records = [...catalog.records];
  const nextRecord: CatalogTrackRecord = {
    track,
    importedAt: existingIndex >= 0 ? records[existingIndex].importedAt : now,
    ingestionSource: existingIndex >= 0 ? records[existingIndex].ingestionSource : "json"
  };

  if (existingIndex >= 0) {
    records[existingIndex] = nextRecord;
  } else {
    records.push(nextRecord);
  }

  return {
    ...catalog,
    updatedAt: now,
    records
  };
}

export function findCatalogTrack(catalog: Catalog, trackId: string): Track | undefined {
  return catalog.records.find((record) => record.track.id === trackId)?.track;
}

export function summarizeCatalog(catalog: Catalog): CatalogSummary {
  return catalog.records.reduce<CatalogSummary>(
    (summary, record) => {
      summary.totalTracks += 1;
      summary.byStatus[record.track.status] = (summary.byStatus[record.track.status] ?? 0) + 1;

      record.track.sources.forEach((source) => {
        summary.bySourceKind[source.kind] = (summary.bySourceKind[source.kind] ?? 0) + 1;
      });

      return summary;
    },
    {
      totalTracks: 0,
      byStatus: {},
      bySourceKind: {}
    }
  );
}
