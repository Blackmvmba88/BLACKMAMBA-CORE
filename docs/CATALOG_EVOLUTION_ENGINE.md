# Catalog Evolution Engine

BLACKMAMBA CORE should not only store songs and metrics.

It should help the artist understand which songs are alive, which songs are sleeping, which songs deserve a push, which songs need a new form, and which songs should quietly leave the active catalog.

The catalog is treated as a living musical organism.

Suno creates possibilities.
SoundCloud returns public signals.
BLACKMAMBA CORE interprets the pressure.
The artist decides.

## Core Principle

A song is not just an audio file.

A song is a living unit with:

- identity,
- mood,
- vocal evidence,
- genre DNA,
- release context,
- artwork context,
- audience response,
- platform behavior,
- historical trajectory,
- mutation potential.

The goal is not to blindly chase numbers.

The goal is to detect resonance.

## Catalog Evolution Loop

```text
Song Registry
      ↓
Manual / API Metrics Import
      ↓
Signal Normalization
      ↓
Catalog Fitness Score
      ↓
Decision Engine
      ↓
Artist Review
      ↓
Keep / Push / Remix / Rebrand / Retire
      ↓
Lineage Memory
```

## Song Genome

Each track should expose a compact genome that describes what it is and what it could become.

```ts
export type SongGenome = {
  songId: string;
  title: string;
  artist: string;
  origin: "suno" | "manual" | "studio" | "unknown";
  primaryGenre?: string;
  secondaryGenres?: string[];
  moodTags: string[];
  energy: number; // 0..1
  darkness: number; // 0..1
  danceability: number; // 0..1
  vocalPresence: number; // 0..1
  hookStrength?: number; // 0..1
  emotionalDepth?: number; // 0..1
  coverArtStyle?: string;
  language?: string;
  lineageParentIds?: string[];
};
```

This genome lets the system compare songs by emotional and structural identity, not only by title or upload date.

## Metric Signals

A track should be evaluated from multiple angles.

```ts
export type SongMetricSnapshot = {
  songId: string;
  capturedAt: string;
  plays: number;
  likes: number;
  comments: number;
  reposts: number;
  downloads?: number;
  saves?: number;
  playlistAdds?: number;
  sourcePlatform: "soundcloud" | "spotify" | "manual";
};
```

Derived signals:

- play velocity,
- like rate,
- comment rate,
- repost rate,
- save rate,
- playlist conversion,
- age-adjusted growth,
- catalog rank movement,
- sleeper reactivation,
- emotional cluster performance.

## Catalog Fitness Score

The fitness score estimates current catalog strength.

It should not be a vanity metric.

It should reward meaningful response, not only raw plays.

Example formula:

```text
fitness =
  play_velocity * 0.25 +
  engagement_rate * 0.25 +
  repost_signal * 0.15 +
  comment_signal * 0.10 +
  save_or_download_signal * 0.10 +
  age_adjusted_momentum * 0.10 +
  emotional_uniqueness * 0.05
```

Where:

```text
engagement_rate = (likes + comments + reposts + downloads) / max(plays, 1)
```

The engine should keep raw scores and interpreted labels separate.

## Decision Labels

The output should be human-readable.

```ts
export type CatalogDecision =
  | "keep_alive"
  | "push_now"
  | "watch_closely"
  | "remix_candidate"
  | "cover_art_refresh"
  | "playlist_candidate"
  | "spotify_candidate"
  | "let_sleep"
  | "retire_from_active_catalog";
```

Recommended behavior:

### `push_now`

Strong momentum. Promote, repost, add to playlists, create short-form content, or pair with new visuals.

### `watch_closely`

Early signal. Do not overreact. Check again after the next metrics import.

### `remix_candidate`

Good identity but weak execution or missed format. Consider a new version, genre mutation, shorter arrangement, stronger intro, or different vocal tone.

### `cover_art_refresh`

Audio has potential but presentation may be blocking response.

### `spotify_candidate`

Track has broader polish, emotional clarity, or replay potential beyond SoundCloud underground discovery.

### `let_sleep`

