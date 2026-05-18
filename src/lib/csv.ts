export function parseCsvRows(csv: string): string[][] {
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

export function parseCsvObjects(csv: string): Record<string, string>[] {
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

    return record;
  });
}

export function emptyToUndefined(value?: string): string | undefined {
  return value?.trim() ? value.trim() : undefined;
}
