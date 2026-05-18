import type { VocalSession } from "../../types/music";

export type VocalRuntime = {
  analyzeSession(inputPath: string, trackId: string): Promise<VocalSession>;
};
