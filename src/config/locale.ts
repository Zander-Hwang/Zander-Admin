/**
 * @Description: 语言、国际化配置
 * @Author: Zander
 * @Date: 2022/8/15 17:30
 * @LastEditors: Zander
 * @LastEditTime: 2022/8/15 17:30
 */
import type { LocaleType, LocaleSetting } from '/#/config';

export const LOCALE: { [key: string]: LocaleType } = {
  ZH_CN: 'zh_CN',
  EN_US: 'en',
};

export const localeSetting: LocaleSetting = {
  showPicker: true,
  locale: LOCALE.ZH_CN,
  fallback: LOCALE.ZH_CN,
  availableLocales: [LOCALE.ZH_CN, LOCALE.EN_US],
};
