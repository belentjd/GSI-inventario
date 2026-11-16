import type { InventoryResult } from '../lib/data-source';

export function byId<T extends HTMLElement>(id: string): T {
  const element = document.getElementById(id);
  if (!element) throw new Error(`Falta el elemento ${id}`);
  return element as T;
}

export function node<K extends keyof HTMLElementTagNameMap>(tag: K, text?: string, className?: string): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);
  if (text !== undefined) element.textContent = text;
  if (className) element.className = className;
  return element;
}

export function label(value: string): string { return value || '—'; }
export function seatLabel(value: number | null): string { return value === null ? 'Sin puesto' : String(value); }
export function normalize(value: string): string { return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); }
export function formatTime(value: number): string {
  return new Date(value).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' });
}

export function emptyRow(columns: number, message: string): HTMLTableRowElement {
  const row = node('tr');
  const cell = node('td', message);
  cell.colSpan = columns;
  row.append(cell);
  return row;
}

export function showResult<T>(result: InventoryResult<T>, name: string): void {
  const status = byId('load-status');
  const dot = byId('load-dot');
  dot.dataset.state = result.error ? 'error' : 'ok';
  status.textContent = result.error
    ? result.data ? 'Datos guardados; consulta fallida' : 'No se pudo cargar el inventario'
    : 'Inventario actualizado';
  byId('source-note').textContent = result.error
    ? `${name}: ${result.error}${result.data ? ' Se muestran los últimos datos válidos de esta pestaña.' : ''}`
    : '';
  byId('last-updated').textContent = result.updatedAt
    ? `Última lectura correcta: ${formatTime(result.updatedAt)}` : '';
}
