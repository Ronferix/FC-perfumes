# CATALOG_DATA — mantenimiento del catálogo de Perfumes FC

Documento interno; no se publica. Última revisión: 25-sep-2026.
Fuente de verdad del contenido: `data/*.json`. Este documento explica **de dónde sale cada dato y qué se corrigió**.

## 1. Resumen

- **9 familias** y **43 perfumes únicos**. Las 9 infografías sumaban 48 entradas, con 5 duplicados.
- **38 ✅ verificados**, **3 ⚠️ parciales** (Ameer Al Arab, Queen of Arabia, Musk So Poudrée) y **2 ❓ sin confirmar** (Ameerat Al Arab Blue, Checkmate Knight).
- El negocio resolvió 8 ambigüedades el 25-sep-2026 (Ameerat negro, Ameerat Blue, Amber Oud Bleu, Checkmate Knight, Connoisseur Man, Orchestra Tempo Tune, The Kingdom Women, Éter Arabian Sky).
- Decisiones del negocio:
  - El nombre público es **Perfumes FC**.
  - Se mantiene **Nicho** como categoría: agrupa perfumes poco comunes para amantes de la perfumería, no un grupo de notas, así que sus perfumes pueden pertenecer también a otra familia.
  - Se mantiene **Cuero**, aunque tenga pocos perfumes.
  - La disponibilidad se consulta por WhatsApp.

### Reclasificaciones hechas (por las notas oficiales)

| Perfume | Estaba en | Queda en | Motivo |
|---|---|---|---|
| Dumont Nitro Green | Cítricos | Amaderados | Oficialmente es fougère aromático (lavandín, cedro, acorde terroso) |
| Hamidi Fusion Concord | Amaderados | Florales | Pirámide floral blanca (jazmín, nardo, rosa) |
| Ishq Al Shuyukh Silver | Cuero | Amaderados | No tiene cuero; perfil amaderado frutal |
| Shaheen Silver | Cuero | Amaderados | No tiene cuero; pachulí y musgo de roble |
| Orientica Oud Saffron | Cuero | Especiados (+ Ambarados) | No tiene cuero; azafrán y oud |
| Infinity Gold | Ambarados + Nicho | Nicho (+ Florales) | Oficialmente floral almizclado |
| Éter Arabian Sky | Nicho | Nicho (+ Cuero) | Tiene cuero en el fondo |

Duplicados resueltos con **familia principal + `alsoIn`**: Khamrah, Khamrah Qahwa, Asad Bourbon, Yara (antes «Yara Rose» y «Yara»), Infinity Gold.

## 2. Fuentes y criterio

Prioridad:

1. Sitio oficial o tienda oficial de la marca: armaf.com, lattafa.com, us.afnan.com, dumontperfumes.com, orienticaperfumes.com, hamidiperfume.com, bhararabeauty.com y shop.alharamainperfumes.com.
2. Distribuidor oficial: lattafa-usa.com.
3. Fuente especializada: Fragrantica.
4. Minoristas: solo cuando no hubo otra fuente, y queda indicado.

Criterios:

- Si dos fuentes oficiales no coinciden, **no se muestra pirámide**, solo las notas en las que coinciden (caso Queen of Arabia).
- Si la variante no está confirmada, **no se muestran notas** y la ficha invita a preguntar por WhatsApp.
- Las notas se guardan como ID (`data/notes.json`) para evitar mezclas como «lirio» con «nardo», o «cashmeran» con «madera de cachemira».

## 3. Ficha de verificación por perfume

Leyenda: ✅ información oficial o especializada coincidente · ⚠️ producto confirmado pero con información incompleta o fuentes en conflicto · ❓ variante sin confirmar (no se muestran notas).

### Dulces

