import { describe, expect, it } from "vitest";
import { ingestCatalogJson, matchSoundCloudTrackToCatalog } from "../src";

describe("matchSoundCloudTrackToCatalog", () => {
  it("matches by SoundCloud source external id first", () => {
    const result = ingestCatalogJson({
      catalogId: "blackmamba-main",
      name: "BLACKMAMBA Main Catalog",
      importedAt: "2026-05-18T20:00:00.000Z",
      tracks: [
        {
          id: "track_midnight_serpent",
          title: "Midnight Serpent",
          artist: "BLACKMAMBA",
          sourceKind: "soundcloud",
          sourceExternalId: "sc_001"
        }
      ]
    });

    const match = matchSoundCloudTrackToCatalog(
      {
        trackId: "sc_001",
        title: "Different Title",
        artist: "BLACKMAMBA",
        capturedAt: "2026-05-18T20:00:00.000Z",
        plays: 1200,
        likes: 92,
        reposts: 14,
        comments: 11
      },
      result.catalog
    );

    expect(match.catalogTrackId).toBe("track_midnight_serpent");
    expect(match.confidence).toBe(1);
    expect(match.reason).toBe("source-external-id");
  });

  it("falls back to title and artist when no SoundCloud source exists", () => {
    const result = ingestCatalogJson({
      catalogId: "blackmamba-main",
      name: "BLACKMAMBA Main Catalog",
      importedAt: "2026-05-18T20:00:00.000Z",
      tracks: [{ id: "track_signal", title: "Signal After Dark", artist: "BLACKMAMBA" }]
    });

    const match = matchSoundCloudTrackToCatalog(
      {
        trackId: "sc_002",
        title: "Signal After Dark",
        artist: "BLACKMAMBA",
        capturedAt: "2026-05-18T20:00:00.000Z",
        plays: 320,
        likes: 18,
        reposts: 2,
        comments: 5
      },
      result.catalog
    );

    expect(match.catalogTrackId).toBe("track_signal");
    expect(match.reason).toBe("title-artist");
  });
});
