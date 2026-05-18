# Architecture

BLACKMAMBA CORE is organized as a layered domain core. The repo starts with pure TypeScript modules before any UI, server, authentication, or automation.

## Layer 1 - Song Registry

Normalizes and tracks songs as durable catalog entities.

## Layer 2 - Data Model

Defines tracks, sources, generations, SoundCloud stats, vocal sessions, audience metrics, recommendations, and graph nodes.

## Layer 3 - Metrics Engine

Turns raw measurements into stable derived values:

- engagement ratio
- play velocity
- growth score
- vocal score

## Layer 4 - Vocal Runtime Contracts

Defines how future vocal capture and analysis can report sessions without coupling the domain model to one recorder or analyzer.

## Layer 5 - Suno Connector Contract

Defines where Suno generation metadata belongs. No scraping or private API access exists in v0.1.

## Layer 6 - SoundCloud Connector Contract

Defines where public track stats snapshots belong. No scraping, auth, or private API access exists in v0.1.

## Layer 7 - Recommendation Engine

Generates explainable strategic recommendations from available catalog, audience, and vocal evidence.

## Layer 8 - Music Graph

Models songs as living nodes that can later connect by version, source, theme, status, performance, and audience behavior.
