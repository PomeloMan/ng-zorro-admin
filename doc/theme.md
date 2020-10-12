## 动态主题

#### 1. 主题样式文件切换
> 需要预先生成所有主题样式文件，通过引用不同的样式文件实现动态主题，此方法不适用可自定义的动态样式
##### 1.1 生成所有主题样式
```
// 生成 src/assets/style.compact.css, src/assets/style.dark.css
npm run theme
```
##### 1.2 添加/删除引入的主题样式文件切换主题样式
```
/**
 * @param theme 'default' | 'dark' | 'compact';
 */
changeTheme(theme: NzaTheme): void {
  if (!this.platform.isBrowser) {
    return;
  }
  const dom = document.getElementById('site-theme');
  if (dom) {
    dom.remove();
  }
  if (theme !== 'default') {
    const style = document.createElement('link');
    style.type = 'text/css';
    style.rel = 'stylesheet';
    style.id = 'site-theme';
    style.href = `assets/style.${theme}.css`;

    document.body.append(style);
  }

  this.store.dispatch(new SettingAction.Value({ theme }));
}
```


#### 2. less.modifyVars 修改变量
> 需要引入less.min.js文件，并引入需包含项目所有样式的.less文件（此项目default.less），通过less.modifyVars
##### 2.1 安装 antd-theme-generator（v1.2.2）
```
npm i antd-theme-generator --save-dev
```
##### 2.2 生成包含项目所有样式的 default.less 文件
```
npm run color
```
##### 2.3 使用 default.less 文件
```
/**
 * 手动添加 less.js，default.less(/scripts/color.js输出文件)文件
 * 改变 default.less 变量值@primary-color从而达到改变主题色的效果
 * 注：default.less需要包含所有使用主题色的样式，自定义主键是，建议将组件样式与组件主题样式分开，然后将组件主题样式合并进default.less中
 */
private loadLess(): Promise<void> {
  if ((window as any).less) {
    return Promise.resolve();
  }
  return this.lazy
    .loadStyle('./assets/default.less', 'stylesheet/less')
    .then(() => {
      const lessScript = this.doc.createElement('script');
      lessScript.innerHTML = `
        window.less = {
          async: true,
          env: 'production', // development
          javascriptEnabled: true
        };
      `;
      this.doc.body.appendChild(lessScript);
    })
    .then(() =>
      this.lazy
        .loadScript(
          'https://gw.alipayobjects.com/os/lib/less.js/3.8.1/less.min.js'
        )
        .catch(() => this.lazy.loadScript('./assets/libs/less.min.js'))
    )
    .then(() => {});
}
/**
 * less.modifyVars
 */
private runLess(color): void {
  const { zone, msg, cdr } = this;
  const msgId = msg.loading(`正在编译主题！`, { nzDuration: 0 }).messageId;
  setTimeout(() => {
    zone.runOutsideAngular(() => {
      return this.loadLess()
        .then(() => {
          (window as any).less
            .modifyVars({
              '@primary-color': color,
            })
            .then(() => {
              msg.success('成功');
              msg.remove(msgId);
              zone.run(() => cdr.detectChanges());
            });
        })
        .catch((err) => {
          msg.error(err.message);
          msg.remove(msgId);
        });
    });
  }, 200);
}
```