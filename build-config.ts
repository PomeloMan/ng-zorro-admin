const { join } = require('path');

const nzAdminPackageJson = require(`${__dirname}/projects/nz-admin/package.json`);

const nzAdminBuildConfig = {
  projectVersion: nzAdminPackageJson.version,
  projectDir: join(__dirname, 'projects/nz-admin'),
  componentsDir: join(__dirname, 'projects/nz-admin/src/lib'),
  scriptsDir: join(__dirname, 'scripts'),
  outputDir: join(__dirname, 'dist/nz-admin'),
  publishDir: join(__dirname, 'publish'),
};

export interface BuildConfig {
  projectVersion: string;
  projectDir: string;
  componentsDir: string;
  scriptsDir: string;
  outputDir: string;
  publishDir: string;
}

export { nzAdminBuildConfig };
