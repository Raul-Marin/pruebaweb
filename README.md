# Design Tokens → Web

Figma (Tokens Studio) → Push → GitHub → Style Dictionary → GitHub Pages

## Configuración Tokens Studio

1. **Plugins → Tokens Studio** → Settings → Sync
2. Añade **GitHub** como proveedor
3. Configura la ruta: **`tokens`** (carpeta en la raíz)
4. Push cuando cambies tokens

## Estructura

```
├── tokens/           # core.json, light.json, theme.json (push de Tokens Studio)
├── build-tokens.mjs
├── index.html
├── css/variables.css # Generado
└── .github/workflows/deploy.yml
```

## Local

```bash
npm install
npm run build
```
