export type AudioRuntime = {
  inspectAudio(inputPath: string): Promise<{
    durationSeconds: number;
    sampleRate?: number;
    channels?: number;
  }>;
};
