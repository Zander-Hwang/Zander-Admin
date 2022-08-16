import type { IAppState } from '/#/store';
import type { LocaleSetting, LocaleType } from '/#/config';
import { store } from '/@/store';
import { defineStore } from 'pinia';
import { deviceDetection } from '/@/utils/device';
import { LOCALE_KEY } from '/@/enums/cacheEnum';
import { createLocalStorage } from '/@/utils/cache';
import { localeSetting } from '/@/config/locale';
import { localStorageUtils } from '/@/utils/storage';

const localStorage = createLocalStorage();

const lsLocaleSetting = (localStorage.get(LOCALE_KEY) || localeSetting) as LocaleSetting;

export const appStore = defineStore({
  id: 'appStore',
  state: (): IAppState => ({
    sidebar: {
      opened: true,
      withoutAnimation: false,
      isClickHamburger: false,
    },
    local: lsLocaleSetting,
    layout: 'vertical',
    device: deviceDetection() ? 'mobile' : 'desktop',
  }),
  getters: {
    getShowPicker(): boolean {
      return !!this.local?.showPicker;
    },
    getLocale(): LocaleType {
      return this.local?.locale ?? 'zh_CN';
    },
    getSidebarStatus(): boolean {
      return this.sidebar.opened;
    },
    getDevice(): string {
      return this.device;
    },
  },
  actions: {
    /**
     * 设置国际化语言环境
     * @param info
     */
    setLocal(info: Partial<LocaleSetting>) {
      this.local = { ...this.local, ...info };
      localStorage.set(LOCALE_KEY, this.local);
    },
    /**
     * 初始化多语言信息并从本地缓存加载现有配置
     */
    initLocale() {
      this.setLocal({
        ...localeSetting,
        ...this.local,
      });
    },
    toggleDevice(device: string) {
      this.device = device;
    },
    async toggleSideBar(opened?: boolean, resize?: string) {
      const layout = localStorageUtils.getItem('responsive-layout');
      if (opened && resize) {
        this.sidebar.withoutAnimation = true;
        this.sidebar.opened = true;
        layout.sidebarStatus = true;
      } else if (!opened && resize) {
        this.sidebar.withoutAnimation = true;
        this.sidebar.opened = false;
        layout.sidebarStatus = false;
      } else if (!opened && !resize) {
        this.sidebar.withoutAnimation = false;
        this.sidebar.opened = !this.sidebar.opened;
        this.sidebar.isClickHamburger = !this.sidebar.opened;
        layout.sidebarStatus = this.sidebar.opened;
      }
      localStorageUtils.setItem('responsive-layout', layout);
    },
    setLayout(layout: string) {
      this.layout = layout;
    },
  },
});

export function useAppStore() {
  return appStore(store);
}
