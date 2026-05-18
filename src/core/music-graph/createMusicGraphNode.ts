import type { MusicGraphNode, Track } from "../../types/music";

export function createMusicGraphNode(track: Track): MusicGraphNode {
  return {
    trackId: track.id,
    status: track.status,
    sourceKinds: [...new Set(track.sources.map((source) => source.kind))],
    hasLyrics: Boolean(track.lyrics?.trim()),
    hasVocalSessions: Boolean(track.vocalSessions?.length),
    hasAudienceMetrics: Boolean(track.audienceMetrics),
    recommendationCount: track.recommendations?.length ?? 0
  };
}
