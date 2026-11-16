# Inventario GSI

Web estática en Astro con Tailwind. Consulta los CSV públicos desde el navegador al abrir o recargar cada página; no obtiene datos durante el build y no necesita backend.

## Organización

- `/` — personas: búsqueda y puestos ocupados.
- `/objetos/` — objetos: búsqueda y puesto asignado.
- `/escenario/` — mapa interactivo de personas y objetos por puesto.
- `/crear-sprite/` — editor de caras pixel art y descarga de PNG.

Las rutas de `src/pages/` solo componen páginas. `src/layouts/Layout.astro` y `src/components/SiteHeader.astro` contienen la estructura y navegación compartidas. Los componentes de `src/components/inventory/`, `src/components/scenario/` y `src/components/sprite/` contienen el marcado de cada vista; sus scripts correspondientes están en `src/scripts/`. `src/lib/inventory.ts` define los tipos y convierte los CSV, mientras que `src/lib/data-source.ts` gestiona las consultas y la copia de sesión. `src/lib/sprite.ts` coordina el dibujo y conserva las exportaciones usadas por el editor; `src/lib/sprite/` separa opciones, lienzo, cara, cabello, gorros, barba, ojos, boca y gafas. `src/lib/sprite-assets.ts` enlaza los PNG del repositorio con el escenario. Las URL configurables están en `src/lib/config.ts`.

## Desarrollo

Requiere Node.js 22.23.4 o superior y pnpm (el repositorio incluye `pnpm-lock.yaml`).

```sh
pnpm install
pnpm astro dev --background
pnpm astro dev status
pnpm astro dev logs
pnpm astro dev stop
```

Para comprobar el proyecto: `pnpm check` y `pnpm build`.

## CSV y actualización

Las URL se definen en `src/lib/config.ts`. Por defecto usan las pestañas **Personas** y **Objetos** de la hoja de Google publicada para este inventario. Los enlaces originales de Drive en `csv-test/rutas.txt` no se pueden consumir desde la web: ambas descargas responden HTTP 403 cuando la petición lleva `Sec-Fetch-Site: cross-site`. Puedes sustituir las URL durante el build con `PUBLIC_PERSONAS_CSV_URL` y `PUBLIC_OBJETOS_CSV_URL`; en GitHub, las variables de repositorio correspondientes son `PERSONAS_CSV_URL` y `OBJETOS_CSV_URL` (**Settings → Secrets and variables → Actions → Variables**). Las URL son públicas y quedan visibles en el JavaScript final.

Las columnas obligatorias son:

- Personas: `Id,Persona,Tutor,Puesto,Titulación,Estado`
- Objetos: `Id,Objeto,Descripción,Puesto`

`Puesto` puede quedar vacío o contener un número del 1 al 12. Se admiten varias personas y varios objetos en un mismo puesto. La sala izquierda contiene los puestos 1–6 y la derecha 7–12, de izquierda a derecha y de arriba abajo en cada sala.

Si una fila tiene `Id` vacío, la interfaz muestra `Sin ID (fila N)` para poder identificarla sin ocultarla. Los `Id` no vacíos deben ser únicos.

## Sprites de personas

En **Crear sprite**, escribe un nombre visible y un `Id` formado por letras, números, guiones o guiones bajos. Ajusta el cabello, una de las seis formas de cara, los ojos, las gafas, la barba y el gorro. La barba usa el color de cabello elegido; hay cuatro formas de gorro y seis colores, y por defecto no lleva gorro. El editor mantiene la escala del dibujo y exporta el centro en una imagen de 200 × 200 píxeles; las partes que queden fuera de ese recorte se cortan. El archivo se llama exactamente `<Id>.png`. El fondo celeste solo aparece detrás de la vista previa; el PNG es transparente.

1. Usa el `Id` exacto de la persona correspondiente en la hoja publicada. Si una persona aún no tiene Id, asígnale uno antes de publicar su sprite.
2. Copia el PNG descargado a `src/assets/sprites/<Id>.png` y haz commit.
3. Despliega de nuevo la web. Astro incorpora los PNG durante el build; el escenario usa el sprite cuando encuentra un archivo cuyo nombre coincide con el Id. Si no existe, muestra las iniciales de la persona.

La creación y descarga funcionan enteramente en el navegador. GitHub Pages no puede escribir en `src/assets`; añadir el PNG al repositorio es un paso manual. Cambios en la hoja publicada se leen al recargar, mientras que añadir o modificar sprites requiere un nuevo despliegue.

Cada página consulta al cargar únicamente los CSV que necesita: personas u objetos en sus inventarios y ambos en el escenario (`fetch` con `cache: 'no-store'`). No hay polling. La web conserva en `sessionStorage` la última lectura correcta de cada archivo para mostrarla si falla una recarga en la misma pestaña. Los cambios en las hojas publicadas no requieren recompilar ni redesplegar, siempre que se mantenga la misma URL y el origen permita la lectura desde el navegador.

### Comprobar CORS y alternativa de Google Sheets

Que un archivo de Drive sea accesible para cualquiera con el enlace no permite necesariamente leerlo con `fetch()`. En estos dos archivos, Drive devuelve CSV a una petición directa, pero rechaza la petición de origen cruzado que hace el navegador. Puedes comprobarlo en las herramientas del navegador, en **Network** y **Console**.

Abre cada archivo CSV en Google Sheets y guárdalo como una hoja de cálculo de Google; también puedes crear una hoja nueva e importar el CSV. En cada hoja, usa **Archivo → Compartir → Publicar en la web**, selecciona la pestaña y el formato **CSV**, publica y copia la URL. Debe tener una forma similar a `https://docs.google.com/spreadsheets/d/e/.../pub?gid=0&single=true&output=csv`, no `drive.google.com/file/d/.../view`. Coloca las dos URL en las variables de GitHub anteriores y vuelve a ejecutar el workflow. Las futuras ediciones deben hacerse en las hojas de Google: los archivos CSV originales no se sincronizan con ellas. Los cambios publicados se verán al recargar, sujetos al tiempo de actualización de Google.

## GitHub Pages

El workflow `.github/workflows/deploy.yml` compila y publica al hacer push a `master` o al ejecutarlo manualmente. Configura un remoto de GitHub para este repositorio y selecciona **GitHub Actions** como origen en **Settings → Pages**. Astro calcula `site` y `base` a partir de `GITHUB_REPOSITORY`, por lo que funciona con la ruta habitual `https://usuario.github.io/nombre-repo/` sin editar la configuración. El build local usa `/`.

El workflow no modifica los CSV: los datos se leen desde el navegador de cada visitante. GitHub Pages solo sirve HTML, CSS, JavaScript y la imagen del mapa.
