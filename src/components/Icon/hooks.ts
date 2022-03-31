import { Component, defineComponent, h } from 'vue';
import { IconSvg, IconOffLine } from '/@/components/Icon/index';

export interface iconType {
  // iconify (https://docs.iconify.design/icon-components/vue/#properties)
  inline?: boolean;
  width?: string | number;
  height?: string | number;
  horizontalFlip?: boolean;
  verticalFlip?: boolean;
  flip?: string;
  rotate?: number | string;
  color?: string;
  horizontalAlign?: boolean;
  verticalAlign?: boolean;
  align?: string;
  onLoad?: Function;
  //  all icon
  style?: object;
}

/**
 * 支持fontawesome4、5+、iconfont、remixicon、element-plus的icons、自定义svg
 * @param icon 必传 string 图标
 * @param attrs 可选 iconType 属性
 * @returns Component
 */
export function useRenderIcon(icon: string, attrs?: iconType): Component {
  // iconfont
  const ifReg = /^IF-/;
  // typeof icon === "function" 属于SVG
  if (ifReg.test(icon)) {
    // iconfont
    const name = icon.split(ifReg)[1];
    const iconName = name.slice(0, name.indexOf(' ') == -1 ? name.length : name.indexOf(' '));
    const iconType = name.slice(name.indexOf(' ') + 1, name.length);
    return defineComponent({
      name: 'FontIcon',
      render() {
        return h(IconSvg, {
          icon: iconName,
          iconType,
          ...attrs,
        });
      },
    });
  } else if (typeof icon === 'function') {
    // svg
    return icon;
  }
  return defineComponent({
    name: 'FontIcon',
    render() {
      return h(IconOffLine, {
        icon: icon,
        ...attrs,
      });
    },
  });
}
