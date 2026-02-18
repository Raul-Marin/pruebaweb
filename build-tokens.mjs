#!/usr/bin/env node
/**
 * Build tokens: tokens.json → Style Dictionary → css/variables.css
 * Usa @tokens-studio/sd-transforms para procesar el formato de Tokens Studio
 */
import { register } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';

register(StyleDictionary);

const sd = new StyleDictionary({
  source: [
    'tokensfigma/core.json',
    'tokensfigma/light.json',
    'tokensfigma/theme.json',
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
