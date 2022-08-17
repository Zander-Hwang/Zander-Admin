/**
 * @Description: 国际化相关操作、方法
 * @Author: Zander
 * @Date: 2022/8/16 17:17
 * @LastEditors: Zander
 * @LastEditTime: 2022/8/16 17:17
 */
import type { LocaleType } from '/#/config';
import { i18n } from '/@/plugins/vue-i18n';
import { unref, computed } from 'vue';
import { useAppStore } from '/@/store/modules/app';
import { loadLocalePool, setHtmlLang } from './helper';

type I18nTranslationReturn = {
  (key: string): string;
  (key: string, locale: string): string;
  (key: string, locale: string, list: unknown[]): string;
  (key: string, locale: string, named: Record<string, unknown>): string;
  (key: string, list: unknown[]): string;
  (key: string, named: Record<string, unknown>): string;
};

type I18nTranslationRestParameters = [string, any];

function setLanguage(locale: LocaleType) {
  const localeStore = useAppStore();
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale;
  } else {
    (i18n.global.locale as any).value = locale;
  }
  localeStore.setLocal({ locale });
  setHtmlLang(locale);
}

function getKey(namespace: string | undefined, key: string) {
  if (!namespace) {
    return key;
  }
  if (key.startsWith(namespace)) {
    return key;
  }
  return `${namespace}.${key}`;
}

export function useLocale() {
  const localeStore = useAppStore();
  const getLocale = computed(() => localeStore.getLocale);
  const getShowLocalePicker = computed(() => localeStore.getShowPicker);

  const getElLocale = computed((): any => {
    return i18n.global.getLocaleMessage(unref(getLocale))?.elLocale ?? {};
  });

  // 更改语言环境
  async function changeLocale(locale: LocaleType) {
    const globalI18n = i18n.global;
    const currentLocale = unref(globalI18n.locale);
    if (currentLocale === locale) {
      return locale;
    }
    if (loadLocalePool.includes(locale)) {
      setLanguage(locale);
      return locale;
    }
    const langModule = ((await import(`./lang/${locale}.ts`)) as any).default;
    if (!langModule) {
      return locale;
    }
    const { message } = langModule;

    globalI18n.setLocaleMessage(locale, message);
    loadLocalePool.push(locale);

    setLanguage(locale);

    return locale;
  }

  return {
    getLocale,
    getShowLocalePicker,
    changeLocale,
    getElLocale,
  };
}

export function useI18n(namespace?: string): { $t: I18nTranslationReturn } {
  const normalFn = {
    $t: (key: string) => {
      return getKey(namespace, key);
    },
  };

  if (!i18n) {
    return normalFn;
  }

  const { t, ...methods } = i18n.global;

  const tFn: I18nTranslationReturn = (key: string, ...arg: any[]) => {
    if (!key) {
      return '';
    }
    if (!key.includes('.') && !namespace) {
      return key;
    }
    return t(getKey(namespace, key), ...(arg as I18nTranslationRestParameters));
  };
  return {
    ...methods,
    $t: tFn,
  };
}

// 主要用于配合vscode i18nn ally插件。此功能仅用于路由和菜单。请在其他地方使用useI18n
export const $t = (key: string) => key;
