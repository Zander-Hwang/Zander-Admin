import { AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * 请求配置
 */
export interface HttpRequestConfig extends AxiosRequestConfig {
  /**
   * 是否开启打印
   */
  log?: boolean;
}

export type HttpResponseConfig = AxiosResponse;