No urgent action. Keep in archive and observe.

### `retire_from_active_catalog`

Weak response across time and no strong identity reason to keep active.

Retirement does not mean deletion forever. It means removing the track from active strategic focus.

## Algorithm Wakeup Detector

Some songs sleep and later begin to breathe again.

The engine should detect delayed momentum.

Signals:

- sudden increase in plays after a quiet period,
- rising like rate on an older track,
- comments appearing after inactivity,
- geography shift,
- playlist movement,
- recurring daily plays without promotion,
- old track entering top catalog positions.

Possible output:

```ts
export type WakeupSignal = {
  songId: string;
  detectedAt: string;
  confidence: number;
  reason: string;
  suggestedAction: "push_now" | "watch_closely" | "playlist_candidate";
};
```

Interpretation:

```text
This track may be waking up.
Do not delete it.
Watch for a second confirmation snapshot.
```

## Lineage Memory

Songs can evolve.

A track may produce:

- remix,
- acoustic version,
- reggae/dub version,
- Japanese version,
- English version,
- cinematic version,
- short edit,
- extended version,
- instrumental version,
- alternate cover identity.

The system should remember parent-child relationships.

```ts
export type SongLineage = {
  parentSongId: string;
  childSongId: string;
  mutationType:
    | "remix"
    | "language_variant"
    | "genre_variant"
    | "cover_refresh"
    | "short_edit"
    | "extended_edit"
    | "instrumental"
    | "vocal_retake";
  createdAt: string;
  reason: string;
};
```

## Emotional Map

The catalog should be grouped by emotional families.

Examples:

```text
awakening
revenge
romantic pain
street survival
spiritual reggae
dark electronic
cinematic heroism
melancholic victory
```

This allows the recommendation engine to answer:

- which emotional lane is growing,
- which mood is saturated,
- which mood deserves a new release,
- which old tracks match a new creative direction,
- which songs belong together in a playlist.

## Minimum Viable Implementation

Phase 1 should stay manual and testable.

Inputs:

- song registry JSON,
- SoundCloud metrics CSV/JSON,
- optional manual tags.

Outputs:

- catalog fitness report,
- top songs by momentum,
- sleeper wakeup candidates,
- recommended actions,
- lineage suggestions.

No scraping required.
No auth required.
No private APIs required.

## Example Report

```json
{
  "generatedAt": "2026-05-28T00:00:00Z",
  "summary": {
    "catalogSize": 504,
    "activeCandidates": 27,
    "pushNow": 4,
    "wakeupSignals": 3,
    "retireCandidates": 18
  },
  "recommendations": [
    {
      "songId": "song_001",
      "title": "Cuando no tenia nada",
      "decision": "push_now",
      "confidence": 0.91,
      "reason": "High play velocity and strong engagement relative to catalog age."
    },
    {
      "songId": "song_144",
      "title": "Old Dub Signal",
      "decision": "watch_closely",
      "confidence": 0.73,
      "reason": "Older track showing fresh activity after a quiet period."
    }
  ]
}
```

## TypeScript Module Targets

Recommended future files:

```text
src/catalog-evolution/types.ts
src/catalog-evolution/fitness.ts
src/catalog-evolution/decisions.ts
src/catalog-evolution/wakeup.ts
src/catalog-evolution/lineage.ts
src/catalog-evolution/report.ts
tests/catalog-evolution/*.test.ts
```

## Operator Rule

BLACKMAMBA CORE recommends.

The artist decides.

The system should never erase creative intuition. It should reduce cognitive load, reveal hidden patterns, and protect songs that are quietly beginning to resonate.

## Long-Term Vision

BLACKMAMBA CORE becomes the central nervous system of BlackMamba RECORDS.

It connects:

- creation,
- catalog memory,
- audience response,
- visual identity,
- release strategy,
- platform behavior,
- emotional resonance,
- next-song recommendations.

The catalog becomes an evolving organism.

The strongest songs survive.
The sleeping songs are watched.
The promising songs mutate.
The weak signals leave the active battlefield.

The artist remains in command.
