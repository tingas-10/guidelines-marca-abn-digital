# ABN Digital — Guía de marca

Sitio web con las pautas de identidad de **ABN Digital**: logos, colores, tipografía, elementos gráficos y recursos listos para crear presentaciones y documentos respetando la marca.

🔗 **Web:** https://tingas-10.github.io/guidelines-marca-abn-digital/

## Para qué sirve

Pensada para que cualquiera del equipo arme materiales coherentes con la marca en **Canva, Gamma, Google Slides** o con **Claude, ChatGPT y Gemini**.

- **HEX copiables** en cada color.
- **Brand prompt** copiable (ES + EN) para pegar en herramientas de IA → sección *Usar con IA*.
- [`brand.json`](brand.json) y [`llms.txt`](llms.txt): specs de marca estructurados y legibles por máquina.
- **Descargas**: logos (PNG transparente alta-res), isotipo (PNG + SVG), iconos, paleta y fuentes Montserrat.

## Marca en 10 segundos

| | |
|---|---|
| **Claim** | Impulsando el crecimiento digital |
| **Color principal** | Tech Green `#3ABD96` |
| **Neutros** | Carbon Black `#232323` · Deep Blue `#1B1837` · Ash White `#F9F7F2` |
| **Tipografía** | Montserrat (Títulos Regular/SemiBold · Cuerpo Light) |

## Estructura

```
index.html        Página principal (single-page)
styles.css        Estilos
script.js          Copiar al portapapeles, prompt bilingüe, nav, reveal
brand.json         Specs de marca (ES + EN) para apps / IA
llms.txt           Resumen de marca para modelos de lenguaje
assets/            Logos, iconos, elementos gráficos, fuentes, descargas
```

## Desarrollo local

Es un sitio estático, sin build. Para verlo localmente:

```bash
python -m http.server 8000
# abrir http://localhost:8000
```

---

Construido a partir del *Manual de Identidad ABN x ROJO*. Uso interno del equipo — el logotipo y la paleta son inalterables.
