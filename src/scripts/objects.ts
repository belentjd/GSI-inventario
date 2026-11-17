import { loadObjects, type InventoryResult } from '../lib/data-source';
import type { ObjectItem } from '../lib/inventory';
import { objectCodeTone } from '../lib/object-code';
import { byId, emptyRow, label, node, normalize, seatLabel, showResult } from './dom';

let result: InventoryResult<ObjectItem> = { data: null, updatedAt: null, error: null };
const search = byId<HTMLInputElement>('objects-search');
let requestedId = new URLSearchParams(location.search).get('objeto');
if (requestedId) search.value = requestedId;

function render(): void {
  const body = byId<HTMLTableSectionElement>('objects-body');
  const query = normalize(search.value.trim());
  if (!result.data) {
    body.replaceChildren(emptyRow(4, result.error ? 'No se pudieron cargar los objetos.' : 'Cargando objetos…'));
    return;
  }

  const filtered = result.data.filter((item) =>
    requestedId !== null
      ? item.id === requestedId
      : normalize([item.id, item.name, item.description, seatLabel(item.seat)].join(' ')).includes(query));
  const rows = filtered.map((item) => {
    const row = node('tr');
    const idCell = node('td');
    const code = node('span', item.id);
    const tone = objectCodeTone(item.id);
    if (tone) {
      code.className = 'object-code';
      code.dataset.tone = tone;
    }
    idCell.append(code);
    row.append(idCell);
    [label(item.name), label(item.description), seatLabel(item.seat)]
      .forEach((value) => row.append(node('td', value)));
    return row;
  });
  body.replaceChildren(...(rows.length ? rows : [emptyRow(4, query ? 'Sin resultados.' : 'No hay objetos.')]));
  byId('objects-count').textContent = String(result.data.length);
}

search.addEventListener('input', () => {
  requestedId = null;
  render();
});
void loadObjects().then((loaded) => {
  result = loaded;
  render();
  showResult(result, 'Objetos');
});
