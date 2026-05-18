import { clamp, round } from "../../lib/math";
import type { VocalMetrics } from "../../types/music";

export function calculateVocalScore(metrics: VocalMetrics): number {
  const weights: Record<keyof VocalMetrics, number> = {
    pitchStability: 0.22,
    timingAccuracy: 0.2,
    dynamicControl: 0.18,
    clarity: 0.18,
    emotionalDelivery: 0.22
  };

  const score = Object.entries(weights).reduce((total, [key, weight]) => {
    return total + clamp(metrics[key as keyof VocalMetrics]) * weight;
  }, 0);

  return round(score);
}
