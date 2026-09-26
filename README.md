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

## Imágenes y videos con IA (Gemini / Veo)

- `_ia/PROMPTS.md` tiene los prompts de los frascos de estudio, las 20 hojas de ingredientes y los videos de la portada. Para regenerarlo: `python tools/ia_prompts.py`.
- Deja los resultados en `_ia/entrada/frascos/<id>`, `_ia/entrada/ingredientes/hoja-XX` o `_ia/entrada/videos/<id>.mp4`.
- Después ejecuta `python tools/importar_ia.py` y luego `python tools/prerender.py`. El importador recorta el fondo blanco, corta las hojas en cuatro ingredientes, optimiza las imágenes y actualiza `perfumes.json` y `assets/img/ingredients/manifest.json`.
- Los ingredientes se animan solos alrededor del frasco (salida → corazón → fondo) en cuanto existe su imagen. Si un perfume tiene `video`, se muestra el video.
- `_ia/` es solo de trabajo: no la subas al hosting.

Después de cualquier cambio en `/data`, ejecuta `python tools/prerender.py`. Así se actualizan el índice de familias de la portada, la selección y la lista que funciona sin JavaScript.

## Publicar

Sube la carpeta tal cual a cualquier hosting estático (Netlify, Cloudflare Pages, GitHub Pages, un servidor Apache o Nginx). No hay paso de compilación. Antes de publicar, revisa los pendientes en `docs/CATALOG_DATA.md` §8 (fotos, derechos y dominio).

## Accesibilidad y movimiento

- Navegación completa con teclado: ← y → cambian de familia, Esc sube un nivel, y el foco se mueve al título de cada vista.
- `prefers-reduced-motion`: sin autoplay, sin partículas animadas (se muestra una imagen fija), sin parallax ni transiciones.
- Vista «Ver como lista» con HTML semántico, y lista en `<noscript>` con enlaces directos a WhatsApp.
