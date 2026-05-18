export type SongLifecycleStatus =
  | "draft"
  | "generated"
  | "selected"
  | "released"
  | "monitoring"
  | "optimizing"
  | "archived";

export type TrackSource = {
  kind: "suno" | "soundcloud" | "manual" | "import";
  externalId?: string;
  url?: string;
  createdAt?: string;
};

export type SunoGeneration = {
  id: string;
  prompt: string;
  model?: string;
  generatedAt: string;
  durationSeconds?: number;
  styleTags: string[];
  sourceUrl?: string;
};

export type SoundCloudTrackStats = {
  trackId: string;
  permalinkUrl?: string;
  capturedAt: string;
  plays: number;
  likes: number;
  reposts: number;
  comments: number;
  downloads?: number;
};

export type VocalMetrics = {
  pitchStability: number;
  timingAccuracy: number;
  dynamicControl: number;
  clarity: number;
  emotionalDelivery: number;
};

export type VocalSession = {
  id: string;
  trackId: string;
  recordedAt: string;
  takeLabel?: string;
  metrics: VocalMetrics;
  notes?: string;
};

export type AudienceMetrics = {
  engagementRatio: number;
  playVelocity: number;
  growthScore: number;
};

export type Recommendation = {
  id: string;
  trackId: string;
  priority: "low" | "medium" | "high";
  category: "catalog" | "release" | "vocal" | "promotion" | "metadata";
  title: string;
  rationale: string;
  createdAt: string;
};

export type Track = {
  id: string;
  title: string;
  artist: string;
  status: SongLifecycleStatus;
  sources: TrackSource[];
  lyrics?: string;
  sunoGeneration?: SunoGeneration;
  soundCloudStats?: SoundCloudTrackStats[];
  vocalSessions?: VocalSession[];
  audienceMetrics?: AudienceMetrics;
  recommendations?: Recommendation[];
  versions: string[];
  createdAt: string;
  updatedAt: string;
};

export type MusicGraphNode = {
  trackId: string;
  status: SongLifecycleStatus;
  sourceKinds: TrackSource["kind"][];
  hasLyrics: boolean;
  hasVocalSessions: boolean;
  hasAudienceMetrics: boolean;
  recommendationCount: number;
};
