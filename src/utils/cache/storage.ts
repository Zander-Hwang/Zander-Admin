/**
 * @Description: Storage 操作
 * @Author: Zander
 * @Date: 2022/8/9 16:04
 * @LastEditors: Zander
 * @LastEditTime: 2022/8/9 16:04
 */
import { SECRET_KEY, SECRET_IV } from '/@/config/encryption';
import { EncryptionParams, AesEncryption } from '/@/utils/cipher';
import { isNullOrUnDef } from '/@/utils/verify';

export interface StorageParams extends EncryptionParams {
  prefixKey: string;
  storage: Storage;
  hasEncrypt: boolean;
  timeout?: Nullable<number>;
}

export const createStorage = ({
  prefixKey = '',
  storage = sessionStorage,
  key = SECRET_KEY,
  iv = SECRET_IV,
  timeout = null,
  hasEncrypt = true,
}: Partial<StorageParams> = {}) => {
  // 如果需要加密，加密key和偏移量需要为16bit
  if (hasEncrypt && [key.length, iv.length].some(item => item !== 16)) {
    throw new Error('When hasEncrypt is true, the key or iv must be 16 bits!');
  }

  // 使用Aes对称加密
  const encryption = new AesEncryption({ key, iv });

  const WebStorage = class WebStorage {
    private readonly storage: Storage;
    private readonly prefixKey?: string;
    private readonly encryption: AesEncryption;
    private readonly hasEncrypt: boolean;

    constructor() {
      this.storage = storage;
      this.prefixKey = prefixKey;
      this.encryption = encryption;
      this.hasEncrypt = hasEncrypt;
    }

    /**
     * 获取key
     * @param key
     * @private
     */
    private getKey(key: string) {
      return `${this.prefixKey}${key}`.toUpperCase();
    }

    /**
     * 设置存储
     * @param key 前缀
     * @param value 值
     * @param expire 过期时间（S）
     */
    public set(key: string, value: any, expire: number | null = timeout): void {
      const optionData = JSON.stringify({
        value,
        time: Date.now(),
        expire: !isNullOrUnDef(expire) ? new Date().getTime() + expire * 1000 : null,
      });
      const optionValue = this.hasEncrypt ? this.encryption.encryptByAES(optionData) : optionData;
      this.storage.setItem(this.getKey(key), optionValue);
    }

    /**
     * 获取存储
     * @param key 前缀
     * @param def 获取不到缓存默认返回
     */
    public get(key: string, def: any = null): any {
      const storeData: string | null = this.storage.getItem(this.getKey(key));
      if (!storeData) {
        return def;
      }
      try {
        const val = this.hasEncrypt ? this.encryption.decryptByAES(storeData) : storeData;
        const data = JSON.parse(val);
        const { value, expire } = data;
        if (isNullOrUnDef(expire) || expire >= new Date().getTime()) {
          return value;
        }
        this.remove(key);
        return def;
      } catch (e) {
        return def;
      }
    }

    /**
     * 删除存储
     * @param key 前缀
     */
    public remove(key: string): void {
      const value = this.get(key);
      if (value) {
        this.storage.removeItem(this.getKey(key));
      }
    }

    /**
     * 清空存储
     */
    public clear(): void {
      this.storage.clear();
    }
  };
  return new WebStorage();
};
