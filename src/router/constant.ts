// 获取路由历史模式 https://next.router.vuejs.org/zh/guide/essentials/history-mode.html
import { createWebHashHistory, createWebHistory, RouteComponent, RouterHistory } from 'vue-router';
import { router } from '/@/router/index';

// 默认主体布局
export const LAYOUT = () => import('/@/layout/index.vue');

// 按照路由中meta下的resSeq等级升序来排序路由
export function ascending(arr: any[]) {
  arr.forEach(v => {
    if (v?.meta?.resSeq === null) {
      v.meta.resSeq = undefined;
    }
    if (v?.meta?.resSeq === 0) {
      if (v.name !== 'home' && v.path !== '/') {
        console.warn('rank only the home page can be 0');
      }
    }
  });
  return arr.sort((a: { meta: { resSeq: number } }, b: { meta: { resSeq: number } }) => {
    return a?.meta?.resSeq - b?.meta?.resSeq;
  });
}

// 过滤meta中showLink为false的路由
export function filterTree(data: RouteComponent[]) {
  const newTree = data.filter((v: { meta: { showLink: boolean } }) => v.meta?.showLink !== false);
  newTree.forEach((v: { children }) => v.children && (v.children = filterTree(v.children)));
  return newTree;
}

// 重置路由
export function resetRouter() {
  router.getRoutes().forEach(route => {
    const { name } = route;
    if (name) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

export function getHistoryMode(history?: string): RouterHistory {
  if (history) {
    // len为1 代表只有历史模式 为2 代表历史模式中存在base参数 https://next.router.vuejs.org/zh/api/#%E5%8F%82%E6%95%B0-1
    const historyMode: string[] = history.split(',');
    const leftMode: string = historyMode[0];
    const rightMode: string = historyMode[1];
    // no param
    if (historyMode.length === 1) {
      if (leftMode === 'hash') {
        return createWebHashHistory();
      } else if (leftMode === 'html5') {
        return createWebHistory();
      }
    } //has param
    else if (historyMode.length === 2) {
      if (leftMode === 'hash') {
        return createWebHashHistory(rightMode);
      } else if (leftMode === 'html5') {
        return createWebHistory(rightMode);
      }
    }
    return createWebHashHistory(history);
  }
  return createWebHashHistory();
}
