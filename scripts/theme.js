const less = require("less");
const LessPluginCleanCSS = require("less-plugin-clean-css");
const LessPluginNpmImport = require("less-plugin-npm-import");
const fs = require("fs");
const darkThemeVars = require("ng-zorro-antd/dark-theme");
const compactThemeVars = require("ng-zorro-antd/compact-theme");
const appStyles = "src/styles.less"; // 应用的样式入口文件
const themeContent = `@import '${appStyles}';`;

const adminDarkThemeVars = require("../dist/nz-admin/lib/dark-theme");
const adminCompactThemeVars = require("../dist/nz-admin/lib/compact-theme");

function gen(type) {
  return less
    .render(themeContent, {
      javascriptEnabled: true,
      plugins: [
        new LessPluginNpmImport({ prefix: "~" }),
        new LessPluginCleanCSS({ advanced: true }),
      ],
      modifyVars: {
        ...(type === "dark" ? darkThemeVars : compactThemeVars),
        ...(type === "dark" ? adminDarkThemeVars : adminCompactThemeVars),
      },
    })
    .then((data) => {
      fs.writeFileSync(
        // 主题样式的输出文件
        `src/assets/style.${type}.css`,
        data.css
      );
    })
    .catch((e) => {
      // 记录渲染错误
      console.error(type, e);
      throw e;
    });
}

Promise.all([gen("dark"), gen("compact")])
  .then(() => {
    console.log("Success!");
  })
  .catch(() => {
    console.log("Fail!");
  });
