/**
 * @Description: 国际化配置导出
 * @Author: Zander
 * @Date: 2022/8/11 16:02
 * @LastEditors: Zander
 * @LastEditTime: 2022/8/11 16:02
 */
import { I18nOptions } from 'vue-i18n';
import { localeSetting } from '/@/config/locale';
import { setHtmlLang, setLoadLocalePool } from '/@/locales/helper';
import { useAppStore } from '/@/store/modules/app';

const { fallback, availableLocales } = localeSetting;

export async function createI18nOptions(): Promise<I18nOptions> {
  const localeStore = useAppStore();
  const locale = localeStore.getLocale;
  const defaultLocal = await import(`./lang/${locale}.ts`);
  const message = defaultLocal.default?.message ?? {};
  setHtmlLang(locale);
  setLoadLocalePool(loadLocalePool => {
    loadLocalePool.push(locale);
  });
  return {
    legacy: false,
    locale,
    // 预设的语言环境。
    fallbackLocale: fallback,
    // 本地化的语言环境信息。
    messages: {
      [locale]: message,
    },
    // 以词法顺序排列的 messages 中的可用语言环境列表。
    availableLocales: availableLocales,
    // 是否将根级别语言环境与组件本地化语言环境同步。
    sync: true,
    // 是否取消本地化失败时输出的警告。
    silentTranslationWarn: true,
    // 是否取消本地化失败时的警告输出。
    missingWarn: false,
    // 是否在回退到 fallbackLocale 或 root 时取消警告。
    silentFallbackWarn: true,
  };
}
