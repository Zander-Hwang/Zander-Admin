/**
 * @Description: 浏览器缓存方法
 * @Author: Ableson
 * @Date: 2022/3/3 18:22
 * @LastEditors: Ableson
 * @LastEditTime: 2022/3/3 18:22
 */
interface ProxyStorage {
  getItem(key: string): any;
  setItem(Key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
}

/**
 * 存储方法类
 */
class storageProxy implements ProxyStorage {
  protected storage: ProxyStorage;
  protected prefix: string

  constructor(storageModel: ProxyStorage, prefix = 'Ab') {
    this.storage = storageModel;
    this.prefix = prefix;
  }

  // 设置存储
  public setItem(key: string, value: any): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  // 获取存储
  public getItem(key: string): any {
    return JSON.parse(this.storage.getItem(key));
  }

  // 删除存储
  public removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  // 清空存储
  public clear(): void {
    this.storage.clear();
  }
}

//localStorage
class localStorageProxy extends storageProxy implements ProxyStorage {
  constructor(localStorage: ProxyStorage, prefix: string) {
    super(localStorage, prefix);
  }
}

// sessionStorage
class sessionStorageProxy extends storageProxy implements ProxyStorage {
  constructor(sessionStorage: ProxyStorage, prefix: string) {
    super(sessionStorage, prefix);
  }
}

export const localStorageUtils = new localStorageProxy(localStorage, 'Ab');

export const sessionStorageUtils = new sessionStorageProxy(sessionStorage, 'Ab');
