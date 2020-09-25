import * as fs from 'fs-extra';
import * as path from 'path';
import { BuildConfig } from '../../build-config';
// tslint:disable-next-line:no-any
const lessToJs = require('less-vars-to-js') as any;

export function generateCompactPaletteLess(buildConfig: BuildConfig): any {
  const stylePath = path.join(buildConfig.componentsDir, 'style');

  const compactLess = fs.readFileSync(
    path.join(stylePath, 'themes', 'compact.less'),
    'utf8'
  );
  return lessToJs(`${compactLess}`, {
    stripPrefix: true,
    resolveVariables: false,
  });
}
