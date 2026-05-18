import { describe, expect, it } from "vitest";
import {
  calculateEngagementRatio,
  calculateGrowthScore,
  calculatePlayVelocity,
  calculateVocalScore,
  createMusicGraphNode,
  generateBasicRecommendations,
  normalizeTrack,
  type Track,
  type VocalMetrics
} from "../src";

const baseTrack: Track = {
  id: "track_001",
  title: "  Midnight Serpent  ",
  artist: "  BLACKMAMBA  ",
  status: "released",
  sources: [{ kind: "suno", externalId: "gen_001" }],
  versions: [],
  createdAt: "2026-05-18T18:00:00.000Z",
  updatedAt: "2026-05-18T18:00:00.000Z"
};

describe("song registry", () => {
  it("normalizes track identity fields and collection defaults", () => {
    const normalized = normalizeTrack(baseTrack);

    expect(normalized.title).toBe("Midnight Serpent");
    expect(normalized.artist).toBe("BLACKMAMBA");
    expect(normalized.versions).toEqual(["v0"]);
    expect(normalized.soundCloudStats).toEqual([]);
    expect(normalized.vocalSessions).toEqual([]);
  });
});

describe("metrics", () => {
  it("calculates engagement ratio from SoundCloud stats", () => {
    expect(
      calculateEngagementRatio({
        trackId: "track_001",
        capturedAt: "2026-05-18T18:00:00.000Z",
        plays: 1000,
        likes: 80,
        reposts: 10,
        comments: 10
      })
    ).toBe(0.1);
  });

  it("calculates play velocity between snapshots", () => {
    const previous = {
      trackId: "track_001",
      capturedAt: "2026-05-18T10:00:00.000Z",
      plays: 800,
      likes: 40,
      reposts: 4,
      comments: 2
    };
    const current = {
      ...previous,
      capturedAt: "2026-05-18T18:00:00.000Z",
      plays: 1200
    };

    expect(calculatePlayVelocity(current, previous)).toBe(50);
  });

  it("calculates growth and vocal scores", () => {
    const current = {
      trackId: "track_001",
      capturedAt: "2026-05-18T18:00:00.000Z",
      plays: 1000,
      likes: 100,
      reposts: 20,
      comments: 10
    };
    const metrics: VocalMetrics = {
      pitchStability: 1,
      timingAccuracy: 0.8,
      dynamicControl: 0.7,
      clarity: 0.9,
      emotionalDelivery: 1
    };

    expect(calculateGrowthScore(current)).toBeGreaterThan(0);
    expect(calculateVocalScore(metrics)).toBe(0.888);
  });
});

describe("recommendations and graph", () => {
  it("generates explainable recommendations from missing and positive signals", () => {
    const recommendations = generateBasicRecommendations({
      ...baseTrack,
      title: "Midnight Serpent",
      artist: "BLACKMAMBA",
      soundCloudStats: [
        {
          trackId: "track_001",
          capturedAt: "2026-05-18T18:00:00.000Z",
          plays: 1000,
          likes: 90,
          reposts: 20,
          comments: 15
        }
      ]
    });

    expect(recommendations.map((item) => item.title)).toContain("Add lyrics");
    expect(recommendations.map((item) => item.title)).toContain("Promote active track");
  });

  it("creates a music graph node from track state", () => {
    const node = createMusicGraphNode({
      ...baseTrack,
      lyrics: "A real lyric",
      recommendations: [
        {
          id: "rec_001",
          trackId: "track_001",
          priority: "high",
          category: "promotion",
          title: "Promote active track",
          rationale: "Strong response.",
          createdAt: "2026-05-18T18:00:00.000Z"
        }
      ]
    });

    expect(node.sourceKinds).toEqual(["suno"]);
    expect(node.hasLyrics).toBe(true);
    expect(node.recommendationCount).toBe(1);
  });
});
