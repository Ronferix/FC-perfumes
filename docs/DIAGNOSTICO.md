# Perfumes FC — Diagnóstico previo (Fase 1)

Fecha: 25-sep-2026 · Estado: **histórico**. Las decisiones del negocio y la verificación final están en [CATALOG_DATA.md](CATALOG_DATA.md).

> Corrección posterior: el logotipo **sí** tenía transparencia real. Solo arrastraba un halo casi invisible, que ya se limpió (ver CATALOG_DATA §7).

Leyenda de verificación:

- ✅ **Verificado**: el producto existe, el nombre y la marca son correctos y las notas de la infografía coinciden (o casi) con la fuente.
- ⚠️ **Existe, con errores**: el producto es real, pero la infografía tiene mal la marca, el nombre, las notas o la familia.
- ❓ **Ambiguo / no confirmado**: no se pudo saber con certeza qué producto es (nombre inexistente, varias variantes posibles o solo fuentes débiles).

Fuentes consultadas: Fragrantica y Parfumo (fuentes especializadas), sitios oficiales o distribuidores oficiales cuando fue posible (lattafa-usa.com, lattafa.com, armaf.com, us.afnan.com, dumontperfumes.com, orienticaperfumes.com, hamidiperfume.com) y minoristas solo como último recurso. **Límite honesto:** en la mayoría de los casos contrasté contra Fragrantica o Parfumo y la ficha del distribuidor. Antes de publicar, cada ficha debe confirmarse en la página oficial exacta, y eso se hará al construir `CATALOG_DATA.md`.

---

## 1. Las 9 familias identificadas

| # | Familia (como viene) | Productos listados | Observación |
|---|---|---|---|
| 1 | Dulces | 5 | Nombre coloquial; técnicamente sería «gourmand» |
| 2 | Amaderados | 5 | 2 de 5 no son amaderados según su pirámide real |
| 3 | Florales | 5 | «Yara Rose» se repite en Atalcados como «Yara» |
| 4 | Especiados | 5 | Khamrah, Khamrah Qahwa y Asad Bourbon se repiten en otras familias |
| 5 | Cítricos | 5 | Dumont Nitro Green no es cítrico (es fougère aromático) |
| 6 | Atalcados | 5 | Correcto como concepto (empolvados) |
| 7 | Ambarados / Orientales | 5 | 2 duplicados de Especiados; Infinity Gold duplicado en Nicho |
| 8 | Cuero | 4 | **Solo 1 de 4 es realmente de cuero** |
| 9 | Nicho / Especiales | 9 | **No son marcas nicho** (son Lattafa y Armaf); el nombre promete algo que no es |

Total: **48 entradas en las infografías → 43 perfumes únicos** (5 duplicados).

---

## 2 · 3 · 4. Todos los perfumes: identificación, verificación y problemas

### 1 · Dulces

