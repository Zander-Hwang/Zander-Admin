import { HOME_ROUTER, ERROR_ROUTER, REDIRECT_ROUTER, LOGIN_ROUTER } from '/@/router/routers/basic';
import { RouteComponent } from 'vue-router';
import { ascending } from '/@/router/constant';

/**
 * 原始静态路由(未做任何处理)
 */
const routes = [HOME_ROUTER, ERROR_ROUTER];

/**
 * 隐藏的原始静态路由
 */
const hiddenRoutes = [REDIRECT_ROUTER, LOGIN_ROUTER];

export const constantRoutes = [...routes, ...hiddenRoutes];

/**
 * 原始静态路由菜单
 */
export const constantMenus: Array<RouteComponent> = ascending(routes).concat(...hiddenRoutes);

/**
 * 不显示菜单的路由
 */
export const hiddenPaths = Object.keys(hiddenRoutes).map(v => {
  return hiddenRoutes[v].path;
});
