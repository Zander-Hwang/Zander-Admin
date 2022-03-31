import { AxiosRequestConfig, AxiosResponse, Method } from 'axios';

/**
 * 请求方法
 */
export type RequestMethods = Extract<
  Method,
  'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTION' | 'HEAD'
>;

export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;

/**
 * 请求配置
 */
export type HttpRequestConfig = AxiosRequestConfig;

/**
 * 额外参数配置
 */
export interface RequestOptions {
  // 是否开启打印
  log?: boolean;
  // 消息提示类型
  errorMessageMode?: ErrorMessageMode;
  // 忽略重复请求
  ignoreCancelToken?: boolean;
  // 忽略重复请求间隔时间
  ignoreTokenInterval?: number;
  // 是否携带token
  withToken?: boolean;
}

export type HttpResponseConfig = AxiosResponse;

export interface Result<T = any> {
  code: number;
  type: 'success' | 'error' | 'warning';
  message: string;
  result: T;
}
