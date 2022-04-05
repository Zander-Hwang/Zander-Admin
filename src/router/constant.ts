// 获取路由历史模式 https://next.router.vuejs.org/zh/guide/essentials/history-mode.html
import { createWebHashHistory, createWebHistory, RouterHistory } from 'vue-router';

// 默认主体布局
export const LAYOUT = () => import('/@/layout/index.vue');

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
