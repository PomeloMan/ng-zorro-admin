const fs = require("fs");
const path = require("path");
const { generateTheme } = require("antd-theme-generator");

const themeVariables = ["@primary-color"];
const root = path.resolve(__dirname, "../");
const tmpVarFilePath = path.join(root, "scripts/var.less");
const outputFilePath = path.join(root, "./src/assets/default.less");

const options = {
  stylesDir: path.join(root, "./src/styles/themes"),
  antdStylesDir: path.join(root, "./node_modules/ng-zorro-antd"),
  varFile: path.join(root, "./scripts/var.less"),
  mainLessFile: path.join(root, "./src/styles/empty.less"),
  themeVariables,
  outputFilePath,
};

function genVarFile() {
  const ALLVAR = `
    @import '~ng-zorro-antd/style/themes/default.less';
  `;

  fs.writeFileSync(tmpVarFilePath, ALLVAR);
}

function removeVarFile() {
  fs.unlinkSync(tmpVarFilePath);
}

function removeOutputFile() {
  if (fs.existsSync(outputFilePath)) {
    fs.unlinkSync(outputFilePath);
  }
}

genVarFile();
removeOutputFile();
generateTheme(options)
  .then(() => {
    removeVarFile();
    console.log("Theme generated successfully");
  })
  .catch((error) => {
    removeVarFile();
    console.error("Error", error);
  });
