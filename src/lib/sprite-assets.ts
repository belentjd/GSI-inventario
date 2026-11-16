// Vite incorpora los PNG existentes en el build; el nombre del archivo es el Id del CSV.
const sprites = import.meta.glob('../assets/sprites/*.png', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

export function spriteUrl(id: string | null): string | null {
  return id ? sprites[`../assets/sprites/${id}.png`] ?? null : null;
}
