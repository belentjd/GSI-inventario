import {
  loadObjects,
  loadPeople,
  type InventoryResult,
} from "../lib/data-source";
import type { ObjectItem, Person } from "../lib/inventory";
import { objectCodeTone } from "../lib/object-code";
import { basePath } from "../lib/paths";
import { spriteUrl } from "../lib/sprite-assets";
import { byId, formatTime, label, node, seatLabel } from "./dom";

// Posiciones relativas a gsimap.png (832 × 480 píxeles).
const seats = [
  [132, 154],
  [284, 154],
  [132, 243],
  [284, 243],
  [132, 407],
  [284, 407],
  [548, 154],
  [700, 154],
  [548, 243],
  [700, 243],
  [548, 407],
  [700, 407],
] as const;

let people: InventoryResult<Person> = {
  data: null,
  updatedAt: null,
  error: null,
};
let objects: InventoryResult<ObjectItem> = {
  data: null,
  updatedAt: null,
  error: null,
};
let selectedId: string | null = null;
let selectedSeat: number | null = null;
const drawer = byId<HTMLDialogElement>("person-drawer");
const menuToggle = byId<HTMLButtonElement>("person-menu-toggle");
const drawerClose = byId<HTMLButtonElement>("person-drawer-close");
let drawerTrigger: HTMLElement = menuToggle;

function fitMap(): void {
  const stage = byId("scenario-stage");
  if (window.innerWidth < 640) {
    stage.style.maxWidth = "none";
    return;
  }
  const headerHeight =
    document.querySelector("header")?.getBoundingClientRect().height ?? 0;
  const availableHeight = Math.max(160, window.innerHeight - headerHeight);
  stage.style.maxWidth = `${(availableHeight * 832) / 480}px`;
}

function openDrawer(trigger: HTMLElement): void {
  drawerTrigger = trigger;
  if (!drawer.open) drawer.showModal();
  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute("aria-label", "Cerrar ficha del puesto");
  drawerClose.focus();
}

menuToggle.addEventListener("click", () => {
  if (drawer.open) drawer.close();
  else openDrawer(menuToggle);
});
drawerClose.addEventListener("click", () => drawer.close());
drawer.addEventListener("close", () => {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir ficha del puesto");
  (drawerTrigger.isConnected ? drawerTrigger : menuToggle).focus();
});
drawer.addEventListener("click", (event) => {
  const bounds = drawer.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right)
    drawer.close();
});
window.addEventListener("resize", fitMap);
const header = document.querySelector("header");
if (header) new ResizeObserver(fitMap).observe(header);
fitMap();

function position(element: HTMLElement, x: number, y: number): void {
  element.style.left = `${(x / 832) * 100}%`;
  element.style.top = `${(y / 480) * 100}%`;
}

function initials(name: string): string {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join("") || "?"
  );
}

function detailLine(title: string, value: string): HTMLElement {
  const wrapper = node("div", undefined, "border-b border-[#293a4a] py-2");
  wrapper.append(
    node("dt", title, "text-xs text-slate-400"),
    node("dd", value, "mt-1 text-sm text-slate-100"),
  );
  return wrapper;
}

function appendObjects(detail: HTMLElement, seat: number | null): void {
  const assigned = seat === null ? [] : objects.data?.filter((item) => item.seat === seat) ?? [];
  detail.append(
    node(
      "p",
      `Objetos del puesto · ${objects.data ? assigned.length : "—"}`,
      "mt-5 text-xs font-semibold uppercase tracking-wider text-slate-400",
    ),
  );
  const list = node("ul", undefined, "mt-2 space-y-1 text-sm text-slate-200");
  if (!objects.data)
    list.append(node("li", objects.error ? "No se pudieron cargar los objetos." : "Cargando objetos…"));
  else if (!assigned.length) list.append(node("li", "Sin objetos asignados."));
  else
    assigned.forEach((item) => {
      const entry = node("li");
      const link = node(
        "a",
        undefined,
        "text-accent hover:underline focus-visible:underline",
      );
      const code = node("span", item.id);
      const tone = objectCodeTone(item.id);
      if (tone) {
        code.className = "object-code";
        code.dataset.tone = tone;
      }
      link.append(code, document.createTextNode(` · ${label(item.name)}${item.description ? ` · ${item.description}` : ""}`));
      link.href = `${basePath}objetos/?objeto=${encodeURIComponent(item.id)}`;
      link.setAttribute("aria-label", `Ver objeto ${item.id}: ${label(item.name)}`);
      entry.append(link);
      list.append(entry);
    });
  detail.append(list);
}

function updateSelection(): void {
  byId("map-board")
    .querySelectorAll<HTMLButtonElement>(".avatar")
    .forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.personId === selectedId)));
  byId("map-board")
    .querySelectorAll<HTMLButtonElement>(".seat-label")
    .forEach((button) => button.setAttribute("aria-pressed", String(Number(button.dataset.seat) === selectedSeat)));
}

