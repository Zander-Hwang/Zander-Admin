/**
 * @Description: 动态生成路由
 * @Author: Zander
 * @Date: 2022/4/24 14:22
 * @LastEditors: Zander
 * @LastEditTime: 2022/4/24 14:22
 */
import { MockMethod } from 'vite-plugin-mock';

const permissionRouter = {
  path: '/permission',
  redirect: '/permission/page/index',
  meta: {
    title: 'menus.permission',
    icon: 'lollipop',
    i18n: true,
    rank: 7,
  },
  children: [
    {
      path: '/permission/page/index',
      name: 'permissionPage',
      meta: {
        title: 'menus.permissionPage',
        i18n: true,
      },
    },
    {
      path: '/permission/button/index',
      name: 'permissionButton',
      meta: {
        title: 'menus.permissionButton',
        i18n: true,
      },
    },
  ],
};

export default [
  {
    url: '/demo/getAsyncRoutes/list',
    method: 'get',
    response: () => {
      return {
        code: 0,
        result: permissionRouter,
        message: '获取菜单列表成功',
        type: 'success',
      };
    },
  },
] as MockMethod[];
