import type { App } from 'vue';
import { I18n, createI18n } from 'vue-i18n';
import { createI18nOptions } from '/@/locales';

// 获取函数类型的返回类型
export let i18n: ReturnType<typeof createI18n>;

export async function setupI18n(app: App) {
  const options = await createI18nOptions();
  i18n = createI18n(options) as I18n;
  app.use(i18n);
}