function selectSeat(seat: number, trigger: HTMLElement): void {
  selectedId = null;
  selectedSeat = seat;
  const occupants = people.data?.filter((person) => person.seat === seat) ?? [];
  const detail = byId("person-detail");
  detail.replaceChildren(
    node("p", "Puesto", "font-mono text-xs uppercase tracking-[.2em] text-accent"),
    node("h2", String(seat), "mt-2 text-2xl font-bold text-white"),
    node(
      "p",
      people.data === null
        ? people.error ? "No se pudieron cargar las personas." : "Cargando personas…"
        : occupants.length
          ? `Personas asignadas: ${occupants.map((person) => person.name).join(", ")}`
          : "Sin personas asignadas.",
      "mt-4 text-sm text-slate-300",
    ),
  );
  appendObjects(detail, seat);
  updateSelection();
  openDrawer(trigger);
}

function selectPerson(id: string, trigger: HTMLElement = menuToggle): void {
  const person = people.data?.find((item) => item.id === id);
  if (!person) return;
  selectedId = id;
  selectedSeat = null;
  const detail = byId("person-detail");
  const intro = node("div", undefined, "flex items-center gap-4");
  const portrait = node("div", undefined, "detail-avatar");
  const sprite = spriteUrl(person.csvId ?? null);
  if (sprite) {
    const image = node("img");
    image.src = sprite;
    image.alt = `Sprite de ${person.name}`;
    image.width = 80;
    image.height = 80;
    portrait.append(image);
  } else portrait.textContent = initials(person.name);
  const heading = node("div");
  heading.append(
    node(
      "p",
      `Puesto ${seatLabel(person.seat)}`,
      "font-mono text-xs uppercase tracking-[.2em] text-accent",
    ),
    node("h2", person.name, "mt-2 text-xl font-bold text-white"),
  );
  intro.append(portrait, heading);
  detail.replaceChildren(intro);
  const details = node("dl", undefined, "mt-4");
  details.append(
    detailLine("Tutor", label(person.tutor)),
    detailLine("Titulación", label(person.degree)),
    detailLine("Estado", label(person.status)),
  );
  detail.append(details);

  appendObjects(detail, person.seat);
  updateSelection();
  openDrawer(trigger);
}

function renderMap(): void {
  const board = byId("map-board");
  board
    .querySelectorAll(".seat-label, .avatar")
    .forEach((element) => element.remove());
  seats.forEach(([x, y], index) => {
    const seat = index + 1;
    const badge = node("button", String(seat), "seat-label");
    badge.type = "button";
    badge.dataset.seat = String(seat);
    badge.setAttribute("aria-label", `Ver objetos del puesto ${seat}`);
    badge.setAttribute("aria-pressed", String(selectedSeat === seat));
    badge.addEventListener("click", () => selectSeat(seat, badge));
    position(badge, x, y - 56);
    board.append(badge);
    const occupants =
      people.data?.filter((person) => person.seat === index + 1) ?? [];
    occupants.forEach((person, occupantIndex) => {
      const avatar = node("button", initials(person.name), "avatar");
      const sprite = spriteUrl(person.csvId ?? null);
      if (sprite) {
        const image = node("img", undefined, "avatar-image");
        image.src = sprite;
        image.alt = "";
        image.width = 32;
        image.height = 32;
        avatar.replaceChildren(image);
        avatar.classList.add("has-sprite");
      }
      avatar.type = "button";
      avatar.dataset.personId = person.id;
      avatar.setAttribute(
        "aria-label",
        `${person.name}, puesto ${person.seat}`,
      );
      avatar.setAttribute("aria-pressed", String(person.id === selectedId));
      avatar.style.setProperty(
        "--avatar-color",
        ["#09A5DB", "#63BBDD", "#258DB8", "#87C9F2"][index % 4],
      );
      position(
        avatar,
        x + (occupantIndex - (occupants.length - 1) / 2) * 70,
        y,
      );
      avatar.append(node("span", person.name, "avatar-tooltip"));
      avatar.addEventListener("click", () => selectPerson(person.id, avatar));
      board.append(avatar);
    });
  });
}

function showStatus(): void {
  const dot = document.getElementById("load-dot");
  const status = document.getElementById("load-status");
  const sourceNote = document.getElementById("source-note");
  const lastUpdated = document.getElementById("last-updated");
  if (!dot || !status || !sourceNote || !lastUpdated) return;
  const failed = Boolean(people.error || objects.error);
  const loaded = people.data !== null && objects.data !== null;
  dot.dataset.state = failed ? "error" : loaded ? "ok" : "";
  status.textContent = failed
    ? loaded
      ? "Datos guardados; consulta fallida"
      : "No se pudo cargar todo el inventario"
    : "Escenario actualizado";
  sourceNote.textContent = [
    people.error && `Personas: ${people.error}`,
    objects.error && `Objetos: ${objects.error}`,
  ]
    .filter(Boolean)
    .join(" ");
  lastUpdated.textContent =
    people.updatedAt || objects.updatedAt
      ? `Última lectura correcta · Personas: ${people.updatedAt ? formatTime(people.updatedAt) : "—"} · Objetos: ${objects.updatedAt ? formatTime(objects.updatedAt) : "—"}`
      : "";
}

renderMap();
void Promise.all([loadPeople(), loadObjects()]).then(
  ([loadedPeople, loadedObjects]) => {
    people = loadedPeople;
    objects = loadedObjects;
    renderMap();
    const requestedId = new URLSearchParams(location.search).get("persona");
    if (requestedId) selectPerson(requestedId);
    else if (selectedSeat !== null) selectSeat(selectedSeat, menuToggle);
    showStatus();
  },
);
