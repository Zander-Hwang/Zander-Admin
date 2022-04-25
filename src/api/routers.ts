/**
 * @Description: 获取菜单
 * @Author: Zander
 * @Date: 2022/4/24 14:25
 * @LastEditors: Zander
 * @LastEditTime: 2022/4/24 14:25
 */
import { $get } from '/@/utils/http';

export const getRoutersApi = () =>
  $get({
    url: '/demo/getAsyncRoutes/list',
  });
