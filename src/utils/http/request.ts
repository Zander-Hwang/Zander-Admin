import axios, { AxiosInstance } from 'axios';
import { HttpRequestConfig, HttpResponseConfig } from '/#/axios';
import qs from 'qs';
import { cloneDeep } from 'lodash-es';
import NProgress from '../progress';

class Request {
  private axiosInstance: AxiosInstance;
  private readonly options: HttpRequestConfig;

  constructor(options: HttpRequestConfig) {
    this.options = options;
    this.axiosInstance = axios.create(options);
    this.requestIntercept();
    this.responseIntercept();
  }

  // 通用请求工具函数
  public async request<T>(config: HttpRequestConfig): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      let conf = cloneDeep(config);
      console.log(reject);
      console.log(resolve);
    });
  }

  /**
   * 请求拦截
   * @private
   */
  private requestIntercept(): void {
    this.axiosInstance.interceptors.request.use(
      (config: HttpRequestConfig) => {
        // 开启进度条动画
        NProgress.start();
      },
      error => {}
    );
  }

  /**
   * 响应拦截
   * @private
   */
  private responseIntercept(): void {
    this.axiosInstance.interceptors.response.use(
      (response: HttpResponseConfig) => {
        // 关闭进度条动画
        NProgress.done();
      },
      error => {
        NProgress.done();
      }
    );
  }
}

export const http = new Request({
  baseURL: '',
  timeout: 10 * 1000,
});