| Infografía | Producto real | Estado | Qué está mal / notas |
|---|---|---|---|
| Khamrah — Lattafa | **Lattafa Khamrah** (2022, unisex, EDP) | ⚠️ | En el corazón dice **«lirio»**; el real es **nardo (tuberosa)** y mahonial. La ficha de Especiados sí lo tiene bien. Fondo real: vainilla, haba tonka, amberwood, mirra, benjuí, akigalawood. [Fragrantica](https://www.fragrantica.com/perfume/Lattafa-Perfumes/Khamrah-75805.html) |
| Yara Tous — Lattafa | **Lattafa Yara Tous** (2023, femenino) | ✅ | Coincide. Detalle: «madera de cachemira» es una traducción errónea de *cashmeran* (un material sintético almizclado, no una madera). [Fragrantica](https://www.fragrantica.com/perfume/Lattafa-Perfumes/Yara-Tous-83320.html) |
| Eclaire — Lattafa | **Lattafa Eclaire** (2024) | ⚠️ leve | Real: caramelo, leche, azúcar / miel, flores blancas / vainilla, praliné, almizcle. La infografía agrega «maderas», que no aparece en la pirámide. [Fragrantica](https://www.fragrantica.com/perfume/Lattafa-Perfumes/Eclaire-93628.html) |
| Vanilla Freak — **French Avenue** | **Lattafa Vanilla Freak**, colección *Give Me Gourmand* (2025, 75 ml) | ⚠️ grave | **La marca es Lattafa, no French Avenue.** Las notas no coinciden. Real: cupcake / azúcar, betún, almendra, canela / mantequilla, vainilla, almizcle. La infografía inventa cacao, jazmín, ámbar y maderas. [Fragrantica](https://www.fragrantica.com/perfume/Lattafa-Perfumes/Vanilla-Freak-114400.html) · [Lattafa USA](https://www.lattafa-usa.com/products/vanilla-freak) |
| Berry On — **Zimaya** | **Lattafa Berry On Top**, colección *Give Me Gourmand* (2025, 75 ml) | ⚠️ grave | **La marca es Lattafa, no Zimaya**, y el nombre completo es «Berry On Top». Real: fresa, crema chantilly / mermelada de fresa, azúcar, flores blancas / vainilla, almizcle. No lleva mandarina, naranja ni maderas. [Fragrantica](https://www.fragrantica.com/perfume/Lattafa-Perfumes/Berry-On-Top-114395.html) |

### 2 · Amaderados

| Infografía | Producto real | Estado | Qué está mal / notas |
|---|---|---|---|
| Ameerat Negro — Lattafa | Probablemente **Asdaaf (Lattafa) Ameer Al Arab**, frasco negro, 2022 | ❓ | «Ameerat Negro» no existe. *Ameerat* Al Arab es el femenino (frasco rojo) y *Ameer* Al Arab el masculino (negro). Existe también «Ameer Al Arab Imperium» (2024). Las pirámides difieren entre fuentes. **Necesito una foto del frasco que venden.** [Fragrantica](https://www.fragrantica.com/perfume/Asdaaf/Ameer-Al-Arab-105834.html) |
| Hayaati Negro — Lattafa | **Lattafa Hayaati** (2020), frasco negro, vendido también como «Hayaati Black» | ✅ | Manzana, bergamota / canela, maderas / almizcle, vainilla. Coincide y encaja en la familia (Woody Aromatic). [Fragrantica](https://www.fragrantica.com/perfume/Lattafa-Perfumes/Hayaati-75902.html) |
| Al Haramain Blue | ¿**Haramain Signature Blue**? ¿**Amber Oud Bleu Edition**? | ❓ | Hay varios «Blue» de Al Haramain y **ninguno coincide** con limón, lavanda y romero. Signature Blue: limón, hojas verdes, bergamota, naranja amarga, toronja / geranio / vetiver, pachulí, cedro. **Necesito una foto.** [Signature Blue](https://www.fragrantica.com/perfume/Al-Haramain-Perfumes/Haramain-Signature-Blue-63934.html) · [Amber Oud Bleu](https://www.fragrantica.com/perfume/Al-Haramain-Perfumes/Amber-Oud-Bleu-Edition-73206.html) |
| Hamidi Accord — Hamidi | **Hamidi Fusion Accord** (2023, 85 ml) | ⚠️ grave | El nombre real es «**Fusion** Accord». Notas reales: piña, manzana, grosella negra, bergamota / jazmín, abedul, pachulí, rosa / musgo de roble, ámbar gris, almizcle, vainilla. La infografía pone cítricos genéricos. Es afrutado-chipre: su lugar en «amaderados» es discutible. [Fragrantica](https://www.fragrantica.com/perfume/Hamidi/Accord-88251.html) |
| Hamidi Concord — Hamidi | **Hamidi Fusion Concord** (2023, 85 ml) | ⚠️ grave | Real: jazmín, azahar, durazno / jazmín sambac, nardo, rosa / sándalo, praliné, almizcle, iris. **Es floral, no amaderado.** La infografía (bergamota, especias, maderas, ámbar) no coincide. [Fragrantica](https://www.fragrantica.com/perfume/Hamidi/Concord-88249.html) |

### 3 · Florales

| Infografía | Producto real | Estado | Qué está mal / notas |
|---|---|---|---|
| Yara Rose — Lattafa | **Lattafa Yara** (2020, frasco rosa) | ✅ | Coincide: orquídea, heliotropo, mandarina / gourmand, frutas tropicales / vainilla, almizcle, sándalo. «Yara Rose» es un nombre informal de tienda. **Duplicado** con «Yara» en Atalcados. [Fragrantica](https://www.fragrantica.com/perfume/Lattafa-Perfumes/Yara-76880.html) |
| Yara Elixir — Lattafa | **Lattafa Yara Elixir** (2025) | ✅ | Coincide: fresa (s'mores), grosella negra / jazmín, azahar / vainilla, caramelo, ámbar, almizcle. Fragrantica lo clasifica como *Oriental Vainilla*, así que su lugar en «florales» es discutible. [Fragrantica](https://www.fragrantica.com/perfume/Lattafa-Perfumes/Yara-Elixir-117615.html) |
| Fakhar Rose — Lattafa | **Lattafa Fakhar Rose / Fakhar Women** (2022) | ✅ | Coincide muy bien con Fragrantica. [Fragrantica](https://www.fragrantica.com/perfume/Lattafa-Perfumes/Fakhar-Rose-70466.html) |
| Ameerat Azul — Lattafa | Posiblemente **Asdaaf Ameerat Al Arab Blue** | ❓ | Solo aparece en minoristas; no hay ficha especializada ni oficial. No se pueden confirmar las notas. **Necesito una foto.** [Minorista](https://houseoflattafaperfumes.co.za/product/ameerat-al-arab-blue/) |
| Queen Arabia — Lattafa | **Lattafa Pride Queen of Arabia** | ⚠️ grave | El nombre real es «Queen **of** Arabia», de la línea Lattafa Pride. Notas oficiales: **coco, sal / sándalo, heliotropo / vainilla, ámbar**. La infografía (frutas, cítricos, jazmín, rosa) no coincide en nada. [Fragrantica](https://www.fragrantica.com/perfume/Lattafa-Perfumes/Queen-Of-Arabia-113075.html) · [Lattafa USA](https://www.lattafa-usa.com/products/queen-of-arabia) |

### 4 · Especiados

| Infografía | Producto real | Estado | Qué está mal / notas |
|---|---|---|---|
| Khamrah — Lattafa | Lattafa Khamrah | ✅ | Esta versión sí es correcta (nardo, mahonial, benjuí, amberwood, akigalawood). **Duplicado** con Dulces. |
| Khamrah Qahwa — Lattafa | **Lattafa Khamrah Qahwa** (2023) | ✅ | Coincide. **Duplicado** con Ambarados. [Fragrantica](https://www.fragrantica.com/perfume/Lattafa-Perfumes/Khamrah-Qahwa-88175.html) |
| Asad Bourbon — Lattafa | **Lattafa Asad Bourbon** (2025, masculino) | ✅ | Coincide. **Duplicado** con Ambarados. [Fragrantica](https://www.fragrantica.com/perfume/Lattafa-Perfumes/Asad-Bourbon-101124.html) |
| Checkmate Knight — **French Avenue** | **Armaf Checkmate Knight** (colección Checkmate) | ⚠️ / ❓ | **La marca es Armaf, no French Avenue.** Además, Armaf tiene *Checkmate Knight*, *Checkmate Black Knight* y *Checkmate White Knight* (las dos últimas de 2026). No se pudo cerrar la pirámide exacta. El frasco dibujado en la infografía no está verificado. **Necesito una foto.** [Armaf Black Knight](https://armaf.com/products/checkmate-black-knight) · [Fragrantica Black Knight](https://www.fragrantica.com/perfume/Armaf/Black-Knight-123192.html) |
| 9PM Rebel — Afnan | **Afnan 9 PM Rebel** (2024, unisex) | ✅ | Coincide con la ficha oficial (mandarina, piña, Granny Smith / cedro, musgo de roble, vainilla / caramelo, maderas secas, ámbar gris, almizcle). La infografía dice «amberwood», pero la ficha oficial dice «ámbar gris»; es un detalle menor. [Afnan oficial](https://us.afnan.com/products/9-pm-rebel) |

### 5 · Cítricos

| Infografía | Producto real | Estado | Qué está mal / notas |
|---|---|---|---|
| Hawas Ice — Rasasi | **Rasasi Hawas Ice** (2023, masculino) | ✅ | Coincide. [Fragrantica](https://www.fragrantica.com/perfume/Rasasi/Hawas-Ice-89050.html) |
| Hawas Malibu — Rasasi | **Rasasi Hawas Malibu** (2025) | ⚠️ leve | La salida coincide. Corazón real: **iris, ámbar, lavanda**. Fondo: **haba tonka, almizcle, pachulí, cashmeran**. La infografía los resume de forma vaga. [Fragrantica](https://www.fragrantica.com/perfume/Rasasi/Hawas-Malibu-112707.html) |
| Odyssey Mandarin Sky — Armaf | **Armaf Odyssey Mandarin Sky** (2023) | ✅ | Coincide. Ojo: existen también las versiones *Elixir* y *Vintage Edition*; hay que confirmar cuál venden. [Fragrantica](https://www.fragrantica.com/perfume/Armaf/Odyssey-Mandarin-Sky-83132.html) |
| Odyssey Limón — Armaf | **Armaf Odyssey Limoni** (Fresh Edition, 2024) | ⚠️ | El nombre real es «Limoni». Ficha **oficial**: limón, naranja dulce, bergamota, mandarina / jengibre, azahar, notas marinas / ámbar, almizcle, té azul. La infografía inventa lima, menta, pimienta negra y cedro. [Armaf oficial](https://armaf.com/products/armaf-odyssey-limoni-fresh-edition) |
| Dumont Nitro Green — Dumont | **Dumont Nitro Green** (2020, masculino) | ⚠️ grave | Ficha **oficial**: acorde fougère, vainilla / lavandín, ámbar seco, hojas de cedro / violeta, acorde terroso. **No es cítrico: es un fougère aromático.** Ni toronja, ni limón, ni manzana, ni menta. [Dumont oficial](https://dumontperfumes.com/products/nitro-green) · [Fragrantica](https://www.fragrantica.com/perfume/Dumont/Nitro-Green-73024.html) |

### 6 · Atalcados

| Infografía | Producto real | Estado | Qué está mal / notas |
|---|---|---|---|
| Musk Mood | **Lattafa Musk Mood** | ✅ | Coincide. A la infografía le falta la marca. [Fragrantica](https://www.fragrantica.com/perfume/Lattafa-Perfumes/Musk-Mood-74235.html) |
| Musk So Poudre | **Lattafa Musk So Poudrée** (colección Thameen) | ⚠️ leve | Falta la tilde («Poudrée») y la marca. La pirámide es vaga en todas las fuentes (empolvado, floral / empolvado, maderas / almizcle, ámbar). Conviene usar una descripción conservadora. [Fragrantica](https://www.fragrantica.com/perfume/Lattafa-Perfumes/Musk-So-Poudree-80261.html) |
| Peace & Love | **Lattafa Pride Peace & Love** (2024) | ⚠️ | Real: **almendra, grosella negra, bergamota / rosa, nardo / sándalo, vainilla, heliotropo**. La infografía (pera, notas frescas, flores blancas, ámbar) no coincide. [Fragrantica](https://www.fragrantica.com/perfume/Lattafa-Perfumes/Peace-Love-100386.html) |
| Amerat Privé Rose | **Asdaaf Ameerat Al Arab Privé Rose** (2023) | ⚠️ | Mal escrito («Amerat»). Real: fresa, uva, naranja / rosa, almizcle blanco, jazmín, gardenia, ylang-ylang, lirio / haba tonka, ámbar, sándalo. **El lichi y la peonía no son notas oficiales**; el lichi solo lo mencionan reseñas de usuarios. [Fragrantica](https://www.fragrantica.com/perfume/Asdaaf/Ameerat-Al-Arab-Prive-Rose-81967.html) |
| Yara | Lattafa Yara | ✅ | **Duplicado** de «Yara Rose» (Florales). Sus notas encajan más en «atalcado/gourmand» que en «floral». |

### 7 · Ambarados / Orientales

| Infografía | Producto real | Estado | Qué está mal / notas |
|---|---|---|---|
| Khamrah Qahwa | Lattafa Khamrah Qahwa | ✅ | Duplicado. |
| Asad Bourbon | Lattafa Asad Bourbon | ✅ | Duplicado. |
| Bharara King | **Bharara King** (2021, masculino) | ✅ | Coincide. [Fragrantica](https://www.fragrantica.com/perfume/Bharara/King-74184.html) |
| Orientica Amber | **Orientica Royal Amber** (2021; Orientica es una línea de Al Haramain) | ✅ / ❓ | Las notas coinciden con *Royal Amber*. Hay que confirmar la variante: Royal Amber, *Exclusive* Royal Amber (2024) o Parfum Concentré. La infografía omite «Royal». [Fragrantica](https://www.fragrantica.com/perfume/Orientica-Premium/Royal-Amber-69362.html) · [Orientica oficial](https://www.orienticaperfumes.com/en-us/products/royal-amber) |
| Infinity Gold | **Armaf Infinity Gold** (2024, femenino, 105 ml) | ⚠️ | Falta la marca. Real: **pera, lavanda, rosa / ylang-ylang, jazmín / vainilla, almizcle, musgo**. La infografía es genérica. **Duplicado** en Nicho. [Armaf oficial](https://armaf.com/products/infinity-spr) |

### 8 · Cuero — familia con problemas estructurales

| Infografía | Producto real | Estado | Qué está mal / notas |
|---|---|---|---|
| Ishq Al Shuyukh Silver | **Lattafa Pride Ishq Al Shuyukh Silver** (2022) | ⚠️ grave | **No lleva cuero.** Real: limón, bergamota / piña, pimienta negra / vainilla, amberwood, cedro, pachulí (Woody Fruity). La infografía inventa cuero, geranio, azafrán, oud y lavanda. [Fragrantica](https://www.fragrantica.com/perfume/Lattafa-Perfumes/Ishq-Al-Shuyukh-Silver-81099.html) |
| Ishq Al Shuyukh Gold | **Lattafa Pride Ishq Al Shuyukh Gold** (2022) | ⚠️ | Sí es de cuero (Woody Leathery). Real: **caramelo, azafrán / haba tonka, cuero de ante / ámbar, vainilla, almizcle**. La infografía agrega cítricos, cardamomo, rosa y oud, que no aparecen. [Fragrantica](https://www.fragrantica.com/perfume/Lattafa-Perfumes/Ishq-Al-Shuyukh-Gold-81121.html) |
| Orientica Saffron | Probablemente **Orientica Oud Saffron** (2021) | ⚠️ / ❓ | El nombre real sería «**Oud** Saffron». Real: notas orientales, vainilla / azafrán, pachulí / oud, almizcle, guayaco. **No lleva cuero ni jazmín.** [Fragrantica](https://www.fragrantica.com/perfume/Orientica-Premium/Oud-Saffron-69363.html) |
| Shaheen Silver | **Lattafa Pride Shaheen Silver** (2022) | ⚠️ grave | **No lleva cuero.** Real: bergamota, cassis / pachulí, rosa / musgo de roble, almizcle, ámbar. Nada de piña, iris ni violeta. [Fragrantica](https://www.fragrantica.com/perfume/Lattafa-Perfumes/Shaheen-Silver-82815.html) |

Conclusión: con la información real, **la familia Cuero se queda con un solo perfume** (Ishq Gold). Hay que decidir si se fusiona con otra o si el negocio tiene más perfumes de cuero.

### 9 · Nicho / Especiales

| Infografía | Producto real | Estado | Qué está mal / notas |
|---|---|---|---|
| Art of the Universe | **Lattafa Pride Art of Universe** (2025) | ⚠️ grave | Nombre sin «the». Real: **mandarina, jengibre, bergamota, menta / pera, azahar / almizcle, ámbar, cedro** (cítrico aromático). La infografía inventa oud, azafrán y resinas. [Fragrantica](https://www.fragrantica.com/perfume/Lattafa-Perfumes/Art-Of-Universe-101314.html) |
| Infinity Gold | Armaf Infinity Gold | ⚠️ | Duplicado (ver Ambarados). |
| Connoisseur | **Armaf Connoisseur Man** o **Connoisseur Woman** (2024) | ❓ | No se sabe cuál venden. **Ninguno de los dos** lleva iris, cuero ni oud como dice la infografía. [Man](https://www.fragrantica.com/perfume/Armaf/Connoisseur-Man-98721.html) · [Woman](https://www.fragrantica.com/perfume/Armaf/Connoisseur-Women-98722.html) |
| Orchestra | Línea **Armaf Orchestra** (Legato Lux, Tempo Tune…) | ❓ | «Orchestra» es una línea con varias variantes. Ninguna coincide con bergamota, pera, rosa y jazmín. [Legato Lux](https://www.fragrantica.com/perfume/Armaf/Orchestra-Legato-Lux-129900.html) · [Tempo Tune](https://www.fragrantica.com/perfume/Armaf/Orchestra-Tempo-Tune-131084.html) |
| Topaz Malaki | **Armaf Mosaic Topaz Malaky** | ⚠️ / ❓ | Nombre real: «Mosaic Topaz Malak**y**». Según minoristas (sin ficha oficial encontrada): mango, azahar, bergamota / ylang, jazmín, nardo / vainilla, almizcle blanco, sándalo. La infografía (lavanda, azafrán, rosa, oud) no coincide. [Minorista](https://www.jomashop.com/armaf-mens-mosaic-topaz-malaky-edp-spray-3-4-oz-fragrances-6294015199475.html) |
| Kingdom W | ¿**Lattafa The Kingdom for Women**? (2024) | ❓ | La «W» sugiere la versión femenina (pera, peonía, cassis / praliné, jazmín, tonka / vainilla, almizcle, sándalo, ámbar), pero las notas de la infografía (incienso, rosa, cuero, oud) se parecen más a la versión **masculina**. Contradicción interna. **Necesito una foto.** [Women](https://www.fragrantica.com/perfume/Lattafa-Perfumes/The-Kingdom-For-Women-98648.html) · [Men](https://www.fragrantica.com/perfume/Lattafa-Perfumes/The-Kingdom-For-Men-97995.html) |
| Petra | **Lattafa Petra** (2025) | ⚠️ grave | Real: **ron, ciruela / nardo, coco / vainilla, almizcle, praliné**. La infografía (frutos rojos, rosa, azafrán, ámbar) no coincide. [Fragrantica](https://www.fragrantica.com/perfume/Lattafa-Perfumes/Petra-107089.html) |
| Éter | Línea **Armaf Éter** (Perfume Oasis, Arabian Sky, Desert Star…) | ❓ | «Éter» es una línea, no un perfume. No se puede saber cuál es. [Armaf Éter](https://armaf.com/collections/eter) |
| Atheeri | **Lattafa Atheeri** (2025) | ⚠️ | Real: **pasiflora, gota de rocío / orquídea, jazmín / vainilla, amberwood**. La infografía (bergamota, azahar, ylang, sándalo) no coincide. [Fragrantica](https://www.fragrantica.com/perfume/Lattafa-Perfumes/Atheeri-105152.html) |

### Resumen de verificación (43 únicos)

- **✅ Verificados (≈15):** Khamrah, Yara Tous, Hayaati, Yara, Yara Elixir, Fakhar Rose, Khamrah Qahwa, Asad Bourbon, 9PM Rebel, Hawas Ice, Odyssey Mandarin Sky, Musk Mood, Bharara King, Orientica Royal Amber (variante por confirmar), Eclaire (con un error menor).
- **⚠️ Existen, pero la infografía tiene la marca, el nombre o las notas mal (≈20):** Vanilla Freak, Berry On Top, Hamidi Fusion Accord, Hamidi Fusion Concord, Queen of Arabia, Checkmate Knight, Hawas Malibu, Odyssey Limoni, Nitro Green, Musk So Poudrée, Peace & Love, Ameerat Privé Rose, Infinity Gold, Ishq Silver, Ishq Gold, Oud Saffron, Shaheen Silver, Art of Universe, Topaz Malaky, Petra, Atheeri.
- **❓ No identificables sin foto del producto (≈7):** Ameerat Negro, Al Haramain Blue, Ameerat Azul, Checkmate Knight (variante), Connoisseur, Orchestra, Kingdom W, Éter.

**Patrón detectado:** las notas de varias infografías parecen **generadas o rellenadas** («notas frutales», «acordes florales», «maderas») y no copiadas de la fuente. En las familias Nicho y Cuero el error es casi sistemático. **Ninguna nota de las infografías se usará sin verificarla.**

---

## 5. Dirección artística por familia

La base común de la marca en todas las familias es la misma: fondo crema o tinta, tipografía serif editorial para los nombres, sans humanista para la información, oro solo en filetes y detalles, y la misma retícula y los mismos controles de navegación. Lo que cambia por familia es la **luz, el color de ambiente, la textura y el tempo**.

| Familia | Color (ambiente) | Luz | Textura | Movimiento | Concepto | Animación base |
|---|---|---|---|---|---|---|
| **Dulces** (gourmand) | Crema tostada, caramelo `#C08A55`, cacao con leche | Cálida y baja, de tarde de pastelería; brillos especulares | Satinada, glaseado, superficie que se derrite | Lento y viscoso; *ease-out* largo | **Antojo**: algo que se disfruta despacio | Hilo de caramelo que cae y se estira (trazo SVG); brillo que recorre el frasco |
| **Amaderados** | Nogal, humo, verde oliva muy oscuro | Contraluz lateral, haz entre sombras | Veta de madera, corteza | Pesado y pausado; desplazamientos cortos | **Arraigo**: presencia sin prisa | La veta se revela con una máscara; motas de polvo en el haz de luz |
| **Florales** | Rosa empolvado, marfil, verde hoja tenue | Natural, difusa, de mañana | Pétalo translúcido | Orgánico, en curvas, como brisa | **Apertura**: algo que florece | Pocos pétalos (≤12) a la deriva; el frasco «respira» |
| **Especiados** | Terracota, azafrán, café negro | Brasa, puntos de luz cálida | Grano, especia molida | Dinámico, en espiral, con chispa | **Despertar**: el calor que sube | Humo sutil ascendente (canvas) y chispas en espiral |
| **Cítricos** | Limón pálido, lima, blanco agua | Mediodía, alta y luminosa, reflejos | Gotas, cáscara, agua | Rápido y chispeante; rebotes cortos | **Claridad**: energía limpia | Salpicadura y gotas, burbujas finas, destello |
| **Atalcados** | Blanco hueso, rosa talco, lila grisáceo | Bruma, velo difuso, sin sombras duras | Polvo, algodón, satén | Suspendido, casi inmóvil | **Piel limpia**: cercanía, abrazo | Nube de polvo que se disipa; desenfoque que se vuelve nítido |
| **Ambarados / Orientales** | Ámbar miel, bronce, burdeos profundo | Dorada de atardecer; brillo *dentro* de la materia (resina) | Resina translúcida, terciopelo | Ondulante, como una respiración | **Resplandor**: calidez que envuelve | Luz que pulsa dentro de una forma de resina; ondas de calor |
| **Cuero** | Coñac, chocolate negro, crema | De estudio, rasante, que marca el relieve | Piel curtida, grano, costura | Firme y decidido; pocas transiciones precisas | **Carácter**: oficio y aplomo | Luz rasante que barre la textura del cuero |
| **Nicho → «Selección»** (ver §10) | Negro tinta, mármol, papel algodón | De galería, foco cenital | Piedra y papel | Revelado pausado, teatral | **Colección curada** | Cada perfume hereda la animación de su acorde real dominante |

### Animación por perfume (se deriva de las notas verificadas, no de la familia)

La animación de cada perfume toma un **preset de la familia** y lo ajusta con **1–2 motivos de sus notas reales**. Ejemplos con datos ya verificados:

- **Khamrah**: especias cálidas (canela) sobre un flujo denso de dátil y praliné; partículas ámbar lentas.
- **Yara Tous**: gotas cremosas de mango y maracuyá sobre una ola de coco; luz amarilla.
- **Eclaire**: capa de leche y caramelo que se vierte; brillo de glaseado.
- **Berry On Top**: puntos rojos (fresa) que se hunden en crema.
- **Hawas Ice**: cristales fríos y destello de manzana y limón; un toque de anís estrellado girando.
- **Odyssey Mandarin Sky**: salpicadura de mandarina que se asienta en caramelo y haba tonka.
- **Ishq Al Shuyukh Gold**: hilos de azafrán y caramelo sobre una textura de ante.
- **Musk Mood**: nube de almizcle blanco, casi inmóvil.

La tabla completa (preset, parámetros y justificación) irá en `CATALOG_DATA.md`, **solo para los perfumes verificados**.

---

## 6. Arquitectura de datos

```
/data
  config.json      → WhatsApp, nombre de marca, textos globales
  families.json    → 9 familias (orden, tema visual, animación)
  perfumes.json    → perfumes (una entrada por producto real, sin duplicados)
  notes.json       → diccionario de notas (id → nombre ES, categoría, color/motivo)
```

**Claves de diseño:**

- **Un perfume, una entrada.** Tiene una `family` principal y `alsoIn` para las familias secundarias. Con esto desaparecen los duplicados (Khamrah, Qahwa, Asad Bourbon, Yara, Infinity Gold).
- **Estado de verificación en los datos.** Con `verification.status` distinto de `"verified"` el perfume **no se publica** (o se publica con una descripción conservadora y sin pirámide).
- **Las notas son IDs**, no texto libre. Así se evita que «lirio» y «nardo» o «cashmeran» y «madera de cachemira» se mezclen.

```jsonc
// families.json (un elemento)
{
  "id": "dulces",
  "name": "Dulces",
  "tagline": "Para quien no se resiste a lo que se derrite despacio.",
  "order": 1,
  "theme": {
    "bg": "#F3E7D8", "ink": "#2B1D14", "accent": "#C08A55",
    "light": "warm-low", "texture": "assets/families/dulces/texture.avif"
  },
  "motion": { "preset": "viscous", "tempo": 0.6 }
}
```

```jsonc
// perfumes.json (un elemento)
{
  "id": "khamrah",
  "name": "Khamrah",
  "brand": "Lattafa",
  "line": null,
  "family": "especiados",
  "alsoIn": ["dulces"],
  "genderByBrand": "unisex",
  "concentration": "EDP",
  "sizesMl": [100],
  "year": 2022,
  "notes": {
    "top":   ["canela", "nuez-moscada", "bergamota"],
    "heart": ["datil", "praline", "nardo", "mahonial"],
    "base":  ["vainilla", "haba-tonka", "amberwood", "mirra", "benjui", "akigalawood"]
  },
  "keyNotes": ["canela", "datil", "vainilla"],
  "description": "Especiado y dulce: canela y dátil sobre un fondo cálido de vainilla y resinas.",
  "images": {
    "bottle": { "src": "assets/perfumes/khamrah/bottle", "w": 1200, "h": 1600,
                "alt": "Frasco de Khamrah de Lattafa, vidrio facetado ámbar con tapa dorada" }
  },
  "animation": { "preset": "viscous", "motifs": ["spice-particles", "date-flow"] },
  "order": 1,
  "published": true,
  "verification": {
    "status": "verified",
    "sources": [
      { "type": "specialist", "url": "https://www.fragrantica.com/perfume/Lattafa-Perfumes/Khamrah-75805.html" },
      { "type": "distributor", "url": "https://www.lattafa-usa.com/products/khamrah" }
    ],
    "checkedAt": "2026-09-25",
    "discrepancies": ["La infografía 'Dulces' decía 'lirio'; la nota real es nardo (tuberosa)."]
  }
}
```

```jsonc
// config.json
{
  "brandName": "Perfumes FC",
  "whatsapp": { "phone": "52XXXXXXXXXX",
    "template": "Hola, quería información sobre el perfume {perfume}." },
  "area": "Zona Metropolitana de Guadalajara"
}
```

**Nota técnica:** `fetch()` de JSON no funciona al abrir el HTML con doble clic (`file://`); sí funciona en cualquier hosting estático y en un servidor local. Si quieres que funcione también con doble clic, la alternativa es que los datos sean módulos `.js` (`export default [...]`). Recomiendo JSON y probar con un servidor local.

---

## 7. Estructura propuesta de la Home (`index.html`)

1. **Header mínimo**: isotipo FC, enlace «Colección» y un enlace de contacto discreto (texto, no botón).
2. **Hero**:
   - Logotipo; un solo frasco real, grande, con luz de ambiente (asset crítico).
   - Headline (opciones de trabajo, sin frases genéricas):
     - «Hay aromas que terminan siendo tuyos.»
     - «Un perfume se elige. El tuyo, se reconoce.»
     - «Encuentra el que se queda contigo.»
   - Texto de apoyo (1 línea): qué es FC, *una selección de perfumes para explorar, con alguien que te orienta*.
   - **CTA principal:** «Explorar la colección» → catálogo. Secundario, en texto: «¿Te ayudamos a elegir?» → WhatsApp (**punto de contacto 1**).
3. **Cómo funciona** (3 pasos, muy breve): *elige una familia → descubre sus perfumes → escríbenos y te orientamos.* Aquí aparece la ZMG de forma natural: «Entregamos en Guadalajara y su zona metropolitana» (confirmar).
4. **Familias** (sección principal): composición editorial asimétrica, no una rejilla de tarjetas iguales. Cada familia lleva su nombre, una palabra de concepto, su color de ambiente y **un frasco real**. CTA: «Ver colección completa».
5. **Una selección** de 3–4 perfumes presentados como una revista (imagen grande y 3 notas), **sin** «más vendido» ni «favorito».
6. **Orientación**: «¿No sabes por dónde empezar?», con 3 entradas por momento (*día · noche · regalo*) que llevan a familias. Cierra con CTA a WhatsApp (**punto de contacto 2**).
7. **Footer mínimo**: logo, «Perfumes FC · Guadalajara y ZMG», WhatsApp (**punto de contacto 3**) y ©.

En total hay 3 puntos de contacto de WhatsApp, separados, nunca dos en la misma pantalla y sin botón flotante permanente.

---

## 8. Estructura de la experiencia de Catálogo (`catalogo.html`)

**Modelo de navegación:** tres estados en la misma pantalla, con URL con hash para que funcionen *atrás* y los enlaces compartibles:

```
#/                   → Galería de familias
#/dulces             → Familia abierta
#/dulces/khamrah     → Ficha del perfume
```

**A. Galería olfativa (familias una por una)**
- Escenario a pantalla completa. El fondo tiene 3 capas: color de ambiente, textura/foto y canvas atmosférico ligero.
- Nombre de la familia en tipografía grande, palabra de concepto, 2–3 frascos reales y el botón «Explorar familia».
- Navegación siempre visible: `03 / 09`, anterior y siguiente, **pausa**, barra de progreso y una lista de familias con sus nombres (no solo puntos de color).
- Autoplay de **9 s** por familia. Se pausa con hover, foco o interacción, se detiene definitivamente cuando el usuario navega por su cuenta y se desactiva con `prefers-reduced-motion`.
- Teclado (← → Espacio), *swipe* en móvil.

**B. Familia abierta** (transformación, no modal)
- Con la **View Transitions API** (nativa, sin librerías; *fallback* con un *crossfade*), el nombre de la familia se desplaza al encabezado y el escenario se convierte en el catálogo.
- En desktop, los perfumes se muestran como una «vitrina» horizontal; en móvil, en columna. Cada perfume lleva frasco, nombre, marca y 3 notas clave, y su animación propia se activa al entrar en pantalla o con hover.
- Siempre visibles: miga de pan «Colección / Dulces», botón «Volver a familias» y Esc.

**C. Ficha del perfume**
- El frasco se expande en su sitio (elemento compartido). Aparece un panel con la pirámide de notas (salida, corazón, fondo) visual, la descripción, la presentación y el **CTA de WhatsApp con el nombre del perfume**.
- Navegación a los perfumes anterior y siguiente de la familia; al cerrar, se vuelve exactamente al mismo punto.

**D. Alternativa accesible**
- Botón «Ver como lista»: todos los perfumes agrupados por familia en HTML semántico. Sirve también como **versión sin JavaScript** (`<noscript>`) y para SEO.

**Rendimiento:** solo se cargan las imágenes de la familia activa y de las dos adyacentes. Los perfumes se cargan al abrir su familia, en AVIF o WebP con `srcset`. Las partículas tienen límite y se reducen en móvil o cuando `deviceMemory` es bajo.

**Dependencias:** ninguna. Todo lo anterior es viable con CSS y JS vanilla, View Transitions, IntersectionObserver y Canvas 2D. **No recomiendo GSAP ni Three.js.**

---

## 9. Assets reales necesarios antes de llegar al nivel visual buscado

**Críticos (bloquean la calidad):**
1. **Logotipo en vector** (SVG/AI/PDF) o PNG con **transparencia real**. El archivo recibido es WebP con **fondo blanco**, no PNG transparente. Se necesitan también versiones **monocroma negra**, **monocroma blanca** e **isotipo «FC» solo**. El dorado fino sobre blanco no tiene contraste suficiente para textos pequeños.
2. **Fotografía de frascos**, uno por perfume. **Recomendación fuerte:** una sesión propia con los frascos que tiene el negocio, con el mismo ángulo, la misma luz y fondo neutro para recortarlos (mínimo 1600 px de alto). Así se garantiza la fidelidad al producto real y se evitan problemas de derechos con fotos de marca. Si se usan imágenes de las marcas, hay que confirmar el permiso de uso.
3. **Fotos de los productos ambiguos** (§2–4 ❓) para identificarlos.

**Importantes:**
4. **9 texturas/ambientes** de familia (caramelo, madera, pétalo, especia, agua/cítrico, polvo, resina, cuero, mármol). Aquí **sí** puede usarse IA o banco de imágenes, porque no representan el producto.
5. **Tipografías** con licencia web para autohospedar. Propuesta libre (OFL): *Cormorant Garamond* o *Fraunces* (serif editorial, afín al logo) y *Manrope* o *Instrument Sans* (texto).
6. **Imagen Open Graph** (1200×630) y favicon, que se generan a partir del isotipo.

**Información del negocio:**
7. Número de WhatsApp.
8. Qué presentaciones venden (¿solo frasco completo?, ¿decants?, ¿qué mililitros?).
9. Confirmar si la entrega es en toda la ZMG, con punto de entrega o de otra forma (solo para redactarlo bien).
10. El brief menciona «100+ perfumes», pero las infografías tienen 43. ¿Hay más productos?

---

## 10. Contradicciones y problemas del material

1. **Nombre de la marca inconsistente.** El brief dice «**Perfumes FC**», el logo dice «**FC Perfumes Árabes**» y las infografías, «**Fer Corona · Perfumes Árabes**». ¿Cuál es el nombre público?
2. **Posicionamiento contra logo.** El brief pide no posicionarse como «perfumes árabes», pero el logo lleva «ÁRABES» como descriptor. Propuesta: usar en la web el isotipo y el nombre sin descriptor, y dejar el logo completo para usos secundarios.
3. **«Nicho» no es preciso.** Lattafa y Armaf son casas de distribución masiva, no perfumería nicho. Llamarlos «nicho» choca con la regla de no hacer afirmaciones difíciles de sostener. Propuesta: «**Selección**», «**Firma**» o «**Colección especial**».
4. **Familia Cuero sin cuero:** 3 de 4 perfumes no tienen cuero en su pirámide real.
5. **Clasificaciones erróneas:** Nitro Green (no es cítrico), Hamidi Fusion Concord (floral, no amaderado) y Queen of Arabia (coco y sal, no floral frutal).
6. **Duplicados entre familias** (5 productos). Se resuelve con familia principal más familias secundarias.
7. **Marcas equivocadas:** Vanilla Freak y Berry On Top son de Lattafa, no de French Avenue ni de Zimaya; Checkmate Knight es de Armaf, no de French Avenue.
8. **Nombres imprecisos:** Fusion Accord/Concord, Queen *of* Arabia, Musk So Poudrée, Art of Universe, Odyssey Limoni, Orientica Royal Amber y Oud Saffron, Mosaic Topaz Malaky, «Ameerat» Privé Rose, «Ameerat Negro».
9. **Notas inventadas o genéricas** en muchas fichas (sobre todo en Cuero y Nicho).
10. **Los frascos de la infografía «Especiados» son ilustraciones**, no fotografías verificables; no deben reutilizarse.
11. **Errata en la infografía «Cítricos»:** el logo dice «**ER CORONA**» (falta la F).
12. **El logo no se entregó como PNG transparente** (llegó en WebP con fondo blanco).
13. **Oro sobre blanco en el logo:** bajo contraste en tamaños pequeños, lo que contradice la regla del brief sobre texto dorado de bajo contraste.
14. **Género:** el brief pide una marca que no se incline ni a lo femenino ni a lo masculino, pero muchas marcas definen sus productos como «para mujer» o «para hombre». Propuesta: guardar el dato y mostrarlo de forma discreta en la ficha («La marca lo presenta como femenino»), sin segmentar el catálogo por género.
15. **Variantes múltiples** en Odyssey Mandarin Sky, Royal Amber, Checkmate, Orchestra, Éter y Connoisseur: hay que confirmar cuál venden.
