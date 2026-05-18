import type { ManualTrackInput } from "../../types/catalog";
import { emptyToUndefined, parseCsvObjects } from "../../lib/csv";

export function parseCatalogCsv(csv: string): ManualTrackInput[] {
  return parseCsvObjects(csv).map((record) => {
    return {
      id: emptyToUndefined(record.id),
      title: record.title,
      artist: record.artist,
      status: emptyToUndefined(record.status) as ManualTrackInput["status"],
      sourceKind: emptyToUndefined(record.sourceKind) as ManualTrackInput["sourceKind"],
      sourceExternalId: emptyToUndefined(record.sourceExternalId),
      sourceUrl: emptyToUndefined(record.sourceUrl),
      lyrics: emptyToUndefined(record.lyrics),
      version: emptyToUndefined(record.version),
      createdAt: emptyToUndefined(record.createdAt),
      updatedAt: emptyToUndefined(record.updatedAt)
    };
  });
}
