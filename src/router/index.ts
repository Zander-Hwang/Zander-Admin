import type { App } from 'vue';
import { createRouter } from 'vue-router';
import NProgress from '/@/utils/progress';
import { getHistoryMode } from '/@/router/constant';

// 创建路由实例
export const router = createRouter({
  history: getHistoryMode(import.meta.env?.VITE_ROUTER_HISTORY),
  routes: [],
  strict: true,
  /* eslint-disable */
  // @ts-ignore
  scrollBehavior: (to, from, savedPosition) => {
    return new Promise(resolve => {
      if (savedPosition) {
        return savedPosition;
      }
      if (from.meta.saveSrollTop) {
        const top: number = document.documentElement.scrollTop || document.body.scrollTop;
        resolve({ left: 0, top });
      }
    });
  },
  /* eslint-enable */
});

router.beforeEach((to: any, _from, next) => {
  console.log(to);
  console.log(_from);
  console.log(next);
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export function setupRouter(app: App<Element>) {
  app.use(router);
}
