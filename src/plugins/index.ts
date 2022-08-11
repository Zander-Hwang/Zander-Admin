import { App } from 'vue';
// vue-i18n国际化
import { setupI18n } from '/@/plugins/vue-i18n';
// element-plus 组件
import { setupElementPlus } from '/@/plugins/element-plus';
// 自定义 Icon 组件
import { IconOffLine, IconOnline, IconSvg } from '/@/components/Icon';

export function setupPlugins(app: App<Element>) {
  app.use(setupI18n).use(setupElementPlus);
  app.component('IconSvg', IconSvg);
  app.component('IconOffLine', IconOffLine);
  app.component('IconOnline', IconOnline);
}
