/**
 * @Description: 加密、缓存配置
 * @Author: Zander
 * @Date: 2022/8/9 15:50
 * @LastEditors: Zander
 * @LastEditTime: 2022/8/9 15:50
 */
import { isDevMode } from '/@/utils/env';

// 默认缓存过期时间（7天）
export const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

// AES 加密方法秘钥、秘钥偏移量配置
export const SECRET_KEY = '1#4ud1&0sjg2*0?d';
export const SECRET_IV = '2;&@_ejk.udh39da';

// 通过环境判断缓存是否进行 AES 加密
export const enableEncryption = !isDevMode();
