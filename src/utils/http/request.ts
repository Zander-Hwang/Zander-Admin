import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { HttpRequestConfig, HttpResponseConfig, RequestOptions, Result } from '/#/axios';
import qs from 'qs';
import { cloneDeep } from 'lodash-es';
import NProgress from '../progress';
import { ContentTypeEnum, MethodEnum } from '/@/enums/axiosEnum';

class Request {
  private axiosInstance: AxiosInstance;
  private readonly options: HttpRequestConfig;

  constructor(options: HttpRequestConfig) {
    this.options = options;
    this.axiosInstance = axios.create(options);
    this.requestIntercept();
    this.responseIntercept();
  }

  public supportFormData(config: HttpRequestConfig) {
    const headers = config.headers;
    const contentType = headers?.['Content-Type'] || headers?.['content-type'];

    if (
      contentType !== ContentTypeEnum.json ||
      config.method?.toUpperCase() === MethodEnum.GET ||
      !Reflect.has(config, 'data')
    ) {
      return config;
    }
    return {
      ...config,
      data: qs.stringify(config.data, { arrayFormat: 'brackets' }),
    };
  }

  // 通用请求工具函数
  public async request<T>(config: HttpRequestConfig, options?: RequestOptions): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      let conf = cloneDeep(config);
      conf.headers = Object.assign(
        {},
        {
          'X-Appid': '',
          'X-AppToken': '',
          'X-AppSecret': '',
          'X-Token': '',
        },
        conf?.headers
      );
      const opt: RequestOptions = Object.assign({}, this.options, options);
      conf = this.supportFormData(conf);
      this.axiosInstance
        .request<any, AxiosResponse<Result>>(conf)
        .then((res: AxiosResponse<Result>) => {
          opt.log && console.log(res);
          resolve(res as unknown as Promise<T>);
        })
        .catch((e: Error | AxiosError) => {
          reject(e);
        });
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
        return config;
      },
      error => {
        return Promise.reject(error);
      }
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
        return response;
      },
      error => {
        const $error = error;
        // 关闭进度条动画
        NProgress.done();
        // 所有的响应异常 区分来源为取消请求/非取消请求
        return Promise.reject($error);
      }
    );
  }
}

export const http = new Request({
  baseURL: '',
  timeout: 10 * 1000,
});
