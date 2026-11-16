import { csvUrls } from './config';
import { parseObjects, parsePeople, type ObjectItem, type Person } from './inventory';

export interface InventoryResult<T> {
  data: T[] | null;
  updatedAt: number | null;
  error: string | null;
}

interface Snapshot<T> {
  data: T[];
  updatedAt: number;
}

function readSnapshot<T>(key: string): Snapshot<T> | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || !('data' in parsed) || !('updatedAt' in parsed)) return null;
    const { data, updatedAt } = parsed;
    if (!Array.isArray(data) || typeof updatedAt !== 'number') return null;
    return { data: data as T[], updatedAt };
  } catch {
    return null;
  }
}

function saveSnapshot<T>(key: string, snapshot: Snapshot<T>): void {
  try { sessionStorage.setItem(key, JSON.stringify(snapshot)); }
  catch { /* La lectura actual funciona aunque sessionStorage no esté disponible. */ }
}

function errorMessage(error: unknown, url: string): string {
  if (error instanceof TypeError && url.startsWith('https://drive.usercontent.google.com/')) {
    return 'Google Drive bloquea la lectura desde esta web. Usa una URL CSV publicada desde Google Sheets.';
  }
  if (error instanceof TypeError) return 'No se pudo acceder al CSV. Comprueba la conexión y CORS del enlace.';
  if (error instanceof DOMException && error.name === 'TimeoutError') return 'La consulta tardó demasiado.';
  return error instanceof Error ? error.message : 'Error desconocido.';
}

async function loadCsv<T>(key: string, url: string, parse: (text: string) => T[]): Promise<InventoryResult<T>> {
  const previous = readSnapshot<T>(key);
  try {
    if (!url) throw new Error('No hay una URL CSV configurada.');
    const response = await fetch(url, { cache: 'no-store', signal: AbortSignal.timeout(20000) });
    if (!response.ok) throw new Error(`El servidor respondió con HTTP ${response.status}.`);
    const data = parse(await response.text());
    const updatedAt = Date.now();
    saveSnapshot(key, { data, updatedAt });
    return { data, updatedAt, error: null };
  } catch (error) {
    return { data: previous?.data ?? null, updatedAt: previous?.updatedAt ?? null, error: errorMessage(error, url) };
  }
}

export function loadPeople(): Promise<InventoryResult<Person>> {
  return loadCsv('gsi-people', csvUrls.people, parsePeople);
}

export function loadObjects(): Promise<InventoryResult<ObjectItem>> {
  return loadCsv('gsi-objects', csvUrls.objects, parseObjects);
}
