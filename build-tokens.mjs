#!/usr/bin/env node
/**
 * Build: tokens/ → Style Dictionary → css/variables.css
 * Si Tokens Studio hace push a tokens.json (single file), lo sincroniza a tokens/
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { register } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';

register(StyleDictionary);

// Tokens Studio single-file push → tokens.json con { core, light, theme }
// Sincronizar a tokens/ para que el build use los mismos archivos
if (existsSync('tokens.json')) {
  try {
    const data = JSON.parse(readFileSync('tokens.json', 'utf8'));
    if (data.core && data.light && data.theme) {
      mkdirSync('tokens', { recursive: true });
      writeFileSync('tokens/core.json', JSON.stringify(data.core, null, 2));
      writeFileSync('tokens/light.json', JSON.stringify(data.light, null, 2));
      writeFileSync('tokens/theme.json', JSON.stringify(data.theme, null, 2));
      console.log('→ Usando tokens.json (push de Tokens Studio)');
    }
  } catch (_) {}
}

const sd = new StyleDictionary({
  source: [
    'tokens/core.json',
    'tokens/light.json',
    'tokens/theme.json',
  ],
  preprocessors: ['tokens-studio'],
  platforms: {
    css: {
      transformGroup: 'tokens-studio',
      transforms: ['name/kebab'],
      buildPath: 'css/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
        },
      ],
    },
  },
});

await sd.cleanAllPlatforms();
await sd.buildAllPlatforms();

console.log('✓ Tokens generados en css/variables.css');
