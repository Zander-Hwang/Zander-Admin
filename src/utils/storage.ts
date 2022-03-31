/**
 * @Description: 浏览器缓存方法
 * @Author: Zander
 * @Date: 2022/3/3 18:22
 * @LastEditors: Zander
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
  protected prefix: string;

  constructor(storageModel: ProxyStorage, prefix?: string) {
    this.storage = storageModel;
    this.prefix = prefix || 'Ab';
  }

  /**
   * 获取key
   * @param key
   * @private
   */
  private getKey(key: string): string {
    return `${this.prefix}:${key}`;
  }

  /**
   * 设置缓存配置(秒级)
   * @param time(天数)
   * @private
   */
  private setOptions(time?: number) {
    // 如果用户没传递时间进来就是一天
    if (time && time > 0) {
      time = new Date().getTime() + 1000 * time;
    } else {
      time = new Date().getTime() + 1000 * 60 * 60 * 24;
    }
    const options: { [propsName: string]: any } = {
      storeTime: time,
      prefix: this.prefix,
    };
    return options;
  }

  // 设置存储
  public setItem(key: string, value: any, time?: number): void {
    const _key = this.getKey(key);
    const options = this.setOptions(time);
    this.storage.setItem(_key, JSON.stringify({ value, options }));
  }

  // 获取存储
  public getItem(key: string): any {
    const _key = this.getKey(key);
    const storeData: string | null = this.storage.getItem(_key);
    if (storeData) {
      const {
        value,
        options: { storeTime },
      } = JSON.parse(storeData);
      // 如果从存储中获取的时间大于当前的时间或者等于0的时候表示当前的localStorage有效
      if (storeTime > new Date().getTime()) {
        return value;
      }
      this.removeItem(_key);
      return null;
    }
    return null;
  }

  // 删除存储
  public removeItem(key: string): void {
    const _key = this.getKey(key);
    const value: string | null = this.getItem(key);
    if (value) {
      this.storage.removeItem(_key);
    }
  }

  // 清空存储
  public clear(): void {
    this.storage.clear();
  }
}

//localStorage
class localStorageProxy extends storageProxy implements ProxyStorage {
  constructor(localStorage: ProxyStorage, prefix?: string) {
    super(localStorage, prefix);
  }
}

// sessionStorage
class sessionStorageProxy extends storageProxy implements ProxyStorage {
  constructor(sessionStorage: ProxyStorage, prefix?: string) {
    super(sessionStorage, prefix);
  }
}

export const localStorageUtils = new localStorageProxy(localStorage, 'Ab');

export const sessionStorageUtils = new sessionStorageProxy(sessionStorage, 'Ab');
