/**
 * @Description: 加密工具类
 * @Author: Zander
 * @Date: 2022/8/9 15:33
 * @LastEditors: Zander
 * @LastEditTime: 2022/8/9 15:33
 */
import { encrypt, decrypt } from 'crypto-js/aes';
import UTF8, { parse } from 'crypto-js/enc-utf8';
import pkcs7 from 'crypto-js/pad-pkcs7';
import ECB from 'crypto-js/mode-ecb';
import md5 from 'crypto-js/md5';
import Base64 from 'crypto-js/enc-base64';

// 参数声明
export interface EncryptionParams {
  key: string;
  iv: string;
}

export class AesEncryption {
  private readonly key;
  private readonly iv;

  constructor(option: Partial<EncryptionParams>) {
    const { key, iv } = option;
    if (key) {
      this.key = parse(key);
    }
    if (iv) {
      this.iv = parse(iv);
    }
  }

  get getOptions() {
    return {
      mode: ECB,
      padding: pkcs7,
      iv: this.iv,
    };
  }

  /**
   * AES 加密
   * @param cipherText
   */
  encryptByAES(cipherText: string) {
    return encrypt(cipherText, this.key, this.getOptions).toString();
  }

  /**
   * AES 解密
   * @param cipherText
   */
  decryptByAES(cipherText: string) {
    return decrypt(cipherText, this.key, this.getOptions).toString(UTF8);
  }
}

/**
 * Base64 加密
 * @param cipherText
 */
export function encryptByBase64(cipherText: string) {
  return UTF8.parse(cipherText).toString(Base64);
}

/**
 * Base64 解密
 * @param cipherText
 */
export function decodeByBase64(cipherText: string) {
  return Base64.parse(cipherText).toString(UTF8);
}

/**
 * Md5 加密
 * @param password
 */
export function encryptByMd5(password: string) {
  return md5(password).toString();
}
