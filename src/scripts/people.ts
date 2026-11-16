import { loadPeople, type InventoryResult } from '../lib/data-source';
import type { Person } from '../lib/inventory';
import { basePath } from '../lib/paths';
import { spriteUrl } from '../lib/sprite-assets';
import { byId, emptyRow, label, node, normalize, seatLabel, showResult } from './dom';

let result: InventoryResult<Person> = { data: null, updatedAt: null, error: null };

function render(): void {
  const body = byId<HTMLTableSectionElement>('people-body');
  const query = normalize(byId<HTMLInputElement>('people-search').value.trim());
  if (!result.data) {
    body.replaceChildren(emptyRow(6, result.error ? 'No se pudieron cargar las personas.' : 'Cargando personas…'));
    return;
  }

  const filtered = result.data.filter((person) =>
    normalize([person.id, person.name, person.tutor, seatLabel(person.seat), person.degree, person.status].join(' ')).includes(query));
  const rows = filtered.map((person) => {
    const row = node('tr');
    row.append(node('td', person.id));
    const nameCell = node('td');
    const identity = node('div', undefined, 'flex items-center gap-3');
    const portrait = node('span', undefined, 'person-profile');
    const sprite = spriteUrl(person.csvId ?? null);
    if (sprite) {
      const image = node('img');
      image.src = sprite;
      image.alt = '';
      image.width = 44;
      image.height = 44;
      portrait.append(image);
    } else {
      portrait.textContent = person.name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0].toUpperCase()).join('') || '?';
    }
    identity.append(portrait);
    if (person.seat !== null) {
      const link = node('a', label(person.name), 'text-accent hover:underline focus-visible:underline');
      link.href = `${basePath}escenario/?persona=${encodeURIComponent(person.id)}`;
      link.setAttribute('aria-label', `Ver ${person.name} en el escenario`);
      identity.append(link);
    } else identity.append(node('span', label(person.name)));
    nameCell.append(identity);
    row.append(nameCell);
    [label(person.tutor), seatLabel(person.seat), label(person.degree), label(person.status)]
      .forEach((value) => row.append(node('td', value)));
    return row;
  });
  body.replaceChildren(...(rows.length ? rows : [emptyRow(6, query ? 'Sin resultados.' : 'No hay personas.')]));
  byId('people-count').textContent = String(result.data.length);
  byId('seats-count').textContent = String(new Set(result.data.map((person) => person.seat).filter((seat) => seat !== null)).size);
}

byId<HTMLInputElement>('people-search').addEventListener('input', render);
void loadPeople().then((loaded) => {
  result = loaded;
  render();
  showResult(result, 'Personas');
});
