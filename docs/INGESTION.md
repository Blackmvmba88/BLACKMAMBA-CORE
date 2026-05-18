# Manual Catalog Ingestion

v0.2 adds manual catalog ingestion before any real account connection, scraping, private API, or UI.

The purpose is catalog awareness: BLACKMAMBA CORE should know what songs exist before it tries to automate anything.

## Supported Inputs

### JSON

JSON ingestion accepts a `ManualCatalogInput` object:

```json
{
  "catalogId": "blackmamba-main",
  "name": "BLACKMAMBA Main Catalog",
  "importedAt": "2026-05-18T20:00:00.000Z",
  "tracks": []
}
```

### CSV

CSV ingestion accepts these headers:

```txt
id,title,artist,status,sourceKind,sourceExternalId,sourceUrl,lyrics,version,createdAt,updatedAt
```

Required fields:

- `title`
- `artist`

Optional fields:

- `id`
- `status`
- `sourceKind`
- `sourceExternalId`
- `sourceUrl`
- `lyrics`
- `version`
- `createdAt`
- `updatedAt`

## Output

Both JSON and CSV ingestion return:

- a `Catalog`
- accepted track count
- rejected track count
- validation errors

## Rules

- No UI.
- No scraping.
- No auth.
- No private APIs.
- No external parser dependency.
- Output is normalized into v0.1 `Track` models.
