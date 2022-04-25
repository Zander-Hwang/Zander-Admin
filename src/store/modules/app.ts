import { store } from '/@/store';
import { defineStore } from 'pinia';
import { deviceDetection } from '/@/utils/device';
import { localStorageUtils } from '/@/utils/storage';

export const appStore = defineStore({
  id: 'appStore',
  state: (): IAppState => ({
    sidebar: {
      opened: true,
      withoutAnimation: false,
      isClickHamburger: false,
    },
    language: 'zh',
    layout: 'vertical',
    device: deviceDetection() ? 'mobile' : 'desktop',
  }),
  getters: {
    getSidebarStatus(): boolean {
      return this.sidebar.opened;
    },
    getDevice(): string {
      return this.device;
    },
  },
  actions: {
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
