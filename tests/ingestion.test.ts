import { describe, expect, it } from "vitest";
import {
  findCatalogTrack,
  ingestCatalogCsv,
  ingestCatalogJson,
  parseCatalogCsv,
  summarizeCatalog,
  upsertCatalogTrack,
  type ManualCatalogInput,
  type Track
} from "../src";

const importedAt = "2026-05-18T20:00:00.000Z";

describe("manual catalog ingestion", () => {
  it("ingests JSON catalog tracks into normalized catalog records", () => {
    const input: ManualCatalogInput = {
      catalogId: "blackmamba-main",
      name: "BLACKMAMBA Main Catalog",
      importedAt,
      tracks: [
        {
          id: "track_midnight_serpent",
          title: "  Midnight Serpent  ",
          artist: "  BLACKMAMBA  ",
          status: "monitoring",
          sourceKind: "suno",
          sourceExternalId: "suno_gen_001",
          version: "v0.1"
        }
      ]
    };

    const result = ingestCatalogJson(input);

    expect(result.accepted).toBe(1);
    expect(result.rejected).toBe(0);
    expect(result.errors).toEqual([]);
    expect(result.catalog.records[0].track.title).toBe("Midnight Serpent");
    expect(result.catalog.records[0].track.sources[0].kind).toBe("suno");
    expect(result.catalog.records[0].track.versions).toEqual(["v0.1"]);
  });

  it("reports validation errors without rejecting the full import", () => {
    const result = ingestCatalogJson({
      catalogId: "blackmamba-main",
      name: "BLACKMAMBA Main Catalog",
      importedAt,
      tracks: [
        { title: "", artist: "BLACKMAMBA" },
        { title: "Valid Track", artist: "BLACKMAMBA", sourceKind: "manual" }
      ]
    });

    expect(result.accepted).toBe(1);
    expect(result.rejected).toBe(1);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toMatchObject({ index: 0, field: "title" });
  });

  it("parses CSV rows with quoted commas and ingests them", () => {
    const csv = [
      "id,title,artist,status,sourceKind,lyrics",
      "track_signal,\"Signal, After Dark\",BLACKMAMBA,draft,manual,\"Hook with comma, still one lyric\""
    ].join("\n");

    const parsed = parseCatalogCsv(csv);
    const result = ingestCatalogCsv("blackmamba-main", "BLACKMAMBA Main Catalog", csv, importedAt);

    expect(parsed[0].title).toBe("Signal, After Dark");
    expect(result.accepted).toBe(1);
    expect(result.catalog.records[0].track.lyrics).toBe("Hook with comma, still one lyric");
  });
});

describe("catalog operations", () => {
  it("finds, upserts, and summarizes catalog tracks", () => {
    const result = ingestCatalogJson({
      catalogId: "blackmamba-main",
      name: "BLACKMAMBA Main Catalog",
      importedAt,
      tracks: [
        { id: "track_001", title: "One", artist: "BLACKMAMBA", status: "released", sourceKind: "soundcloud" },
        { id: "track_002", title: "Two", artist: "BLACKMAMBA", status: "draft", sourceKind: "manual" }
      ]
    });
    const replacement: Track = {
      ...result.catalog.records[1].track,
      title: "Two Updated",
      status: "selected"
    };

    const updated = upsertCatalogTrack(result.catalog, replacement, "2026-05-18T21:00:00.000Z");
    const summary = summarizeCatalog(updated);

    expect(findCatalogTrack(updated, "track_002")?.title).toBe("Two Updated");
    expect(updated.records).toHaveLength(2);
    expect(summary.totalTracks).toBe(2);
    expect(summary.byStatus.released).toBe(1);
    expect(summary.byStatus.selected).toBe(1);
    expect(summary.bySourceKind.soundcloud).toBe(1);
    expect(summary.bySourceKind.manual).toBe(1);
  });
});
