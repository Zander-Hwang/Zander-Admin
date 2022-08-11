/**
 * @Description: 浏览器缓存
 * @Author: Zander
 * @Date: 2022/8/9 15:16
 * @LastEditors: Zander
 * @LastEditTime: 2022/8/9 15:16
 */
import type { RouteLocationNormalized } from 'vue-router';
import { createStorage as create, StorageParams } from './storage';
import { DEFAULT_CACHE_TIME, enableEncryption } from '/@/config/encryption';
import { getStorageKey } from '/@/utils/env';
import { Memory } from './memory';
import {
  TOKEN_KEY,
  USER_INFO_KEY,
  ROLES_KEY,
  LOCK_INFO_KEY,
  PROJ_CFG_KEY,
  APP_LOCAL_CACHE_KEY,
  APP_SESSION_CACHE_KEY,
  MULTIPLE_TABS_KEY,
} from '/@/enums/cacheEnum';
import { toRaw } from 'vue';
// import { pick, omit } from 'lodash-es';

interface BasicStore {
  [TOKEN_KEY]: string | number | null | undefined;
  [USER_INFO_KEY]: UserInfo;
  [ROLES_KEY]: string[];
  [LOCK_INFO_KEY]: LockInfo;
  [PROJ_CFG_KEY]: ProjectConfig;
  [MULTIPLE_TABS_KEY]: RouteLocationNormalized[];
}

type LocalStore = BasicStore;

type SessionStore = BasicStore;

// 基础存储接口的Key
export type BasicKeys = keyof BasicStore;
// LocalStore存储接口Key
type LocalKeys = keyof LocalStore;
// SessionStore存储接口Key
type SessionKeys = keyof SessionStore;

export type Options = Partial<StorageParams>;

const createOptions = (storage: Storage, options: Options = {}): Options => {
  return {
    hasEncrypt: enableEncryption,
    storage,
    prefixKey: getStorageKey(),
    ...options,
  };
};

export const WebStorage = create(createOptions(sessionStorage));

export const createStorage = (storage: Storage = sessionStorage, options: Options = {}) => {
  return create(createOptions(storage, options));
};

export const createSessionStorage = (options: Options = {}) => {
  return createStorage(sessionStorage, { ...options, timeout: DEFAULT_CACHE_TIME });
};

export const createLocalStorage = (options: Options = {}) => {
  return createStorage(localStorage, { ...options, timeout: DEFAULT_CACHE_TIME });
};

export default WebStorage;

// 创建本地存储
const ls = createLocalStorage();
// 创建Session存储
const ss = createSessionStorage();
// 创建本地内存
const localMemory = new Memory(DEFAULT_CACHE_TIME);
// 创建Session内存
const sessionMemory = new Memory(DEFAULT_CACHE_TIME);
// 初始化持久化内存
function initPersistentMemory() {
  const localCache = ls.get(APP_LOCAL_CACHE_KEY);
  const sessionCache = ss.get(APP_SESSION_CACHE_KEY);
  localCache && localMemory.resetCache(localCache);
  sessionCache && sessionMemory.resetCache(sessionCache);
}

// 导出一个持久化类，这里面的方法都是静态的
export class StorageUtils {
  static getLocal<T>(key: LocalKeys) {
    return localMemory.get(key)?.value as Nullable<T>;
  }

  static setLocal(key: LocalKeys, value: LocalStore[LocalKeys], immediate = false): void {
    localMemory.set(key, toRaw(value));
    immediate && ls.set(APP_LOCAL_CACHE_KEY, localMemory.getCache);
  }

  static removeLocal(key: LocalKeys, immediate = false): void {
    localMemory.remove(key);
    immediate && ls.set(APP_LOCAL_CACHE_KEY, localMemory.getCache);
  }

  static clearLocal(immediate = false): void {
    localMemory.clear();
    immediate && ls.clear();
  }

  static getSession<T>(key: SessionKeys) {
    return sessionMemory.get(key)?.value as Nullable<T>;
  }

  static setSession(key: SessionKeys, value: SessionStore[SessionKeys], immediate = false): void {
    sessionMemory.set(key, toRaw(value));
    immediate && ss.set(APP_SESSION_CACHE_KEY, sessionMemory.getCache);
  }

  static removeSession(key: SessionKeys, immediate = false): void {
    sessionMemory.remove(key);
    immediate && ss.set(APP_SESSION_CACHE_KEY, sessionMemory.getCache);
  }
  static clearSession(immediate = false): void {
    sessionMemory.clear();
    immediate && ss.clear();
  }

  static clearAll(immediate = false) {
    sessionMemory.clear();
    localMemory.clear();
    if (immediate) {
      ls.clear();
      ss.clear();
    }
  }
}

// 当窗口刷新或者关闭窗口
window.addEventListener('beforeunload', function () {
  // 将内存加载到LocalStorage
  ls.set(APP_LOCAL_CACHE_KEY, localMemory.getCache);
  // 将内存加载到SessionStorage
  ss.set(APP_SESSION_CACHE_KEY, sessionMemory.getCache);
});

// 当存储库修改时
function storageChange(e: any) {
  const { key, newValue, oldValue } = e;
  if (!key) {
    StorageUtils.clearAll();
    return;
  }
  if (!!newValue && !!oldValue) {
    if (APP_LOCAL_CACHE_KEY === key) {
      StorageUtils.clearLocal();
    }
    if (APP_SESSION_CACHE_KEY === key) {
      StorageUtils.clearSession();
    }
  }
}

window.addEventListener('storage', storageChange);

initPersistentMemory();
