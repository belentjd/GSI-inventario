// Astro puede entregar BASE_URL con o sin barra final según la configuración.
export const basePath = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/`;
