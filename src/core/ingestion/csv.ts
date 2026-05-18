import type { ManualTrackInput } from "../../types/catalog";

export function parseCatalogCsv(csv: string): ManualTrackInput[] {
  const rows = parseCsvRows(csv).filter((row) => row.some((cell) => cell.trim()));
  const [headers, ...dataRows] = rows;

  if (!headers?.length) {
    return [];
  }

  return dataRows.map((row) => {
    const record: Record<string, string> = {};

    headers.forEach((header, index) => {
      record[header.trim()] = row[index]?.trim() ?? "";
    });

    return {
      id: emptyToUndefined(record.id),
      title: record.title,
      artist: record.artist,
      status: emptyToUndefined(record.status) as ManualTrackInput["status"],
      sourceKind: emptyToUndefined(record.sourceKind) as ManualTrackInput["sourceKind"],
      sourceExternalId: emptyToUndefined(record.sourceExternalId),
      sourceUrl: emptyToUndefined(record.sourceUrl),
      lyrics: emptyToUndefined(record.lyrics),
      version: emptyToUndefined(record.version),
      createdAt: emptyToUndefined(record.createdAt),
      updatedAt: emptyToUndefined(record.updatedAt)
    };
  });
}

function parseCsvRows(csv: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < csv.length; index += 1) {
    const char = csv[index];
    const next = csv[index + 1];

    if (char === "\"" && quoted && next === "\"") {
      cell += "\"";
      index += 1;
      continue;
    }

    if (char === "\"") {
      quoted = !quoted;
      continue;
    }

    if (char === "," && !quoted) {
      row.push(cell);
      cell = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") {
        index += 1;
      }
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
      continue;
    }

    cell += char;
  }

  row.push(cell);
  rows.push(row);

  return rows;
}

function emptyToUndefined(value?: string): string | undefined {
  return value?.trim() ? value.trim() : undefined;
}
