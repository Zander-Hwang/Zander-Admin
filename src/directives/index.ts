/**
 * @Description: 配置和注册全局指令
 * @Author: Ableson
 * @Date: 2022/3/27 10:06
 * @LastEditors: Ableson
 * @LastEditTime: 2022/3/27 10:06
 */
import type { App } from 'vue';
import { setupResizeDirective } from './elResizeDetector';

export function setupDirectives(app: App<Element>) {
  setupResizeDirective(app);
}
