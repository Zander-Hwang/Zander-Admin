import { HttpRequestConfig } from '/#/axios';
import { http } from '/@/utils/http/request';

/**
 * get请求
 * @param option
 */
export const $get = (option: HttpRequestConfig): Promise<any> => {
  Object.assign(option, { method: 'GET' });
  return http.request(option);
};

/**
 * post请求
 * @param option
 */
export const $post = (option: HttpRequestConfig): Promise<any> => {
  Object.assign(option, { method: 'POST' });
  return http.request(option);
};

/**
 * put请求
 * @param option
 */
export const $put = (option: HttpRequestConfig): Promise<any> => {
  Object.assign(option, { method: 'PUT' });
  return http.request(option);
};

/**
 * delete请求
 * @param option
 */
export const $delete = (option: HttpRequestConfig): Promise<any> => {
  Object.assign(option, { method: 'DELETE' });
  return http.request(option);
};

/**
 * 使用
 */
