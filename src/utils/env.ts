/**
 * @Description: 环境配置参数
 * @Author: Zander
 * @Date: 2022/4/29 17:05
 * @LastEditors: Zander
 * @LastEditTime: 2022/4/29 17:05
 */
import type { GlobEnvConfig } from '/#/config';
import pkg from '../../package.json';
import { getConfigFileName } from '../../build';

export function getCommonStoragePrefix() {
  const { VITE_GLOB_APP_SHORT_NAME } = getAppEnvConfig();
  return `${VITE_GLOB_APP_SHORT_NAME}__${getEnv()}`.toUpperCase();
}

/**
 * 根据版本生成缓存键名
 */
export function getStorageKey() {
  return `${getCommonStoragePrefix()}${`__${pkg.version}`}__`.toUpperCase();
}

/**
 * 获取环境配置参数
 */
export function getAppEnvConfig() {
  const ENV_NAME = getConfigFileName(import.meta.env);
  // 获取全局配置(该配置将在打包时独立提取)
  const ENV = (import.meta.env.DEV
    ? (import.meta.env as unknown as GlobEnvConfig)
    : window[ENV_NAME as any]) as unknown as GlobEnvConfig;
  const {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_APP_SHORT_NAME,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_UPLOAD_URL,
  } = ENV;
  if (!/^[a-zA-Z_\-]*$/.test(VITE_GLOB_APP_SHORT_NAME)) {
    console.warn(`应用短名称只能是大小写字母、下划线，请在环境变量中修改并重新运行。`);
  }
  return {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_APP_SHORT_NAME,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_UPLOAD_URL,
  };
}

/**
 * 开发
 */
export const devMode = 'development';

/**
 * 生产
 */
export const prodMode = 'production';
/**
 * 获取环境变量
 */
export function getEnv(): string {
  return import.meta.env.MODE;
}

/**
 * 是否是开发环境
 */
export function isDevMode(): boolean {
  return import.meta.env.DEV;
}

/**
 * 是否是生产环境
 */
export function isProdMode(): boolean {
  return import.meta.env.PROD;
}
