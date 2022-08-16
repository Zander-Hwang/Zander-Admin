/**
 * @Description: 配置声明
 * @Author: Zander
 * @Date: 2022/4/29 17:35
 * @LastEditors: Zander
 * @LastEditTime: 2022/4/29 17:35
 */
export type LocaleType = 'zh_CN' | 'en' | 'ru' | 'ja' | 'ko';

export interface LocaleSetting {
  // 是否显示语言切换配置
  showPicker: boolean;
  // 当前语言 和本地化相关
  locale: LocaleType;
  // 默认的语言
  fallback: LocaleType;
  // 可用的语言
  availableLocales: LocaleType[];
}

export interface ProjectConfig {
  showBreadCrumb: boolean;
}

export interface GlobEnvConfig {
  // Site title
  VITE_GLOB_APP_TITLE: string;
  // Service interface url
  VITE_GLOB_API_URL: string;
  // Service interface url prefix
  VITE_GLOB_API_URL_PREFIX?: string;
  // Project abbreviation
  VITE_GLOB_APP_SHORT_NAME: string;
  // Upload url
  VITE_GLOB_UPLOAD_URL?: string;
}
