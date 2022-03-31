/**
 * @Description: 监控元素大小变化
 * @Author: Zander
 * @Date: 2022/3/27 9:48
 * @LastEditors: Zander
 * @LastEditTime: 2022/3/27 9:48
 */
import type { Directive, DirectiveBinding, VNode, App } from 'vue';
import elementResizeDetectorMaker from 'element-resize-detector';
import type { Erd } from 'element-resize-detector';
import { emitter } from '/@/utils/mitt';

const erd: Erd = elementResizeDetectorMaker({
  strategy: 'scroll',
});

const resizeDirective: Directive = {
  mounted(el: Element, binding?: DirectiveBinding<any>, vnode?: VNode) {
    erd.listenTo(el, elem => {
      console.log(el);
      const width = elem.offsetWidth;
      const height = elem.offsetHeight;
      if (binding?.instance) {
        emitter.emit('resize', { detail: { width, height } });
      } else {
        vnode &&
          vnode.el &&
          vnode.el.dispatchEvent(new CustomEvent('resize', { detail: { width, height } }));
      }
    });
  },
  unmounted(el: HTMLElement) {
    erd.uninstall(el);
  },
};

export function setupResizeDirective(app: App) {
  app.directive('resize', resizeDirective);
}

export default resizeDirective;
