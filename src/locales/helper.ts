/**
 * @Description: i18n 工具类
 * @Author: Zander
 * @Date: 2022/8/9 11:25
 * @LastEditors: Zander
 * @LastEditTime: 2022/8/9 11:25
 */
import type { LocaleType } from '/#/config';
import { set } from 'lodash-es';

export const loadLocalePool: LocaleType[] = [];

export function setHtmlLang(locale: LocaleType) {
  document.querySelector('html')?.setAttribute('lang', locale);
}

export function setLoadLocalePool(callback: (loadLocalePool: LocaleType[]) => void) {
  callback(loadLocalePool);
}

export function genMessage(langs: Record<string, Record<string, any>>, prefix = 'lang') {
  const obj: Recordable = {};
  Object.keys(langs).forEach(key => {
    const langFileModule = langs[key].default;
    let fileName = key.replace(`./${prefix}/`, '').replace(/^\.\//, '');
    const lastIndex = fileName.lastIndexOf('.');
    fileName = fileName.substring(0, lastIndex);
    const keyList = fileName.split('/');
    const moduleName: unknown = keyList.shift();
    const objKey: string = keyList.join('.');

    if (typeof moduleName === 'string' && moduleName) {
      if (objKey) {
        set(obj, moduleName, obj[moduleName] || {});
        set(obj[moduleName], objKey, langFileModule);
      } else {
        set(obj, moduleName, langFileModule || {});
      }
    }
  });
  return obj;
}
