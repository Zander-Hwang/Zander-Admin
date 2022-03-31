/**
 * @Description: 测试mock数据
 * @Author: Zander
 * @Date: 2022/3/31 17:38
 * @LastEditors: Zander
 * @LastEditTime: 2022/3/31 17:38
 */
import { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: '/demo/student/list',
    method: 'get',
    response: (request: any) => {
      return {
        code: 0,
        result: request,
        message: '测试成功',
        type: 'success',
      };
    },
  },
] as MockMethod[];
