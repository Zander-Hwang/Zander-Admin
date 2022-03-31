/**
 * @Description: 测试
 * @Author: Zander
 * @Date: 2022/3/31 17:34
 * @LastEditors: Zander
 * @LastEditTime: 2022/3/31 17:34
 */
import { $get } from '/@/utils/http';

export const testApi = (query: any) =>
  $get({
    url: '/demo/student/list',
    params: query,
  });
