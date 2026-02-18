#!/usr/bin/env node
/**
 * Build: tokens/ → Style Dictionary → css/variables.css
 */
import { register } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';

register(StyleDictionary);

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
