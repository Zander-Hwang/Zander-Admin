import { LAYOUT } from '/@/router/constant';

// Home路由
export const HOME_ROUTER = {
  path: '/',
  name: 'home',
  component: LAYOUT,
  redirect: '/welcome',
  meta: {
    icon: 'home-filled',
    title: '首页',
    i18n: true,
    rank: 0,
  },
  children: [
    {
      path: '/welcome',
      name: 'welcome',
      component: () => import('/@/views/home/welcome.vue'),
      meta: {
        title: '首页',
        i18n: true,
      },
    },
  ],
};

// 错误页面路由
export const ERROR_ROUTER = {
  path: '/error',
  component: LAYOUT,
  redirect: '/error/403',
  meta: {
    icon: 'information-line',
    title: '错误页面',
    i18n: true,
    rank: 9,
  },
  children: [
    {
      path: '/error/403',
      name: '403',
      component: () => import('/@/views/error/403.vue'),
      meta: {
        title: '403',
        i18n: true,
      },
    },
    {
      path: '/error/404',
      name: '404',
      component: () => import('/@/views/error/404.vue'),
      meta: {
        title: '404',
        i18n: true,
      },
    },
    {
      path: '/error/500',
      name: '500',
      component: () => import('/@/views/error/500.vue'),
      meta: {
        title: '500',
        i18n: true,
      },
    },
  ],
};

// 重定向路由
export const REDIRECT_ROUTER = {
  path: '/redirect',
  component: LAYOUT,
  meta: {
    icon: 'home-filled',
    title: '首页',
    i18n: true,
    showLink: false,
    rank: 104,
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: 'redirect',
      component: () => import('/@/layout/redirect.vue'),
    },
  ],
};

// 登录注册路由
export const LOGIN_ROUTER = {
  path: '/login',
  name: 'login',
  component: () => import('/@/views/login/login.vue'),
  meta: {
    title: '登录',
    showLink: false,
    i18n: true,
    rank: 101,
  },
};
