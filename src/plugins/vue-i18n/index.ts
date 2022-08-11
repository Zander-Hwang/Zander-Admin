import type { App } from 'vue';
import { I18n, I18nOptions, createI18n } from 'vue-i18n';

// 获取函数类型的返回类型
export let i18n: ReturnType<typeof createI18n>;

async function createI18nOptions(): Promise<I18nOptions> {
  return {};
}

export async function setupI18n(app: App) {
  const options = await createI18nOptions();
  i18n = createI18n(options) as I18n;
  app.use(i18n);
}
