const { join } = require("path");

const nzAdminPackageJson = require(`${__dirname}/projects/nz-admin/package.json`);

const nzAdminBuildConfig = {
  projectVersion: nzAdminPackageJson.version,
  projectDir: join(__dirname, "projects/nz-admin"),
  componentsDir: join(__dirname, "projects/nz-admin/src/lib"),
  scriptsDir: join(__dirname, "scripts"),
  outputDir: join(__dirname, "dist/nz-admin"),
  publishDir: join(__dirname, "publish"),
};

module.exports = { nzAdminBuildConfig };
