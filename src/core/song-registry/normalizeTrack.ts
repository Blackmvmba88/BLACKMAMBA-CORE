import type { Track } from "../../types/music";

export function normalizeTrack(track: Track): Track {
  const now = new Date().toISOString();
  const title = track.title.trim();
  const artist = track.artist.trim();

  return {
    ...track,
    title,
    artist,
    status: track.status ?? "draft",
    sources: track.sources ?? [],
    soundCloudStats: track.soundCloudStats ?? [],
    vocalSessions: track.vocalSessions ?? [],
    recommendations: track.recommendations ?? [],
    versions: track.versions?.length ? track.versions : ["v0"],
    createdAt: track.createdAt || now,
    updatedAt: now
  };
}
