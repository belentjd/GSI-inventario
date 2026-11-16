import { byId } from "./dom";
import { DEFAULT_SPRITE, drawSprite, type SpriteOptions } from "../lib/sprite";

const SOURCE_SIZE = 32;
const SCALE = 8;
const EXPORT_SIZE = 200;
const offset = (SOURCE_SIZE * SCALE - EXPORT_SIZE) / 2;

const form = byId<HTMLFormElement>("sprite-form");
const canvas = byId<HTMLCanvasElement>("sprite-canvas");
const sourceCanvas = document.createElement("canvas");
const caption = byId("sprite-caption");
const message = byId("sprite-message");

function formOptions(): SpriteOptions {
  const values = new FormData(form);
  return {
    hairStyle:
      (values.get("hairStyle") as SpriteOptions["hairStyle"]) ||
      DEFAULT_SPRITE.hairStyle,
    faceShape:
      (values.get("faceShape") as SpriteOptions["faceShape"]) ||
      DEFAULT_SPRITE.faceShape,
    beardStyle:
      (values.get("beardStyle") as SpriteOptions["beardStyle"]) ||
      DEFAULT_SPRITE.beardStyle,
    eyeStyle:
      (values.get("eyeStyle") as SpriteOptions["eyeStyle"]) ||
      DEFAULT_SPRITE.eyeStyle,
    glasses:
      (values.get("glasses") as SpriteOptions["glasses"]) ||
      DEFAULT_SPRITE.glasses,
    hatStyle:
      (values.get("hatStyle") as SpriteOptions["hatStyle"]) ||
      DEFAULT_SPRITE.hatStyle,
    mouth:
      (values.get("mouth") as SpriteOptions["mouth"]) || DEFAULT_SPRITE.mouth,
    skinColor: String(values.get("skinColor") || DEFAULT_SPRITE.skinColor),
    hairColor: String(values.get("hairColor") || DEFAULT_SPRITE.hairColor),
    eyeColor: String(values.get("eyeColor") || DEFAULT_SPRITE.eyeColor),
    hatColor: String(values.get("hatColor") || DEFAULT_SPRITE.hatColor),
    freckles: values.has("freckles"),
  };
}

function render(): void {
  drawSprite(sourceCanvas, formOptions());
  canvas.width = EXPORT_SIZE;
  canvas.height = EXPORT_SIZE;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("El navegador no admite Canvas 2D.");
  context.imageSmoothingEnabled = false;
  context.clearRect(0, 0, EXPORT_SIZE, EXPORT_SIZE);
  context.drawImage(sourceCanvas, -offset, -offset, SOURCE_SIZE * SCALE, SOURCE_SIZE * SCALE);
  const name = byId<HTMLInputElement>("sprite-name").value.trim();
  const id = byId<HTMLInputElement>("sprite-id").value.trim();
  caption.textContent = name
    ? `${name}${id ? ` · ${id}.png` : ""}`
    : "Tu personaje aparecerá aquí";
  message.textContent = "";
}

form.addEventListener("input", render);
form.addEventListener("change", render);
form.addEventListener("submit", (event) => event.preventDefault());

byId<HTMLButtonElement>("sprite-download").addEventListener(
  "click",
  async () => {
    const name = byId<HTMLInputElement>("sprite-name").value.trim();
    const id = byId<HTMLInputElement>("sprite-id").value.trim();
    if (!name || !/^[A-Za-z0-9_-]+$/.test(id)) {
      form.reportValidity();
      message.textContent =
        "Escribe un nombre y un Id válido antes de descargar.";
      return;
    }

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/png"),
    );
    if (!blob) {
      message.textContent = "No se pudo generar el PNG.";
      return;
    }
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${id}.png`;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 30_000);
    message.textContent = `Descargado ${id}.png. Añádelo a src/assets/sprites/ para publicarlo.`;
  },
);

render();
