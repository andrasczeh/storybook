import type { PresetProperty } from '@storybook/types';
import { dirname, join } from 'node:path';

function getAbsolutePath<I extends string>(value: I): I {
  return dirname(require.resolve(join(value, 'package.json'))) as any;
}

export const core: PresetProperty<'core'> = {
  builder: getAbsolutePath('@storybook/builder-vite'),
  renderer: getAbsolutePath('@storybook/html'),
};
