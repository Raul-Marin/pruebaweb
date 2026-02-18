# Design Tokens → Web (Figma + Tokens Studio + Style Dictionary + GitHub)

Repositorio que mantiene los **design tokens** sincronizados desde Figma (con Tokens Studio) a GitHub, los transforma con **Style Dictionary** y despliega una web que se actualiza automáticamente.

## Flujo

```
Figma (Tokens Studio)  →  Push  →  GitHub  →  Style Dictionary  →  GitHub Pages
                                    │
                                    └── tokens.json
                                    └── npm run build
                                        └── @tokens-studio/sd-transforms
                                        └── css/variables.css
```

1. **Editas tokens** en Figma con el plugin Tokens Studio
2. **Haces push** desde el plugin a este repo
3. **GitHub Actions** ejecuta `npm run build` (Style Dictionary)
4. Se genera `css/variables.css` con variables CSS
5. La **web** usa esas variables y se despliega en GitHub Pages

## Style Dictionary

El build usa:
- **@tokens-studio/sd-transforms**: Preprocesa el formato de Tokens Studio (referencias, math, unidades)
- **style-dictionary**: Transforma tokens a variables CSS

```bash
npm run build
```

Genera `css/variables.css` a partir de `tokens.json`.

## Configuración inicial

### 1. Crear el repositorio en GitHub

1. Crea un repo nuevo en GitHub (ej: `tokens-web`)
2. Sube los archivos de este proyecto (incluye `package-lock.json`)
3. Ve a **Settings → Pages** y configura:
   - **Source**: GitHub Actions
   - Guarda los cambios

### 2. Conectar Tokens Studio con GitHub

1. En Figma, abre **Plugins → Tokens Studio for Figma**
2. Ve a **Settings** (engranaje) → **Sync**
3. Añade **GitHub** como proveedor
4. Autoriza con tu cuenta de GitHub
5. Selecciona este repositorio y la rama `main` (o `master`)
6. Elige la ruta del archivo: `tokens.json` (en la raíz)

### 3. Sincronizar tokens

- **Push**: En Tokens Studio, cuando cambies tokens, usa **Push** para subirlos a GitHub
- **Pull**: Si alguien edita `tokens.json` en GitHub, usa **Pull** en Tokens Studio para traer los cambios

## Estructura del proyecto

```
├── tokens.json           # Tokens (sincronizados desde Figma)
├── build-tokens.mjs      # Script de build (Style Dictionary)
├── package.json
├── index.html            # Web que usa css/variables.css
├── css/
│   └── variables.css     # Generado por Style Dictionary (no editar)
├── .github/
│   └── workflows/
│       └── deploy.yml    # Build + deploy a GitHub Pages
└── README.md
```

## Desarrollo local

```bash
npm install
npm run build
```

Luego abre `index.html` en el navegador (o usa un servidor local). La web carga `css/variables.css` generado por Style Dictionary.

## Formato de tokens

El `tokens.json` debe seguir el formato de Tokens Studio. Style Dictionary (con sd-transforms) convierte las rutas a variables CSS en kebab-case:

- `global.colors.primary` → `--global-colors-primary`
- `global.colors.textMuted` → `--global-colors-text-muted`
- `global.spacing.md` → `--global-spacing-md` (con `px` automático)

## URLs

- **Web**: `https://<tu-usuario>.github.io/<nombre-repo>/`
- **Tokens raw**: `https://raw.githubusercontent.com/<usuario>/<repo>/main/tokens.json`
