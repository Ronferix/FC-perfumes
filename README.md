# Perfumes FC — sitio web

Sitio estático en HTML, CSS y JavaScript sin frameworks ni dependencias en producción. No usa cookies, analítica ni formularios. La conversión se hace por WhatsApp.

## Ver en local

El catálogo carga sus datos desde `data/*.json`, así que necesita un servidor (no funciona abriendo el archivo con doble clic):

```bash
python -m http.server 8080
```

Después abre http://localhost:8080.

## Estructura

```
index.html            Inicio
catalogo.html         Galería olfativa → familia → ficha (rutas #/familia/perfume)
data/
  config.json         Número de WhatsApp, mensajes, segundos del autoplay
  families.json       Familias: textos, colores, luz y animación
  perfumes.json       Perfumes: notas, descripción, imagen, animación y verificación
  notes.json          Diccionario de notas (nombre, color y motivo de animación)
assets/
  css/                base.css (marca), home.css, catalog.css
  js/                 data.js (utilidades), fx.js (atmósfera en canvas), home.js, catalog.js
  img/brand/          Logo (dorado, tinta, crema), monograma, favicons, og-image
  img/perfumes/       Frascos recortados, <id>-420.webp y <id>-840.webp
  fonts/              Cormorant Garamond y Manrope (OFL, autohospedadas)
tools/prerender.py    Regenera el HTML estático que sale de los datos
docs/                 CATALOG_DATA.md (verificación y mantenimiento), DIAGNOSTICO.md
```

## Tareas frecuentes

- **Poner el número de WhatsApp:** en `data/config.json`, `whatsapp.phone`, con lada internacional y solo dígitos (ej. `5213312345678`). Después ejecuta `python tools/prerender.py`. Si se deja vacío, el enlace abre WhatsApp y deja elegir el contacto (modo demo).
- **Editar un perfume:** cambia `data/perfumes.json`. Las notas son ID de `data/notes.json`. Con `"published": false` se oculta.
- **Agregar un perfume:**
  1. Añade la entrada en `data/perfumes.json`.
  2. Coloca `assets/img/perfumes/<id>-420.webp` y `-840.webp` (formato 3:4, fondo transparente).
  3. Ejecuta `python tools/prerender.py`.
- **Cambiar la selección de la portada:** en `tools/prerender.py`, cambia la lista `PICKS`.

## Imágenes con IA (Gemini)

- **Fotos de estudio (decisión del 12-oct-2026: sin videos ni animaciones en los perfumes).** Cada perfume se muestra en una foto fija: su frasco con sus ingredientes, generada con Gemini sobre un color de croma y recortada. Se usa en la ficha, en las tarjetas de cada colección, al centro de la galería de familias y en la portada. Sin ella, se muestra el frasco solo. El fondo de cada familia (luz y partículas) sigue animado.
  1. `python tools/ia_prompts.py` escribe el plan y el prompt de cada perfume en `_ia/PROMPTS.md`, y deja en `_ia/estudio/ref/<id>.png` la foto real del frasco para adjuntar. Siempre se adjunta: Gemini no debe inventar el frasco.
  2. El fondo es azul #0000FF. Si el frasco tiene azul, turquesa o morado, el fondo es verde #00FF00; si además lleva ingredientes verdes, es magenta #FF00FF. El prompt prohíbe ese color en los ingredientes y los pide en otra variante real si chocan (por ejemplo, ciruelas rojas sobre azul).
  3. Guarda la imagen de Gemini como `_ia/estudio/<id>.png` y ejecuta `python tools/estudio.py <id>`. Detecta el color del fondo, lo recorta y publica `assets/img/estudio/<id>-420.webp` y `-760.webp`. Revisa `_ia/estudio/revisar/<id>.png` (sobre gris y sobre el fondo de su familia).
  4. Marca el perfume con `"studio": true` en `data/perfumes.json` y ejecuta `python tools/prerender.py`.
- Frascos sin foto: deja el resultado sobre blanco en `_ia/entrada/frascos/<id>.png` y ejecuta `python tools/importar_ia.py`, que lo recorta y actualiza `perfumes.json`.
- `_ia/` es solo de trabajo: no la subas al hosting.

Después de cualquier cambio en `/data`, ejecuta `python tools/prerender.py`. Así se actualizan el índice de familias de la portada, la selección y la lista que funciona sin JavaScript.

## Publicar

Sube la carpeta tal cual a cualquier hosting estático (Netlify, Cloudflare Pages, GitHub Pages, un servidor Apache o Nginx). No hay paso de compilación. Antes de publicar, revisa los pendientes en `docs/CATALOG_DATA.md` §8 (fotos, derechos y dominio).

## Accesibilidad y movimiento

- Navegación completa con teclado: ← y → cambian de familia, Esc sube un nivel, y el foco se mueve al título de cada vista.
- `prefers-reduced-motion`: sin autoplay, sin partículas animadas (se muestra una imagen fija), sin parallax ni transiciones.
- Vista «Ver como lista» con HTML semántico, y lista en `<noscript>` con enlaces directos a WhatsApp.
