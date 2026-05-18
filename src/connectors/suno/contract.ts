import type { SunoGeneration } from "../../types/music";

export type SunoConnector = {
  getGeneration(id: string): Promise<SunoGeneration | null>;
};
