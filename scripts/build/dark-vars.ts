import * as fs from 'fs-extra';
import * as path from 'path';
import { BuildConfig } from '../../build-config';
// tslint:disable-next-line:no-any
const lessToJs = require('less-vars-to-js') as any;

export function generateDarkPaletteLess(buildConfig: BuildConfig): any {
  const stylePath = path.join(buildConfig.componentsDir, 'style');

  const defaultLess = fs.readFileSync(
    path.join(stylePath, 'themes', 'default.less'),
    'utf8'
  );
  const darkLess = fs.readFileSync(
    path.join(stylePath, 'themes', 'dark.less'),
    'utf8'
  );
  return lessToJs(`${defaultLess}${darkLess}`, {
    stripPrefix: true,
    resolveVariables: false,
  });
}
