/**
 * @Description: Memory 的数据结构、操作方法
 * @Author: Zander
 * @Date: 2022/8/9 17:18
 * @LastEditors: Zander
 * @LastEditTime: 2022/8/9 17:18
 */
export interface Cache<V = any> {
  value?: V;
  timeoutId?: ReturnType<typeof setTimeout>;
  time?: number;
  alive?: number;
}

// 过期时间
const NOT_ALIVE = 0;

export class Memory<T = any, V = any> {
  private cache: { [key in keyof T]?: Cache<V> } = {};
  private readonly alive: number;

  constructor(alive = NOT_ALIVE) {
    this.alive = alive * 1000;
  }

  /**
   * 返回这个缓存
   */
  get getCache() {
    return this.cache;
  }

  /**
   * 设置缓存
   * @param cache
   */
  public setCache(cache) {
    this.cache = cache;
  }

  public get<K extends keyof T>(key: K) {
    return this.cache[key];
  }

  /**
   * 设置内存
   * @param key 前缀
   * @param value 值
   * @param expires 过期时间
   */
  public set<K extends keyof T>(key: K, value: V, expires?: number) {
    let item = this.get(key);

    if (!expires || (expires as number) <= 0) {
      expires = this.alive;
    }

    if (item) {
      if (item.timeoutId) {
        clearTimeout(item.timeoutId);
        item.timeoutId = undefined;
      }
      item.value = value;
    } else {
      item = { value, alive: expires };
      this.cache[key] = item;
    }

    if (!expires) {
      return value;
    }
    const now = new Date().getTime();
    item.time = now + this.alive;
    item.timeoutId = setTimeout(
      () => {
        this.remove(key);
      },
      expires > now ? expires - now : expires
    );

    return value;
  }

  /**
   * 删除内存
   * @param key
   */
  public remove<K extends keyof T>(key: K) {
    const item = this.get(key);
    Reflect.deleteProperty(this.cache, key);
    if (item) {
      clearTimeout(item.timeoutId!);
      return item.value;
    }
    return null;
  }

  /**
   * 将传入的缓存对象设置到缓存中(重置)
   * @param cache
   */
  resetCache(cache: { [K in keyof T]: Cache }) {
    Object.keys(cache).forEach(key => {
      const k = key as any as keyof T;
      const item = cache[k];
      if (item && item.time) {
        const now = new Date().getTime();
        const expire = item.time;
        if (expire > now) {
          this.set(k, item.value, expire);
        }
      }
    });
  }

  /**
   * 清除内存
   */
  clear() {
    Object.keys(this.cache).forEach(key => {
      const item = this.cache[key];
      item.timeoutId && clearTimeout(item.timeoutId);
    });
    this.cache = {};
  }
}
