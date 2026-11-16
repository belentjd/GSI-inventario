export const HAIR_STYLES = [
  { value: "short", label: "Corto" },
  { value: "side", label: "Raya lateral" },
  { value: "curly", label: "Rizado" },
  { value: "afro", label: "Afro" },
  { value: "curly_long", label: "Rizado largo" },
  { value: "book", label: "Corte de libro" },
  { value: "undercut", label: "Degradado" },
  { value: "long", label: "Largo" },
  { value: "bob", label: "Melena corta" },
  { value: "extra_long", label: "Melena extralarga" },
  { value: "wavy", label: "Ondulado largo" },
  { value: "braids", label: "Trenzas largas" },
  { value: "ponytail", label: "Coleta alta" },
  { value: "mohawk", label: "Cresta" },
  { value: "bald", label: "Sin cabello" },
] as const;

export const FACE_SHAPES = [
  { value: "oval", label: "Ovalada" },
  { value: "round", label: "Redonda" },
  { value: "square", label: "Cuadrada" },
  { value: "heart", label: "Corazón" },
  { value: "diamond", label: "Diamante" },
  { value: "long", label: "Alargada" },
] as const;

export const BEARD_STYLES = [
  { value: "none", label: "Sin barba" },
  { value: "stubble", label: "Barba de tres días" },
  { value: "short", label: "Barba corta" },
  { value: "full", label: "Barba poblada" },
  { value: "goatee", label: "Perilla" },
  { value: "mustache", label: "Bigote" },
  { value: "goatee_classic", label: "Perilla clásica" },
  { value: "mustache_classic", label: "Bigote clásico" },
] as const;

export const EYE_STYLES = [
  { value: "normal", label: "Normales" },
  { value: "round", label: "Grandes" },
  { value: "sleepy", label: "Entornados" },
  { value: "happy", label: "Sonrientes" },
  { value: "almond", label: "Almendrados" },
  { value: "lashes", label: "Con pestañas" },
  { value: "sparkle", label: "Brillantes" },
  { value: "wink", label: "Guiño" },
] as const;

export const GLASSES_STYLES = [
  { value: "none", label: "Sin gafas" },
  { value: "round", label: "Redondas" },
  { value: "square", label: "Cuadradas" },
  { value: "sun", label: "De sol" },
  { value: "thin", label: "Montura fina" },
  { value: "cat", label: "Ojo de gato" },
  { value: "aviator", label: "Aviador" },
  { value: "mono", label: "Monóculo" },
] as const;

export const HAT_STYLES = [
  { value: "none", label: "Sin gorro" },
  { value: "cap", label: "Gorra con visera" },
  { value: "beanie", label: "Gorro de lana" },
  { value: "bucket", label: "Gorro pescador" },
  { value: "beret", label: "Boina" },
] as const;

export const HAT_COLORS = [
  { label: "Rojo", color: "#c84c42", shade: "#913734", light: "#e2705e" },
  { label: "Azul", color: "#4b7db1", shade: "#315579", light: "#73a2cc" },
  { label: "Verde", color: "#5d8354", shade: "#3c5a3c", light: "#82a66e" },
  { label: "Amarillo", color: "#d2a34d", shade: "#906d36", light: "#e7c073" },
  { label: "Morado", color: "#9270a9", shade: "#634d78", light: "#b395c5" },
  { label: "Negro", color: "#41414b", shade: "#292932", light: "#666675" },
] as const;

export const MOUTH_STYLES = [
  { value: "smile", label: "Sonrisa" },
  { value: "neutral", label: "Seria" },
  { value: "open", label: "Abierta" },
] as const;

export const SKIN_COLORS = [
  { label: "Clara", color: "#f6d6b6", shade: "#dda987" },
  { label: "Media clara", color: "#e8b78f", shade: "#bc855f" },
  { label: "Media", color: "#c98e67", shade: "#985b42" },
  { label: "Morena", color: "#a86d50", shade: "#784531" },
  { label: "Oscura", color: "#794b37", shade: "#523023" },
  { label: "Muy oscura", color: "#523629", shade: "#35221d" },
] as const;

export const HAIR_COLORS = [
  { label: "Negro", color: "#24212b", shade: "#14131b" },
  { label: "Castaño", color: "#604335", shade: "#382b2c" },
  { label: "Castaño oscuro", color: "#392a2b", shade: "#211c23" },
  { label: "Castaño claro", color: "#9b6d4b", shade: "#684735" },
  { label: "Rubio", color: "#dbb86c", shade: "#a27b45" },
  { label: "Rubio platino", color: "#efe0b0", shade: "#b7a77c" },
  { label: "Pelirrojo", color: "#b85b39", shade: "#7d392d" },
  { label: "Caoba", color: "#7c3d48", shade: "#4f2b37" },
  { label: "Gris", color: "#a9a9ae", shade: "#72727e" },
  { label: "Blanco", color: "#e5e5df", shade: "#a9adb1" },
  { label: "Azul", color: "#6176ba", shade: "#394b83" },
  { label: "Rosa", color: "#d28caf", shade: "#985f83" },
  { label: "Morado", color: "#8d62ac", shade: "#5f417f" },
  { label: "Verde", color: "#5c9b72", shade: "#376d56" },
  { label: "Turquesa", color: "#5db8b1", shade: "#337f84" },
] as const;

export const EYE_COLORS = [
  { label: "Marrón", color: "#5a352c" },
  { label: "Negro", color: "#24212b" },
  { label: "Avellana", color: "#8b653d" },
  { label: "Ámbar", color: "#b78031" },
  { label: "Azul", color: "#3b80b4" },
  { label: "Azul claro", color: "#71b7d4" },
  { label: "Verde", color: "#4c8963" },
  { label: "Turquesa", color: "#4ca9a0" },
  { label: "Gris", color: "#74808d" },
  { label: "Violeta", color: "#8469ad" },
] as const;

export interface SpriteOptions {
  hairStyle: (typeof HAIR_STYLES)[number]["value"];
  faceShape: (typeof FACE_SHAPES)[number]["value"];
  beardStyle: (typeof BEARD_STYLES)[number]["value"];
  eyeStyle: (typeof EYE_STYLES)[number]["value"];
  glasses: (typeof GLASSES_STYLES)[number]["value"];
  hatStyle: (typeof HAT_STYLES)[number]["value"];
  mouth: (typeof MOUTH_STYLES)[number]["value"];
  skinColor: string;
  hairColor: string;
  eyeColor: string;
  hatColor: string;
  freckles: boolean;
}

export const DEFAULT_SPRITE: SpriteOptions = {
  hairStyle: "short",
  faceShape: "oval",
  beardStyle: "none",
  eyeStyle: "normal",
  glasses: "none",
  hatStyle: "none",
  mouth: "smile",
  skinColor: SKIN_COLORS[1].color,
  hairColor: HAIR_COLORS[1].color,
  eyeColor: EYE_COLORS[0].color,
  hatColor: HAT_COLORS[0].color,
  freckles: false,
};
export type HairColor = (typeof HAIR_COLORS)[number];
export type SkinColor = (typeof SKIN_COLORS)[number];
export type HatColor = (typeof HAT_COLORS)[number];
