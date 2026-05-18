import type { Recommendation, Track } from "../../types/music";
import { calculateGrowthScore } from "../metrics/audience";
import { calculateVocalScore } from "../metrics/vocal";

export function generateBasicRecommendations(track: Track): Recommendation[] {
  const createdAt = new Date().toISOString();
  const recommendations: Recommendation[] = [];
  const latestStats = track.soundCloudStats?.at(-1);
  const previousStats = track.soundCloudStats?.at(-2);
  const latestVocal = track.vocalSessions?.at(-1);

  if (!track.lyrics?.trim()) {
    recommendations.push(buildRecommendation(track.id, "medium", "metadata", "Add lyrics", "Lyrics are missing, so catalog context and later analysis are weaker.", createdAt));
  }

  if (latestStats) {
    const growthScore = calculateGrowthScore(latestStats, previousStats);
    if (growthScore >= 0.25) {
      recommendations.push(buildRecommendation(track.id, "high", "promotion", "Promote active track", "Recent audience response is strong enough to justify a focused promotion push.", createdAt));
    }
  }

  if (latestVocal) {
    const vocalScore = calculateVocalScore(latestVocal.metrics);
    if (vocalScore < 0.7) {
      recommendations.push(buildRecommendation(track.id, "medium", "vocal", "Schedule another vocal take", "The latest vocal session leaves room for a stronger performance capture.", createdAt));
    }
  }

  if (!track.sunoGeneration) {
    recommendations.push(buildRecommendation(track.id, "low", "catalog", "Attach origin context", "The song has no Suno generation metadata yet.", createdAt));
  }

  return recommendations;
}

function buildRecommendation(
  trackId: string,
  priority: Recommendation["priority"],
  category: Recommendation["category"],
  title: string,
  rationale: string,
  createdAt: string
): Recommendation {
  return {
    id: `${trackId}-${category}-${title.toLowerCase().replaceAll(" ", "-")}`,
    trackId,
    priority,
    category,
    title,
    rationale,
    createdAt
  };
}
