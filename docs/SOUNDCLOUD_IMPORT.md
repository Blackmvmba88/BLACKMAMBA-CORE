# SoundCloud Metrics Import

v0.3 adds manual SoundCloud metrics import. The system can accept exported or pasted CSV/JSON data, normalize it, match it to the catalog, and calculate performance signals.

No scraping, auth, private APIs, or UI are included.

## CSV Input

Supported headers:

```txt
trackId,title,artist,permalinkUrl,capturedAt,plays,likes,reposts,comments,downloads
```

Aliases:

- `id` or `soundcloudTrackId` can replace `trackId`.
- `url` can replace `permalinkUrl`.
- `date` can replace `capturedAt`.

## JSON Input

JSON import accepts either an array of stats rows or an object with a `stats` array.

```json
{
  "stats": [
    {
      "trackId": "soundcloud_track_001",
      "title": "Midnight Serpent",
      "artist": "BLACKMAMBA",
      "plays": 1200,
      "likes": 92,
      "reposts": 14,
      "comments": 11,
      "capturedAt": "2026-05-18T20:00:00.000Z"
    }
  ]
}
```

## Normalization

The importer converts numbers with commas, fills missing capture time from the import time, and creates a stable track id from title when needed.

## Catalog Matching

Matching order:

1. SoundCloud source external id.
2. SoundCloud permalink URL.
3. Title and artist.
4. Unmatched.

Each match returns a confidence score and reason.

## Metrics

- engagement: `(likes + reposts + comments) / plays`
- velocity: play delta per hour when a previous snapshot exists
- audience spread: how many interaction types are present
- momentum: weighted score from engagement, velocity, and spread
