import Papa from 'papaparse';

export interface Person {
  id: string;
  csvId: string | null;
  name: string;
  tutor: string;
  seat: number | null;
  degree: string;
  status: string;
}

export interface ObjectItem {
  id: string;
  name: string;
  description: string;
  seat: number | null;
}

type CsvRow = Record<string, string | undefined>;

function parseRows(text: string, columns: string[]): CsvRow[] {
  if (/^\s*<!doctype html|^\s*<html/i.test(text)) {
    throw new Error('La URL devolvió una página HTML en lugar de un CSV.');
  }

  const result = Papa.parse<CsvRow>(text.replace(/^\uFEFF/, ''), {
    header: true,
    skipEmptyLines: 'greedy',
    transformHeader: (header) => header.trim(),
  });
  if (result.errors.length) {
    throw new Error(`CSV malformado: ${result.errors[0].message}`);
  }
  const missing = columns.filter((column) => !result.meta.fields?.includes(column));
  if (missing.length) {
    throw new Error(`Faltan columnas: ${missing.join(', ')}.`);
  }
  return result.data;
}

function seat(value: string | undefined, row: number): number | null {
  const trimmed = value?.trim() ?? '';
  if (!trimmed) return null;
  const parsed = Number(trimmed);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 12) {
    throw new Error(`Puesto inválido en la fila ${row}.`);
  }
  return parsed;
}

function requireId(id: string, row: number, seen: Set<string>): string {
  const value = id || `Sin ID (fila ${row})`;
  if (seen.has(value)) throw new Error(`Id duplicado: ${value}.`);
  seen.add(value);
  return value;
}

export function parsePeople(text: string): Person[] {
  const seen = new Set<string>();
  return parseRows(text, ['Id', 'Persona', 'Tutor', 'Puesto', 'Titulación', 'Estado']).map((row, index) => ({
    id: requireId(row.Id?.trim() ?? '', index + 2, seen),
    csvId: row.Id?.trim() || null,
    name: row.Persona?.trim() ?? '',
    tutor: row.Tutor?.trim() ?? '',
    seat: seat(row.Puesto, index + 2),
    degree: row['Titulación']?.trim() ?? '',
    status: row.Estado?.trim() ?? '',
  }));
}

export function parseObjects(text: string): ObjectItem[] {
  const seen = new Set<string>();
  return parseRows(text, ['Id', 'Objeto', 'Descripción', 'Puesto']).map((row, index) => ({
    id: requireId(row.Id?.trim() ?? '', index + 2, seen),
    name: row.Objeto?.trim() ?? '',
    description: row['Descripción']?.trim() ?? '',
    seat: seat(row.Puesto, index + 2),
  }));
}
