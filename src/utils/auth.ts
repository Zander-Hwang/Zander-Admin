/**
 * @Description: 身份验证工具类
 * @Author: Zander
 * @Date: 2022/3/31 18:11
 * @LastEditors: Zander
 * @LastEditTime: 2022/3/31 18:11
 */
import Cookies from 'js-cookies';

const TOKEN_KEY = 'authorized-token';

// 获取token
export function getToken() {
  // 此处与TokenKey相同，此写法解决初始化时Cookies中不存在TokenKey报错
  return Cookies.get(TOKEN_KEY);
}
