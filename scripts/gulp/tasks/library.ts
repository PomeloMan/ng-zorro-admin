import { task, series, parallel } from 'gulp';
// import { join, resolve } from 'path';
import { compile as compileLess } from '../../build/compile-styles';
import { execNodeTask } from '../utils/task-helper';
import { generateLessVars } from '../../build/generate-less-vars';
import { nzAdminBuildConfig } from '../../../build-config';

/** Run `ng build ng-zorro-antd-lib --prod` */
task(
  'library:build-nz-admin',
  execNodeTask('@angular/cli', 'ng', ['build', 'nz-admin', '--prod'])
);

// Compile less to the public directory.
task('library:compile-less', (done) => {
  compileLess(nzAdminBuildConfig).then(() => {
    done();
  });
});

// Compile less to the public directory.
task('library:generate-less-vars', (done) => {
  generateLessVars(nzAdminBuildConfig);
  done();
});

// Copies files without ngcc to lib folder.
// task('library:copy-libs', () => {
//   return src([join(buildConfig.publishDir, '**/*')]).pipe(
//     dest(join(buildConfig.libDir))
//   );
// });

task(
  'build:library',
  series(
    'library:build-nz-admin',
    parallel('library:compile-less', 'library:generate-less-vars')
  )
);
