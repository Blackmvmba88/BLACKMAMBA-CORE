import { describe, expect, it } from "vitest";
import { calculateTrackMomentum, calculateTrackVelocity, parseSoundCloudJson } from "../src";

describe("SoundCloud momentum metrics", () => {
  it("calculates velocity and momentum from two snapshots", () => {
    const previous = {
      trackId: "sc_001",
      capturedAt: "2026-05-18T10:00:00.000Z",
      plays: 1000,
      likes: 80,
      reposts: 10,
      comments: 10
    };
    const current = {
      ...previous,
      capturedAt: "2026-05-18T20:00:00.000Z",
      plays: 1500,
      likes: 140,
      reposts: 22,
      comments: 18
    };

    expect(calculateTrackVelocity(current, previous)).toBe(50);
    expect(calculateTrackMomentum(current, previous)).toBe(0.379);
  });

  it("builds metric snapshots from JSON import", () => {
    const result = parseSoundCloudJson(
      {
        stats: [
          {
            trackId: "sc_001",
            capturedAt: "2026-05-18T10:00:00.000Z",
            plays: 1000,
            likes: 80,
            reposts: 10,
            comments: 10
          },
          {
            trackId: "sc_001",
            capturedAt: "2026-05-18T20:00:00.000Z",
            plays: 1500,
            likes: 140,
            reposts: 22,
            comments: 18
          }
        ]
      },
      { importedAt: "2026-05-18T20:00:00.000Z" }
    );

    expect(result.stats).toHaveLength(2);
    expect(result.snapshots[1].velocity).toBe(50);
    expect(result.unmatched).toHaveLength(2);
  });
});
