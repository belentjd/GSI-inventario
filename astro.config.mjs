// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

const repository = process.env.GITHUB_REPOSITORY;
const [owner, name] = repository?.split('/') ?? [];
const isRootSite = name === `${owner}.github.io`;

export default defineConfig({
  output: 'static',
  site: owner ? `https://${owner}.github.io` : undefined,
  base: name && !isRootSite ? `/${name}` : '/',
  vite: { plugins: [tailwindcss()] },
});
