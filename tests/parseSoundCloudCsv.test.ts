import { describe, expect, it } from "vitest";
import { parseSoundCloudCsv } from "../src";

describe("parseSoundCloudCsv", () => {
  it("parses manual SoundCloud CSV exports with numeric commas", () => {
    const csv = [
      "trackId,title,artist,permalinkUrl,capturedAt,plays,likes,reposts,comments,downloads",
      "sc_001,Midnight Serpent,BLACKMAMBA,https://soundcloud.com/blackmamba/midnight-serpent,2026-05-18T20:00:00.000Z,\"1,200\",92,14,11,0"
    ].join("\n");

    const [stats] = parseSoundCloudCsv(csv);

    expect(stats.trackId).toBe("sc_001");
    expect(stats.plays).toBe(1200);
    expect(stats.likes).toBe(92);
    expect(stats.permalinkUrl).toContain("midnight-serpent");
  });
});
