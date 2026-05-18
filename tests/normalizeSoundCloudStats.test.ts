import { describe, expect, it } from "vitest";
import { normalizeSoundCloudStats } from "../src";

describe("normalizeSoundCloudStats", () => {
  it("normalizes missing ids and missing capture times", () => {
    const stats = normalizeSoundCloudStats(
      {
        title: "Signal After Dark",
        artist: "BLACKMAMBA",
        plays: "320",
        likes: "18",
        reposts: "2",
        comments: "5"
      },
      "2026-05-18T20:00:00.000Z"
    );

    expect(stats.trackId).toBe("signal-after-dark");
    expect(stats.capturedAt).toBe("2026-05-18T20:00:00.000Z");
    expect(stats.plays).toBe(320);
  });
});
