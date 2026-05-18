# Data Model

## Track

Primary catalog entity. A track can have Suno origin data, SoundCloud publication stats, lyrics, vocal sessions, audience metrics, recommendations, versions, and operational status.

## TrackSource

Describes where a track came from or where it exists externally.

## SunoGeneration

Stores generation metadata: prompt, style tags, model, timestamp, duration, and optional source URL.

## SoundCloudTrackStats

Stores captured audience snapshots: plays, likes, reposts, comments, downloads, permalink, and capture time.

## VocalSession

Stores one vocal take or analysis session.

## VocalMetrics

Scores pitch stability, timing accuracy, dynamic control, clarity, and emotional delivery from 0 to 1.

## AudienceMetrics

Stores derived metrics from SoundCloud snapshots.

## Recommendation

Explainable strategic action connected to one track.

## MusicGraphNode

Compact graph representation of a track's current intelligence state.

## SongLifecycleStatus

Operational state for the song:

- draft
- generated
- selected
- released
- monitoring
- optimizing
- archived