| Perfume | Marca | Estado | Fuentes | Correcciones respecto a la infografía |
|---|---|---|---|---|
| Yara Tous | Lattafa | ✅ Verificado | [Lattafa USA (distribuidor oficial)](https://www.lattafa-usa.com/products/yara-tous)<br>[Fragrantica](https://www.fragrantica.com/perfume/Lattafa-Perfumes/Yara-Tous-83320.html) | La infografía traducía cashmeran como «madera de cachemira»; es un material almizclado, no una madera. |
| Eclaire | Lattafa | ✅ Verificado | [Lattafa USA (distribuidor oficial)](https://www.lattafa-usa.com/products/eclaire)<br>[Fragrantica](https://www.fragrantica.com/perfume/Lattafa-Perfumes/Eclaire-93628.html) | La infografía añadía «maderas» en el fondo; no aparece en la pirámide oficial. |
| Vanilla Freak | Lattafa | ✅ Verificado | [Lattafa USA (distribuidor oficial)](https://www.lattafa-usa.com/products/vanilla-freak)<br>[Fragrantica](https://www.fragrantica.com/perfume/Lattafa-Perfumes/Vanilla-Freak-114400.html) | La infografía lo atribuía a French Avenue; es de Lattafa (colección Give Me Gourmand).<br>Las notas de la infografía (cacao, jazmín, ámbar, maderas) no corresponden al producto. |
| Berry On Top <br><small>(también: Berry On)</small> | Lattafa | ✅ Verificado | [Lattafa USA (distribuidor oficial)](https://www.lattafa-usa.com/products/berry-on-top)<br>[Fragrantica](https://www.fragrantica.com/perfume/Lattafa-Perfumes/Berry-On-Top-114395.html) | La infografía lo llamaba «Berry On» y lo atribuía a Zimaya; es «Berry On Top» de Lattafa.<br>Las notas de la infografía (mandarina, naranja, maderas) no corresponden al producto. |

### Amaderados

| Perfume | Marca | Estado | Fuentes | Correcciones respecto a la infografía |
|---|---|---|---|---|
| Ameer Al Arab <br><small>(también: Ameerat Al Arab negro)</small> | Asdaaf (Lattafa) | ⚠️ Parcial | [Lattafa (sitio oficial)](https://lattafa.com/product/ameer-al-arab/)<br>[Al Hajis Perfumes (minorista, «Ameerat Al Arab (Black)»)](https://alhajisperfumes.com/products/lattafa-asdaaf-ameerat-al-arab-black-edp-100ml) | El negocio lo conoce como «Ameerat Al Arab negro». Oficialmente el frasco negro es Ameer Al Arab (masculino); Ameerat Al Arab es la línea femenina. Minoristas venden el frasco negro como «Ameerat Al Arab (Black)».<br>Las pirámides publicadas varían entre fuentes; se usa la del sitio oficial de Lattafa. Confirmar con foto del frasco que vende el negocio. |
| Hayaati <br><small>(también: Hayaati negro, Hayaati Black)</small> | Lattafa | ✅ Verificado | [Lattafa USA (distribuidor oficial)](https://www.lattafa-usa.com/products/hayaati)<br>[Fragrantica](https://www.fragrantica.com/perfume/Lattafa-Perfumes/Hayaati-75902.html) | — |
| Amber Oud Bleu Edition <br><small>(también: Al Haramain Blue, Amber Oud Bleu)</small> | Al Haramain | ✅ Verificado | [Al Haramain (tienda oficial)](https://shop.alharamainperfumes.com/default/amber-oud-bleu-edition.html)<br>[Fragrantica](https://www.fragrantica.com/perfume/Al-Haramain-Perfumes/Amber-Oud-Bleu-Edition-73206.html) | La infografía lo llamaba «Al Haramain Blue» con notas (limón, lavanda, romero) que no corresponden. El negocio confirmó que es Amber Oud Bleu. |
| Fusion Accord <br><small>(también: Hamidi Accord)</small> | Hamidi | ✅ Verificado | [Hamidi (tienda oficial; sin pirámide publicada)](https://hamidiperfume.com/products/hamidi-fusion-accord-exclusive)<br>[Fragrantica](https://www.fragrantica.com/perfume/Hamidi/Accord-88251.html) | Nombre oficial: «Fusion Accord».<br>La infografía usaba notas cítricas genéricas que no corresponden. |
| Nitro Green | Dumont | ✅ Verificado | [Dumont (tienda oficial)](https://dumontperfumes.com/products/nitro-green)<br>[Fragrantica](https://www.fragrantica.com/perfume/Dumont/Nitro-Green-73024.html) | Estaba en Cítricos; su perfil oficial es fougère aromático, por lo que se movió a Amaderados.<br>Las notas de la infografía (toronja, limón, manzana, menta) no corresponden. |
| Ishq Al Shuyukh Silver | Lattafa Pride | ✅ Verificado | [Lattafa USA (distribuidor oficial)](https://www.lattafa-usa.com/products/ishq-al-shuyukh-silver)<br>[Fragrantica](https://www.fragrantica.com/perfume/Lattafa-Perfumes/Ishq-Al-Shuyukh-Silver-81099.html) | Estaba en Cuero, pero no tiene notas de cuero; se movió a Amaderados.<br>Las notas de la infografía (lavanda, cuero, geranio, azafrán, oud) no corresponden. |
| Shaheen Silver | Lattafa Pride | ✅ Verificado | [Lattafa USA (distribuidor oficial)](https://www.lattafa-usa.com/products/shaheen-silver)<br>[Fragrantica](https://www.fragrantica.com/perfume/Lattafa-Perfumes/Shaheen-Silver-82815.html) | Estaba en Cuero, pero no tiene notas de cuero; se movió a Amaderados.<br>Las notas de la infografía (piña, cuero, iris, violeta) no corresponden. |

### Florales

| Perfume | Marca | Estado | Fuentes | Correcciones respecto a la infografía |
|---|---|---|---|---|
| Yara <br><small>(también: Yara Rose, Yara rosa)</small> | Lattafa | ✅ Verificado | [Lattafa USA (distribuidor oficial)](https://www.lattafa-usa.com/products/yara)<br>[Fragrantica](https://www.fragrantica.com/perfume/Lattafa-Perfumes/Yara-76880.html) | Aparecía dos veces (Florales como «Yara Rose» y Atalcados como «Yara»); ahora es una sola ficha con familia secundaria. |
| Yara Elixir | Lattafa | ✅ Verificado | [Lattafa USA (distribuidor oficial)](https://www.lattafa-usa.com/products/yara-elixir)<br>[Fragrantica](https://www.fragrantica.com/perfume/Lattafa-Perfumes/Yara-Elixir-117615.html) | — |
| Fakhar Rose <br><small>(también: Fakhar Women)</small> | Lattafa | ✅ Verificado | [Lattafa USA (distribuidor oficial)](https://www.lattafa-usa.com/products/fakhar)<br>[Fragrantica](https://www.fragrantica.com/perfume/Lattafa-Perfumes/Fakhar-Rose-70466.html) | — |
| Queen of Arabia <br><small>(también: Queen Arabia)</small> | Lattafa Pride | ⚠️ Parcial | [Lattafa USA (distribuidor oficial)](https://www.lattafa-usa.com/products/queen-of-arabia)<br>[Fragrantica](https://www.fragrantica.com/perfume/Lattafa-Perfumes/Queen-Of-Arabia-113075.html) | Las fuentes oficiales no coinciden: Lattafa USA publica ylang-ylang, nuez moscada, toronja / jazmín, rosa, flores blancas / vainilla, ámbar, maderas suaves; lattafa.com y Fragrantica publican coco, sal / sándalo, heliotropo / vainilla, ámbar. Solo coinciden vainilla y ámbar, así que no se muestra pirámide.<br>Nombre oficial: «Queen of Arabia». |
| Fusion Concord <br><small>(también: Hamidi Concord)</small> | Hamidi | ✅ Verificado | [Hamidi (tienda oficial; sin pirámide publicada)](https://hamidiperfume.com/products/hamidi-fusion-concord-exclusive)<br>[Fragrantica](https://www.fragrantica.com/perfume/Hamidi/Concord-88249.html) | Estaba en Amaderados; su pirámide es floral, así que se movió a Florales.<br>Nombre oficial: «Fusion Concord». |
| Ameerat Al Arab Blue | Asdaaf (Lattafa) | ❓ Sin confirmar | [Perfums Arabics (minorista)](https://perfumsarabics.com/products/ameerat-al-arab-blue) | No existe ficha oficial ni especializada. El minorista que lo vende usa la foto de «Ameer Al Arab Imperium» (frasco azul, 2024), que tiene otra pirámide (bergamota, salvia, jengibre / geranio, cashmeran, manzana / ámbar, almizcle, sándalo). Falta foto del frasco que vende el negocio para confirmar. |

### Especiados

| Perfume | Marca | Estado | Fuentes | Correcciones respecto a la infografía |
|---|---|---|---|---|
| Khamrah | Lattafa | ✅ Verificado | [Lattafa USA (distribuidor oficial)](https://www.lattafa-usa.com/products/khamrah)<br>[Fragrantica](https://www.fragrantica.com/perfume/Lattafa-Perfumes/Khamrah-75805.html) | La infografía «Dulces» decía «lirio» en el corazón; la nota oficial es nardo (tuberosa) y mahonial. |
| Khamrah Qahwa | Lattafa | ✅ Verificado | [Lattafa USA (distribuidor oficial)](https://www.lattafa-usa.com/products/khamrah-qahwa)<br>[Fragrantica](https://www.fragrantica.com/perfume/Lattafa-Perfumes/Khamrah-Qahwa-88175.html) | — |
| Asad Bourbon | Lattafa | ✅ Verificado | [Lattafa (sitio oficial)](https://lattafa.com/product/asad-bourbon/)<br>[Fragrantica](https://www.fragrantica.com/perfume/Lattafa-Perfumes/Asad-Bourbon-101124.html) | Fragrantica lo clasifica como masculino; el sitio oficial de Lattafa lo presenta como unisex. |
| Checkmate Knight | Armaf | ❓ Sin confirmar | [Armaf (sitio oficial: solo Black Knight y White Knight)](https://armaf.com/products/checkmate-black-knight)<br>[FragranceX (minorista, «Checkmate Knight»)](https://www.fragrancex.com/products/armaf/armaf-checkmate-knight-cologne) | La infografía lo atribuía a French Avenue; es de Armaf.<br>El sitio oficial de Armaf solo lista Checkmate Black Knight y Checkmate White Knight (2026). Algunos minoristas venden un «Checkmate Knight» con otra pirámide (bergamota, limón, lavanda / cedro, cardamomo, pachulí / ámbar, vetiver, haba tonka). Falta foto del frasco para saber cuál es. |
| 9 PM Rebel <br><small>(también: 9PM Rebel)</small> | Afnan | ✅ Verificado | [Afnan (tienda oficial)](https://us.afnan.com/products/9-pm-rebel)<br>[Fragrantica](https://www.fragrantica.com/perfume/Afnan/9-PM-Rebel-99238.html) | La infografía decía «amberwood»; la ficha oficial dice ámbar gris. |
| Oud Saffron <br><small>(también: Orientica Saffron)</small> | Orientica | ✅ Verificado | [Orientica (tienda oficial; sin pirámide publicada)](https://www.orienticaperfumes.com/en-us/products/oud-saffron)<br>[Fragrantica](https://www.fragrantica.com/perfume/Orientica-Premium/Oud-Saffron-69363.html) | La infografía lo llamaba «Orientica Saffron» y lo ponía en Cuero con notas de cuero, rosa y jazmín que no corresponden. Nombre oficial: «Oud Saffron». Se movió a Especiados. |

### Cítricos

| Perfume | Marca | Estado | Fuentes | Correcciones respecto a la infografía |
|---|---|---|---|---|
| Hawas Ice | Rasasi | ✅ Verificado | [Intense Oud (distribuidor)](https://www.intenseoud.com/products/hawas-ice-for-men-edp-100ml-3-4-oz-by-rasasi-embrace-your-style-with-this-perfume-for-men)<br>[Fragrantica](https://www.fragrantica.com/perfume/Rasasi/Hawas-Ice-89050.html) | La tienda oficial de Rasasi bloquea el acceso automatizado; la imagen proviene de un distribuidor. |
| Hawas Malibu | Rasasi | ✅ Verificado | [Intense Oud (distribuidor)](https://www.intenseoud.com/products/hawas-malibu-eau-de-parfum-spray-100ml-3-4-oz-by-rasasi)<br>[Fragrantica](https://www.fragrantica.com/perfume/Rasasi/Hawas-Malibu-112707.html) | La infografía resumía el corazón y el fondo de forma vaga («acordes frescos», «amaderadas»). |
| Odyssey Mandarin Sky | Armaf | ✅ Verificado | [Armaf (tienda oficial)](https://armaf.com/products/odyssey-mega-for-men)<br>[Fragrantica](https://www.fragrantica.com/perfume/Armaf/Odyssey-Mandarin-Sky-83132.html) | Existen también las versiones Elixir y Vintage Edition; esta ficha corresponde a la original. |
| Odyssey Limoni <br><small>(también: Odyssey Limón)</small> | Armaf | ✅ Verificado | [Armaf (tienda oficial)](https://armaf.com/products/armaf-odyssey-limoni-fresh-edition) | Nombre oficial: «Odyssey Limoni».<br>La infografía inventaba lima, menta, pimienta negra y cedro. |

### Atalcados

| Perfume | Marca | Estado | Fuentes | Correcciones respecto a la infografía |
|---|---|---|---|---|
| Musk Mood | Lattafa | ✅ Verificado | [Lattafa USA (distribuidor oficial)](https://www.lattafa-usa.com/products/musk-mood)<br>[Fragrantica](https://www.fragrantica.com/perfume/Lattafa-Perfumes/Musk-Mood-74235.html) | — |
| Musk So Poudrée <br><small>(también: Musk So Poudre)</small> | Lattafa | ⚠️ Parcial | [Lattafa (sitio oficial; sin pirámide)](https://lattafa.com/product/musk-so-poudree/)<br>[Fragrantica](https://www.fragrantica.com/perfume/Lattafa-Perfumes/Musk-So-Poudree-80261.html) | La pirámide publicada es genérica en todas las fuentes; se usa una descripción conservadora. |
| Peace & Love | Lattafa Pride | ✅ Verificado | [Lattafa USA (distribuidor oficial)](https://www.lattafa-usa.com/products/peace-love)<br>[Fragrantica](https://www.fragrantica.com/perfume/Lattafa-Perfumes/Peace-Love-100386.html) | Las notas de la infografía (pera, notas frescas, ámbar) no corresponden. |
| Ameerat Al Arab Privé Rose <br><small>(también: Amerat Privé Rose)</small> | Asdaaf (Lattafa) | ✅ Verificado | [Lattafa (sitio oficial)](https://lattafa.com/product/ameerat-al-arab-prive-rose/)<br>[Fragrantica](https://www.fragrantica.com/perfume/Asdaaf/Ameerat-Al-Arab-Prive-Rose-81967.html) | La infografía incluía lichi y peonía; no son notas oficiales (el lichi solo aparece en reseñas de usuarios). |

### Ambarados / Orientales

| Perfume | Marca | Estado | Fuentes | Correcciones respecto a la infografía |
|---|---|---|---|---|
| King <br><small>(también: Bharara King)</small> | Bharara | ✅ Verificado | [Bharara (tienda oficial)](https://www.bhararabeauty.com/products/bharara-king)<br>[Fragrantica](https://www.fragrantica.com/perfume/Bharara/King-74184.html) | La foto oficial tiene fondo fotográfico; el recorte deja ver algo del fondo a través del vidrio. |
| Royal Amber <br><small>(también: Orientica Amber)</small> | Orientica | ✅ Verificado | [Orientica (tienda oficial; sin pirámide publicada)](https://www.orienticaperfumes.com/en-us/products/royal-amber)<br>[Fragrantica](https://www.fragrantica.com/perfume/Orientica-Premium/Royal-Amber-69362.html) | La infografía lo llamaba «Orientica Amber». Existen también «Exclusive Royal Amber» (2024) y «Royal Amber Parfum Concentré»; esta ficha corresponde al original. |

### Cuero

| Perfume | Marca | Estado | Fuentes | Correcciones respecto a la infografía |
|---|---|---|---|---|
| Ishq Al Shuyukh Gold | Lattafa Pride | ✅ Verificado | [Lattafa USA (distribuidor oficial)](https://www.lattafa-usa.com/products/ishq-al-shuyukh-gold)<br>[Fragrantica](https://www.fragrantica.com/perfume/Lattafa-Perfumes/Ishq-Al-Shuyukh-Gold-81121.html) | La infografía añadía cítricos, cardamomo, rosa y oud; no aparecen en la pirámide oficial. |

### Nicho

| Perfume | Marca | Estado | Fuentes | Correcciones respecto a la infografía |
|---|---|---|---|---|
| Art of Universe <br><small>(también: Art of the Universe)</small> | Lattafa Pride | ✅ Verificado | [Lattafa USA (distribuidor oficial)](https://www.lattafa-usa.com/products/art-of-universe)<br>[Fragrantica](https://www.fragrantica.com/perfume/Lattafa-Perfumes/Art-Of-Universe-101314.html) | Nombre oficial sin «the».<br>La infografía inventaba pimienta rosa, azafrán, oud y resinas. |
| Infinity Gold | Armaf | ✅ Verificado | [Armaf (tienda oficial)](https://armaf.com/products/infinity-spr) | Aparecía en Ambarados y en Nicho sin marca. Su perfil oficial es floral almizclado: familia principal Nicho y secundaria Florales.<br>Las notas de la infografía eran genéricas. |
| Connoisseur Man <br><small>(también: Connoisseur)</small> | Armaf | ✅ Verificado | [Armaf (tienda oficial)](https://armaf.com/products/connoisseur-spr-1)<br>[Fragrantica](https://www.fragrantica.com/perfume/Armaf/Connoisseur-Man-98721.html) | La infografía (iris, cuero, oud) no correspondía. El negocio confirmó la versión Man. |
| Orchestra Tempo Tune <br><small>(también: Orchestra)</small> | Armaf | ✅ Verificado | [Armaf (tienda oficial)](https://armaf.com/products/orchestra-tempo-tune)<br>[Fragrantica](https://www.fragrantica.com/perfume/Armaf/Orchestra-Tempo-Tune-131084.html) | «Orchestra» es una línea con varias versiones; el negocio confirmó Tempo Tune. Las notas de la infografía no correspondían. |
| Mosaic Topaz Malaky <br><small>(también: Topaz Malaki)</small> | Armaf | ✅ Verificado | [Armaf (tienda oficial)](https://armaf.com/products/mosaic-topaz-malaky) | Nombre oficial: «Mosaic Topaz Malaky». La pirámide oficial coincide en buena parte con la infografía; algunos minoristas publican otra distinta (mango, ylang, nardo), que se descartó. |
| The Kingdom Women <br><small>(también: Kingdom W, The Kingdom for Women)</small> | Lattafa | ✅ Verificado | [Lattafa USA (distribuidor oficial; sin pirámide publicada)](https://www.lattafa-usa.com/products/the-kingdom-women)<br>[Fragrantica](https://www.fragrantica.com/perfume/Lattafa-Perfumes/The-Kingdom-For-Women-98648.html) | La infografía («Kingdom W») usaba notas de la versión masculina (incienso, cuero, oud). El negocio confirmó que es la versión femenina. |
| Petra | Lattafa | ✅ Verificado | [Lattafa USA (distribuidor oficial)](https://www.lattafa-usa.com/products/petra)<br>[Fragrantica](https://www.fragrantica.com/perfume/Lattafa-Perfumes/Petra-107089.html) | Las notas de la infografía (frutos rojos, rosa, azafrán, ámbar) no corresponden. |
| Éter Arabian Sky <br><small>(también: Éter, Arabian Sky)</small> | Armaf | ✅ Verificado | [Armaf (tienda oficial)](https://armaf.com/products/eter-arabian-sky)<br>[Fragrantica](https://www.fragrantica.com/perfume/Armaf/Arabian-Sky-92894.html) | La infografía decía solo «Éter» (es una línea). El negocio confirmó Arabian Sky. Tiene cuero en el fondo, por eso aparece también en Cuero. |
| Atheeri | Lattafa | ✅ Verificado | [Lattafa USA (distribuidor oficial)](https://www.lattafa-usa.com/products/atheeri)<br>[Fragrantica](https://www.fragrantica.com/perfume/Lattafa-Perfumes/Atheeri-105152.html) | Las notas de la infografía (bergamota, azahar, ylang, sándalo) no corresponden. |


## 4. Dirección visual por familia

La base es común a todas las familias: Cormorant Garamond en los títulos, Manrope en los textos, la misma retícula, los mismos controles y el dorado solo como acento. Cada familia cambia la luz, el color, el movimiento y, ligeramente, el estilo del título (cursiva, redonda o versalitas).

| Familia | Concepto | Paleta (fondo → acento) | Luz | Movimiento (motivos del fondo) | Título |
|---|---|---|---|---|---|
| Dulces | Antojo | crema tostada → caramelo | cálida y baja | hilos de caramelo + gotas; lento | cursiva |
| Amaderados | Arraigo | nogal oscuro → bronce | contraluz lateral | motas en un haz de luz + aire; pausado | redonda |
| Florales | Apertura | rosa empolvado → rosa viejo | natural difusa | pétalos + bruma; orgánico | cursiva |
| Especiados | Despertar | brasa → azafrán | puntos de luz cálida | chispas en espiral + humo; dinámico | redonda |
| Cítricos | Claridad | limón pálido → lima | mediodía | salpicaduras + aire; rápido | redonda |
| Atalcados | Piel limpia | blanco hueso → lila gris | bruma | bruma + pétalos; casi inmóvil | cursiva |
| Ambarados / Orientales | Resplandor | ámbar oscuro → miel | dorada interna | resplandor + humo; respiración | redonda |
| Cuero | Carácter | coñac oscuro → cuero | rasante de estudio | brillo que barre + motas; firme | versalitas |
| Nicho | Curiosidad | negro tinta → dorado | galería, cenital | resplandor + motas; revelado | versalitas |

Los valores exactos están en `data/families.json` (`theme` y `motion`).

## 5. Animación de cada perfume y por qué

Cada ficha combina un motivo principal y uno secundario, elegidos a partir de sus **notas verificadas** (columna «notas que lo justifican»). La paleta sale de los colores de esas notas y, en algunos casos, del color real del frasco.

| Perfume | Motivo principal | Motivo secundario | Notas que lo justifican |
|---|---|---|---|
| Khamrah | chispas de especia en espiral | hilos viscosos que bajan (caramelo, miel, vainilla) | Canela, Dátil, Vainilla |
| Yara Tous | gotas de fruta que caen | hilos viscosos que bajan (caramelo, miel, vainilla) | Mango, Coco, Vainilla |
| Eclaire | hilos viscosos que bajan (caramelo, miel, vainilla) | bruma de almizcle y polvo | Caramelo, Leche, Miel |
| Vanilla Freak | hilos viscosos que bajan (caramelo, miel, vainilla) | gotas de fruta que caen | Acorde de cupcake, Almendra, Vainilla |
| Berry On Top | gotas de fruta que caen | hilos viscosos que bajan (caramelo, miel, vainilla) | Fresa, Crema chantilly, Vainilla |
| Ameer Al Arab | hilos de aire (aromático, verde, acuático) | motas en un haz de luz (maderas) | Albahaca, Cardamomo, Sándalo |
| Hayaati | motas en un haz de luz (maderas) | chispas de especia en espiral | Manzana, Canela, Notas amaderadas |
| Amber Oud Bleu Edition | hilos de aire (aromático, verde, acuático) | motas en un haz de luz (maderas) | Toronja, Menta, Sándalo |
| Fusion Accord | motas en un haz de luz (maderas) | gotas de fruta que caen | Piña, Abedul, Musgo de roble |
| Nitro Green | hilos de aire (aromático, verde, acuático) | motas en un haz de luz (maderas) | Lavandín, Hojas de cedro, Acorde terroso |
| Ishq Al Shuyukh Silver | motas en un haz de luz (maderas) | salpicaduras y destellos cítricos | Limón, Piña, Cedro |
| Shaheen Silver | motas en un haz de luz (maderas) | gotas de fruta que caen | Grosella negra (cassis), Pachulí, Musgo de roble |
| Yara | pétalos a la deriva | bruma de almizcle y polvo | Orquídea, Heliotropo, Vainilla |
| Yara Elixir | pétalos a la deriva | gotas de fruta que caen | Fresa (s'mores), Jazmín, Caramelo |
| Fakhar Rose | pétalos a la deriva | gotas de fruta que caen | Granada, Nardo (tuberosa), Rosa |
| Queen of Arabia | pétalos a la deriva | resplandor ámbar que respira | Vainilla, Ámbar |
| Fusion Concord | pétalos a la deriva | hilos viscosos que bajan (caramelo, miel, vainilla) | Durazno, Nardo (tuberosa), Praliné |
| Ameerat Al Arab Blue | hilos de aire (aromático, verde, acuático) | pétalos a la deriva | Sin notas confirmadas: se usa el lenguaje de la familia |
| Khamrah Qahwa | chispas de especia en espiral | humo lento (resinas, incienso, oud) | Cardamomo, Café, Praliné |
| Asad Bourbon | chispas de especia en espiral | hilos viscosos que bajan (caramelo, miel, vainilla) | Pimienta rosa, Cacao, Vainilla bourbon |
| Checkmate Knight | chispas de especia en espiral | motas en un haz de luz (maderas) | Sin notas confirmadas: se usa el lenguaje de la familia |
| 9 PM Rebel | gotas de fruta que caen | chispas de especia en espiral | Piña, Manzana Granny Smith, Caramelo |
| Oud Saffron | humo lento (resinas, incienso, oud) | chispas de especia en espiral | Azafrán, Oud, Vainilla |
| Hawas Ice | salpicaduras y destellos cítricos | hilos de aire (aromático, verde, acuático) | Manzana, Limón, Anís estrellado |
| Hawas Malibu | salpicaduras y destellos cítricos | gotas de fruta que caen | Piña, Toronja, Iris |
| Odyssey Mandarin Sky | salpicaduras y destellos cítricos | hilos viscosos que bajan (caramelo, miel, vainilla) | Mandarina, Caramelo, Haba tonka |
| Odyssey Limoni | salpicaduras y destellos cítricos | hilos de aire (aromático, verde, acuático) | Limón, Jengibre, Notas marinas |
| Musk Mood | bruma de almizcle y polvo | pétalos a la deriva | Almizcle blanco, Notas florales, Sándalo |
| Musk So Poudrée | bruma de almizcle y polvo | pétalos a la deriva | Notas empolvadas, Almizcle |
| Peace & Love | bruma de almizcle y polvo | pétalos a la deriva | Almendra, Rosa, Heliotropo |
| Ameerat Al Arab Privé Rose | bruma de almizcle y polvo | gotas de fruta que caen | Fresa, Rosa, Almizcle blanco |
| King | resplandor ámbar que respira | salpicaduras y destellos cítricos | Naranja, Tutti frutti, Ámbar |
| Royal Amber | resplandor ámbar que respira | gotas de fruta que caen | Melón, Piña, Ámbar |
| Ishq Al Shuyukh Gold | luz rasante sobre grano (cuero) | chispas de especia en espiral | Azafrán, Cuero, Caramelo |
| Art of Universe | salpicaduras y destellos cítricos | hilos de aire (aromático, verde, acuático) | Mandarina, Menta, Pera |
| Infinity Gold | pétalos a la deriva | resplandor ámbar que respira | Pera, Ylang-ylang, Vainilla |
| Connoisseur Man | hilos de aire (aromático, verde, acuático) | humo lento (resinas, incienso, oud) | Manzana verde, Lavanda, Olíbano (incienso) |
| Orchestra Tempo Tune | resplandor ámbar que respira | hilos viscosos que bajan (caramelo, miel, vainilla) | Ralladura de naranja, Miel, Ámbar |
| Mosaic Topaz Malaky | humo lento (resinas, incienso, oud) | pétalos a la deriva | Azafrán, Rosa, Oud |
| The Kingdom Women | pétalos a la deriva | hilos viscosos que bajan (caramelo, miel, vainilla) | Pera, Peonía, Praliné |
| Petra | hilos viscosos que bajan (caramelo, miel, vainilla) | pétalos a la deriva | Ron, Coco, Nardo (tuberosa) |
| Éter Arabian Sky | luz rasante sobre grano (cuero) | salpicaduras y destellos cítricos | Piña, Caramelo, Cuero |
| Atheeri | pétalos a la deriva | resplandor ámbar que respira | Pasiflora, Orquídea, Vainilla |

## 6. Imágenes

- **Frascos:** fotografías oficiales de las fichas de producto de cada marca o distribuidor (ver fuentes en §3). Se recortaron sin alterar forma, tapa, etiqueta, colores ni proporciones: solo se quitó el fondo, se normalizó el lienzo (3:4) y se exportó en WebP a 420 y 840 px (`assets/img/perfumes/`).
  - Bharara King: la única foto oficial limpia tiene fondo fotográfico, así que el recorte deja ver algo del fondo a través del vidrio.
  - Hawas Ice y Hawas Malibu: fotos de un distribuidor (Intense Oud), porque la tienda oficial de Rasasi bloquea el acceso automatizado.
  - La foto de Ameerat Al Arab en lattafa.com está generada por IA (el archivo se llama «Gemini_Generated_Image»), así que **no se usó**. Para el frasco negro se usó la foto oficial de Ameer Al Arab.
  - **Sin foto** (placa tipográfica «Fotografía pendiente»): Ameerat Al Arab Blue y Checkmate Knight, hasta confirmar qué frasco vende el negocio.
- ⚠️ **Derechos:** las fotos oficiales se usan para la demo. Antes de publicar hay que confirmar el permiso de uso con las marcas o distribuidores, o sustituirlas por fotografía propia (recomendado: mismo ángulo, luz y fondo neutro).
- **No se generaron frascos con IA.** Los fondos y atmósferas son procedurales (canvas) y no representan productos.

### Frascos de estudio generados con IA (25-sep-2026)

Generados en Gemini (Nano Banana) a partir de la foto oficial de cada frasco, sobre fondo blanco, y recortados sin alterar el producto. En `perfumes.json`, el campo `imageSource` indica `ia` u `oficial`.

- Integrados: Khamrah, Yara Tous, Vanilla Freak, Berry On Top y Yara Elixir.
- En revisión (`_ia/revisar/`): Eclaire, porque el cuerpo salió color crema en vez de rosa pálido, y Fakhar Rose, porque el texto árabe pequeño quedó borroso. Se mantiene la foto oficial hasta aprobarlos.
- Rechazado: Yara, porque Gemini añadió los textos «For Her» y «Rose Edition», que no existen en el frasco. Desde entonces el prompt prohíbe añadir texto.
- Pendientes: 36 (ver `_ia/PROMPTS.md`).

## 7. Logotipo

- Origen: el archivo WebP que entregó el negocio (1254 px, ya con transparencia).
- Tratamiento: se limpió un halo casi invisible (alfa < 28), se recortó al contorno y se crearon versiones de color plano **con la misma forma** (misma máscara alfa): `logo-gold`, `logo-ink` y `logo-cream`. También el monograma «FC» sin marco (`monogram-*`), los favicons y la imagen para redes (`og-image.jpg`).
- Uso: la versión dorada solo sobre fondos oscuros (tiene poco contraste sobre claro); sobre fondos claros, la versión tinta.
- Pendiente: si el negocio tiene el archivo vectorial original (AI/SVG/PDF), sustituir los PNG/WebP.

## 8. Pendientes antes de publicar

1. Número de WhatsApp en `data/config.json` (`whatsapp.phone`) y ejecutar `python tools/prerender.py`.
2. Fotos de los frascos de **Ameerat Al Arab Blue** y **Checkmate Knight** para cerrar su identificación.
3. Confirmar los derechos de las fotos de producto, o hacer una sesión propia.
4. Revisar con el negocio si «Ameer Al Arab» debe mostrarse con su nombre oficial (lo actual) o como «Ameerat Al Arab negro».
5. Dominio definitivo: completar las URL absolutas de `og:image` y `canonical`.
