import { store } from '/@/store';
import { defineStore } from 'pinia';

export const permissionStore = defineStore({
  id: 'permissionStore',
  getters: {},
  actions: {},
});

export function usePermissionStore() {
  return permissionStore(store);
}
