import { defineStore } from 'pinia';
import { store } from '/@/store';

/**
 * 登录用户缓存KEY
 */
const LOGIN_USER_KEY = 'LOGIN-USER';

export const userStore = defineStore({
  id: 'userStore',
  state: (): IUserState => ({
    id: null,
    ip: null,
    loginName: null,
    name: null,
    userType: null,
    status: 1,
    firstLogin: 0,
    organizations: null,
    roles: null,
    resources: null,
    avatar: null,
    introduction: null,
  }),
  getters: {},
  actions: {
    async login() {},
    async loginByToken() {},

    /**
     * 重置用户登录信息
     */
    resetState() {
      this.id = null;
      this.ip = null;
      this.loginName = null;
      this.name = null;
      this.userType = null;
      this.status = 1;
      this.firstLogin = 0;
      this.organizations = null;
      this.roles = null;
      this.resources = null;
      this.avatar = null;
      this.introduction = null;
    },
  },
});

export function useUserStore() {
  return userStore(store);
}
