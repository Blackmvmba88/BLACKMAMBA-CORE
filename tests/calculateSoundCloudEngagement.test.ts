import { describe, expect, it } from "vitest";
import { calculateAudienceSpread, calculateSoundCloudEngagement } from "../src";

describe("SoundCloud engagement metrics", () => {
  it("calculates engagement and audience spread", () => {
    const stats = {
      trackId: "sc_001",
      capturedAt: "2026-05-18T20:00:00.000Z",
      plays: 1000,
      likes: 80,
      reposts: 10,
      comments: 10,
      downloads: 0
    };

    expect(calculateSoundCloudEngagement(stats)).toBe(0.1);
    expect(calculateAudienceSpread(stats)).toBe(0.75);
  });
});
