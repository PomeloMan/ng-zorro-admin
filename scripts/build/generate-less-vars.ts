import * as fs from 'fs-extra';
import * as path from 'path';
import { generateCompactPaletteLess } from './compact-vars';
import { generateDarkPaletteLess } from './dark-vars';
import { BuildConfig } from '../../build-config';

export function generateLessVars(buildConfig: BuildConfig): void {
  const dist = path.join(buildConfig.outputDir, 'lib');
  fs.writeFileSync(
    path.join(dist, 'dark-theme.js'),
    `module.exports = ${JSON.stringify(generateDarkPaletteLess(buildConfig))}`,
    'utf8'
  );
  fs.writeFileSync(
    path.join(dist, 'compact-theme.js'),
    `module.exports = ${JSON.stringify(
      generateCompactPaletteLess(buildConfig)
    )}`,
    'utf8'
  );
}
